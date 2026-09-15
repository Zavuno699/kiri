package service

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/identity-service/internal/model"
	"github.com/kirilock/backend/identity-service/internal/repository"
)

var (
	ErrTenantNotFound         = errors.New("tenant not found")
	ErrUnitNotAvailable       = errors.New("unit not available")
	ErrInvalidInvitation      = errors.New("invalid invitation")
	ErrInvitationExpired      = errors.New("invitation expired")
	ErrDuplicateActiveTenancy = errors.New("tenant already has an active tenancy")
)

type TenantService struct {
	tenancyRepo     repository.TenancyRepository
	unitRepo        repository.UnitRepository
	propertyRepo    repository.PropertyRepository
	landlordRepo    repository.LandlordProfileRepository
	landlordService *LandlordService
	txDB            repository.TxDB
}

func NewTenantService(
	tenancyRepo repository.TenancyRepository,
	unitRepo repository.UnitRepository,
	propertyRepo repository.PropertyRepository,
	landlordRepo repository.LandlordProfileRepository,
	landlordService *LandlordService,
	txDB repository.TxDB,
) *TenantService {
	return &TenantService{
		tenancyRepo:     tenancyRepo,
		unitRepo:        unitRepo,
		propertyRepo:    propertyRepo,
		landlordRepo:    landlordRepo,
		landlordService: landlordService,
		txDB:            txDB,
	}
}

func (s *TenantService) generateInvitationToken() (string, error) {
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}

func (s *TenantService) CreateTenantInvitation(
	ctx context.Context,
	landlordSubjectID uuid.UUID,
	tenantSubjectID uuid.UUID,
	unitID uuid.UUID,
	leaseStartDate time.Time,
	leaseEndDate *time.Time,
) (model.Tenancy, error) {
	// Check landlord authorization
	if err := s.landlordService.CheckOperationalAccess(ctx, landlordSubjectID); err != nil {
		return model.Tenancy{}, err
	}

	// Generate invitation token
	token, err := s.generateInvitationToken()
	if err != nil {
		return model.Tenancy{}, err
	}

	// Invitation expires in 7 days
	expiresAt := time.Now().Add(7 * 24 * time.Hour)

	// Use transaction for atomic tenant onboarding
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return model.Tenancy{}, err
	}
	defer tx.Rollback(ctx)

	// Verify unit ownership and availability with FOR UPDATE lock
	unit, err := s.unitRepo.GetByID(ctx, unitID)
	if err != nil {
		return model.Tenancy{}, ErrUnitNotFound
	}

	property, err := s.propertyRepo.GetByID(ctx, unit.PropertyID)
	if err != nil {
		return model.Tenancy{}, ErrPropertyNotFound
	}

	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, landlordSubjectID)
	if err != nil {
		return model.Tenancy{}, err
	}

	if property.LandlordProfileID != landlordProfile.ID {
		return model.Tenancy{}, ErrUnauthorizedProperty
	}

	if !unit.IsAvailable() {
		return model.Tenancy{}, ErrUnitNotAvailable
	}

	// Check tenant doesn't already have active tenancy
	activeTenancy, err := s.tenancyRepo.GetActiveByTenantSubjectID(ctx, tenantSubjectID)
	if err == nil && activeTenancy.ID != uuid.Nil {
		return model.Tenancy{}, ErrDuplicateActiveTenancy
	}

	tenancy := model.Tenancy{
		ID:                         uuid.New(),
		TenantSubjectID:            tenantSubjectID,
		UnitID:                     unitID,
		Status:                     model.TenancyInvited,
		LeaseStartDate:             leaseStartDate,
		LeaseEndDate:               leaseEndDate,
		InvitedByLandlordProfileID: &landlordProfile.ID,
		InvitationToken:            token,
		InvitationExpiresAt:        &expiresAt,
		CreatedAt:                  time.Now(),
		UpdatedAt:                  time.Now(),
		Version:                    1,
	}

	if err := tenancy.Validate(); err != nil {
		return model.Tenancy{}, err
	}

	if err := s.tenancyRepo.Create(ctx, tenancy); err != nil {
		return model.Tenancy{}, err
	}

	// Update unit lifecycle
	if err := s.unitRepo.UpdateLifecycle(ctx, unitID, model.UnitReserved); err != nil {
		return model.Tenancy{}, err
	}

	if err := tx.Commit(ctx); err != nil {
		return model.Tenancy{}, err
	}

	return tenancy, nil
}

func (s *TenantService) AcceptInvitation(ctx context.Context, tenantSubjectID uuid.UUID, token string) error {
	// Find tenancy by tenant and token
	tenancies, err := s.tenancyRepo.GetByTenantSubjectID(ctx, tenantSubjectID)
	if err != nil {
		return err
	}

	var targetTenancy *model.Tenancy
	for _, t := range tenancies {
		if t.InvitationToken == token && t.Status == model.TenancyInvited {
			targetTenancy = &t
			break
		}
	}

	if targetTenancy == nil {
		return ErrInvalidInvitation
	}

	// Check expiration
	if targetTenancy.InvitationExpiresAt != nil && time.Now().After(*targetTenancy.InvitationExpiresAt) {
		return ErrInvitationExpired
	}

	// Accept invitation
	if err := s.tenancyRepo.AcceptInvitation(ctx, targetTenancy.ID); err != nil {
		return err
	}

	// Update unit lifecycle to occupied
	s.unitRepo.UpdateLifecycle(ctx, targetTenancy.UnitID, model.UnitOccupied)

	return nil
}

func (s *TenantService) GetTenantTenancy(ctx context.Context, tenantSubjectID uuid.UUID) (model.Tenancy, error) {
	return s.tenancyRepo.GetActiveByTenantSubjectID(ctx, tenantSubjectID)
}

func (s *TenantService) GetLandlordTenancies(ctx context.Context, landlordSubjectID uuid.UUID) ([]model.Tenancy, error) {
	// Get landlord profile and properties
	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, landlordSubjectID)
	if err != nil {
		return nil, err
	}

	properties, err := s.propertyRepo.GetByLandlordProfileID(ctx, landlordProfile.ID)
	if err != nil {
		return nil, err
	}

	// Get all units for these properties
	var allTenancies []model.Tenancy
	for _, property := range properties {
		units, err := s.unitRepo.GetByPropertyID(ctx, property.ID)
		if err != nil {
			continue
		}

		for _, unit := range units {
			unitTenancies, err := s.tenancyRepo.GetByUnitID(ctx, unit.ID)
			if err != nil {
				continue
			}
			allTenancies = append(allTenancies, unitTenancies...)
		}
	}

	return allTenancies, nil
}

func (s *TenantService) TerminateTenancy(ctx context.Context, landlordSubjectID uuid.UUID, tenancyID uuid.UUID, reason string) error {
	// Check landlord authorization
	if err := s.landlordService.CheckOperationalAccess(ctx, landlordSubjectID); err != nil {
		return err
	}

	// Get tenancy
	tenancy, err := s.tenancyRepo.GetByID(ctx, tenancyID)
	if err != nil {
		return err
	}

	// Verify landlord owns the property
	unit, err := s.unitRepo.GetByID(ctx, tenancy.UnitID)
	if err != nil {
		return err
	}

	property, err := s.propertyRepo.GetByID(ctx, unit.PropertyID)
	if err != nil {
		return err
	}

	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, landlordSubjectID)
	if err != nil {
		return err
	}

	if property.LandlordProfileID != landlordProfile.ID {
		return ErrUnauthorizedProperty
	}

	// Terminate tenancy
	tenancy.Status = model.TenancyTerminated
	now := time.Now()
	tenancy.TerminatedAt = &now
	tenancy.TerminationReason = reason
	tenancy.UpdatedAt = time.Now()

	if err := s.tenancyRepo.Update(ctx, tenancy); err != nil {
		return err
	}

	// Update unit lifecycle to available
	s.unitRepo.UpdateLifecycle(ctx, tenancy.UnitID, model.UnitAvailable)

	return nil
}
