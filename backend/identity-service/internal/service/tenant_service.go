package service

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"

	"github.com/kirilock/backend/identity-service/internal/model"
	"github.com/kirilock/backend/identity-service/internal/notification"
	"github.com/kirilock/backend/identity-service/internal/repository"
)

var (
	ErrTenantNotFound         = errors.New("tenant not found")
	ErrUnitNotAvailable       = errors.New("unit not available")
	ErrInvalidInvitation      = errors.New("invalid invitation")
	ErrInvitationExpired      = errors.New("invitation expired")
	ErrDuplicateActiveTenancy = errors.New("tenant already has an active tenancy")
	ErrInvitationAlreadyUsed  = errors.New("invitation already used")
	ErrUnauthorizedOperation  = errors.New("not authorized to perform this operation")
	ErrWeakPassword           = errors.New("password must be at least 8 characters")
)

type TenantService struct {
	tenancyRepo     repository.TenancyRepository
	unitRepo        repository.UnitRepository
	propertyRepo    repository.PropertyRepository
	landlordRepo    repository.LandlordProfileRepository
	landlordService *LandlordService
	subjectRepo     repository.SubjectRepository
	credentialRepo  repository.CredentialRepository
	sessionRepo     repository.SessionRepository
	auditRepo       repository.AuditRepository
	notificationSvc *notification.NotificationService
	txDB            repository.TxDB
}

func NewTenantService(
	tenancyRepo repository.TenancyRepository,
	unitRepo repository.UnitRepository,
	propertyRepo repository.PropertyRepository,
	landlordRepo repository.LandlordProfileRepository,
	landlordService *LandlordService,
	subjectRepo repository.SubjectRepository,
	credentialRepo repository.CredentialRepository,
	sessionRepo repository.SessionRepository,
	auditRepo repository.AuditRepository,
	notificationSvc *notification.NotificationService,
	txDB repository.TxDB,
) *TenantService {
	return &TenantService{
		tenancyRepo:     tenancyRepo,
		unitRepo:        unitRepo,
		propertyRepo:    propertyRepo,
		landlordRepo:    landlordRepo,
		landlordService: landlordService,
		subjectRepo:     subjectRepo,
		credentialRepo:  credentialRepo,
		sessionRepo:     sessionRepo,
		auditRepo:       auditRepo,
		notificationSvc: notificationSvc,
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

func (s *TenantService) hashToken(token string) string {
	hash := sha256.Sum256([]byte(token))
	return hex.EncodeToString(hash[:])
}

func hashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hash), nil
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

	tokenHash := s.hashToken(token)

	// Invitation expires in 7 days
	expiresAt := time.Now().Add(7 * 24 * time.Hour)

	// Use transaction for atomic tenant onboarding
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return model.Tenancy{}, err
	}
	defer tx.Rollback(ctx)

	// Verify unit ownership and availability with FOR UPDATE lock
	// Route through transaction context for proper locking
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
		InvitationTokenHash:        tokenHash,
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
	tokenHash := s.hashToken(token)

	// Find tenancy by token hash
	tenancy, err := s.tenancyRepo.GetByTokenHash(ctx, tokenHash)
	if err != nil {
		return ErrInvalidInvitation
	}

	// Verify tenant matches
	if tenancy.TenantSubjectID != tenantSubjectID {
		return ErrInvalidInvitation
	}

	// Check status
	if tenancy.Status != model.TenancyInvited {
		return ErrInvalidInvitation
	}

	// Check expiration
	if tenancy.InvitationExpiresAt != nil && time.Now().After(*tenancy.InvitationExpiresAt) {
		return ErrInvitationExpired
	}

	// Accept invitation
	if err := s.tenancyRepo.AcceptInvitation(ctx, tenancy.ID); err != nil {
		return err
	}

	// Update unit lifecycle to occupied
	s.unitRepo.UpdateLifecycle(ctx, tenancy.UnitID, model.UnitOccupied)

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

	// Use transaction for atomic termination
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)

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

	// Log audit event within transaction
	_ = s.auditRepo.LogEvent(ctx, "tenancy.terminate", landlordSubjectID, "tenancy", &tenancy.ID, map[string]interface{}{
		"status": string(tenancy.Status),
	}, map[string]interface{}{
		"status":             string(model.TenancyTerminated),
		"termination_reason": reason,
	}, "", "", "", true, "")

	if err := tx.Commit(ctx); err != nil {
		return err
	}

	return nil
}

// CreateTenantInvitationByEmail creates an invitation for a not-yet-existing tenant
// Stores intended tenant email; tenant identity is finalized at activation
func (s *TenantService) CreateTenantInvitationByEmail(
	ctx context.Context,
	landlordSubjectID uuid.UUID,
	tenantEmail string,
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

	tokenHash := s.hashToken(token)

	// Invitation expires in 7 days
	expiresAt := time.Now().Add(7 * 24 * time.Hour)

	// Use transaction for atomic tenant onboarding
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return model.Tenancy{}, err
	}
	defer tx.Rollback(ctx)

	// Verify unit ownership and availability
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

	// Create pending subject for the tenant
	pendingSubjectID := uuid.New()
	pendingSubject := model.Subject{
		ID:           pendingSubjectID,
		SubjectID:    pendingSubjectID.String(),
		Email:        tenantEmail,
		PasswordHash: "", // Will be set during activation
		Roles:        []string{"tenant"},
		IsAdmin:      false,
		IsSuperAdmin: false,
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
		Version:      1,
	}

	if err := s.subjectRepo.Create(ctx, pendingSubject); err != nil {
		if err == repository.ErrSubjectExists {
			// Subject already exists - use existing
			existingSubject, err := s.subjectRepo.GetByEmail(ctx, tenantEmail)
			if err != nil {
				return model.Tenancy{}, fmt.Errorf("subject exists but could not be retrieved: %w", err)
			}
			pendingSubjectID = existingSubject.ID
		} else {
			return model.Tenancy{}, fmt.Errorf("failed to create pending subject: %w", err)
		}
	}

	// Check tenant doesn't already have active tenancy
	activeTenancy, err := s.tenancyRepo.GetActiveByTenantSubjectID(ctx, pendingSubjectID)
	if err == nil && activeTenancy.ID != uuid.Nil {
		return model.Tenancy{}, ErrDuplicateActiveTenancy
	}

	tenancy := model.Tenancy{
		ID:                         uuid.New(),
		TenantSubjectID:            pendingSubjectID,
		UnitID:                     unitID,
		Status:                     model.TenancyInvited,
		LeaseStartDate:             leaseStartDate,
		LeaseEndDate:               leaseEndDate,
		InvitedByLandlordProfileID: &landlordProfile.ID,
		InvitationTokenHash:        tokenHash,
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

	// Log audit event
	_ = s.auditRepo.LogEvent(ctx, "tenancy.create", landlordSubjectID, "tenancy", &tenancy.ID, nil, map[string]interface{}{
		"tenant_subject_id":   tenancy.TenantSubjectID,
		"unit_id":             tenancy.UnitID,
		"status":              string(tenancy.Status),
		"lease_start_date":    tenancy.LeaseStartDate,
		"lease_end_date":      tenancy.LeaseEndDate,
		"invited_by_landlord": landlordProfile.ID,
		"invitation_method":   "email",
	}, "", "", "", true, "")

	if err := tx.Commit(ctx); err != nil {
		return model.Tenancy{}, err
	}

	// Send invitation notification (fire and forget - invitation validity independent of delivery)
	if s.notificationSvc != nil {
		unit, _ := s.unitRepo.GetByID(ctx, unitID)
		property, _ := s.propertyRepo.GetByID(ctx, unit.PropertyID)
		go func() {
			_, _ = s.notificationSvc.SendInvitation(context.Background(), tenantEmail, token, property.PropertyName, unit.UnitNumber)
		}()
	}

	return tenancy, nil
}

// PreviewInvitation returns safe, non-sensitive context for an invitation
// Never returns the token, landlord PII, or device credentials
func (s *TenantService) PreviewInvitation(ctx context.Context, token string) (map[string]interface{}, error) {
	tokenHash := s.hashToken(token)

	tenancy, err := s.tenancyRepo.GetByTokenHash(ctx, tokenHash)
	if err != nil {
		return nil, ErrInvalidInvitation
	}

	// Check expiration
	if tenancy.InvitationExpiresAt != nil && time.Now().After(*tenancy.InvitationExpiresAt) {
		return nil, ErrInvitationExpired
	}

	// Get unit and property for display
	unit, err := s.unitRepo.GetByID(ctx, tenancy.UnitID)
	if err != nil {
		return nil, err
	}

	property, err := s.propertyRepo.GetByID(ctx, unit.PropertyID)
	if err != nil {
		return nil, err
	}

	// Return only safe information
	return map[string]interface{}{
		"property_name":    property.PropertyName,
		"property_type":    property.PropertyType,
		"unit_number":      unit.UnitNumber,
		"lease_start_date": tenancy.LeaseStartDate.Format("2006-01-02"),
		"lease_end_date": func() string {
			if tenancy.LeaseEndDate != nil {
				return tenancy.LeaseEndDate.Format("2006-01-02")
			}
			return ""
		}(),
		"expires_at": tenancy.InvitationExpiresAt.Format(time.RFC3339),
	}, nil
}

// ActivateTenant activates a tenant via public token
// Creates/updates credentials, accepts invitation, transitions unit to occupied, creates session
// All in one transaction
func (s *TenantService) ActivateTenant(
	ctx context.Context,
	token string,
	password string,
) (model.Tenancy, string, error) {
	// Validate password strength
	if len(password) < 8 {
		return model.Tenancy{}, "", ErrWeakPassword
	}

	tokenHash := s.hashToken(token)

	// Use transaction for atomic activation
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return model.Tenancy{}, "", err
	}
	defer tx.Rollback(ctx)

	// Find tenancy by token hash
	tenancy, err := s.tenancyRepo.GetByTokenHash(ctx, tokenHash)
	if err != nil {
		return model.Tenancy{}, "", ErrInvalidInvitation
	}

	// Check status
	if tenancy.Status != model.TenancyInvited {
		return model.Tenancy{}, "", ErrInvitationAlreadyUsed
	}

	// Check expiration
	if tenancy.InvitationExpiresAt != nil && time.Now().After(*tenancy.InvitationExpiresAt) {
		return model.Tenancy{}, "", ErrInvitationExpired
	}

	// Hash password
	passwordHash, err := hashPassword(password)
	if err != nil {
		return model.Tenancy{}, "", fmt.Errorf("failed to hash password: %w", err)
	}

	// Create credential for the tenant
	credentialID := uuid.New().String()
	credential := repository.Credential{
		ID:          credentialID,
		SubjectID:   tenancy.TenantSubjectID.String(),
		Type:        "password",
		Fingerprint: uuid.New().String(),
		State:       "active",
		IssuedAt:    time.Now(),
		ExpiresAt:   time.Now().Add(365 * 24 * time.Hour),
	}

	if err := s.credentialRepo.Create(ctx, credential); err != nil {
		return model.Tenancy{}, "", fmt.Errorf("failed to create credential: %w", err)
	}

	// Update subject with password
	subject, err := s.subjectRepo.GetByID(ctx, tenancy.TenantSubjectID)
	if err != nil {
		return model.Tenancy{}, "", fmt.Errorf("failed to get subject: %w", err)
	}

	subject.PasswordHash = passwordHash
	subject.UpdatedAt = time.Now()

	if err := s.subjectRepo.Update(ctx, subject); err != nil {
		return model.Tenancy{}, "", fmt.Errorf("failed to update subject: %w", err)
	}

	// Accept invitation
	if err := s.tenancyRepo.AcceptInvitation(ctx, tenancy.ID); err != nil {
		return model.Tenancy{}, "", fmt.Errorf("failed to accept invitation: %w", err)
	}

	// Update unit lifecycle to occupied
	if err := s.unitRepo.UpdateLifecycle(ctx, tenancy.UnitID, model.UnitOccupied); err != nil {
		return model.Tenancy{}, "", fmt.Errorf("failed to update unit lifecycle: %w", err)
	}

	// Create session for the tenant
	session := repository.Session{
		ID:           uuid.New().String(),
		SubjectID:    tenancy.TenantSubjectID.String(),
		CredentialID: credentialID,
		SessionID:    uuid.New().String(),
		RevocationID: uuid.New().String(),
		IssuedAt:     time.Now(),
		ExpiresAt:    time.Now().Add(24 * time.Hour),
	}

	if err := s.sessionRepo.Create(ctx, session); err != nil {
		return model.Tenancy{}, "", fmt.Errorf("failed to create session: %w", err)
	}

	// Log audit event
	_ = s.auditRepo.LogEvent(ctx, "tenancy.activate", tenancy.TenantSubjectID, "tenancy", &tenancy.ID, map[string]interface{}{
		"status": string(model.TenancyInvited),
	}, map[string]interface{}{
		"status": string(model.TenancyActive),
	}, "", "", "", true, "")

	if err := tx.Commit(ctx); err != nil {
		return model.Tenancy{}, "", err
	}

	// Return updated tenancy and session_id
	updatedTenancy, err := s.tenancyRepo.GetByID(ctx, tenancy.ID)
	if err != nil {
		return model.Tenancy{}, "", err
	}

	return updatedTenancy, session.SessionID, nil
}

// RevokeInvitation revokes a pending invitation
func (s *TenantService) RevokeInvitation(
	ctx context.Context,
	landlordSubjectID uuid.UUID,
	tenancyID uuid.UUID,
) error {
	// Check landlord authorization
	if err := s.landlordService.CheckOperationalAccess(ctx, landlordSubjectID); err != nil {
		return err
	}

	// Use transaction for atomic revoke
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)

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
		return ErrUnauthorizedOperation
	}

	// Only revoke invited tenancies
	if tenancy.Status != model.TenancyInvited {
		return errors.New("can only revoke invited tenancies")
	}

	// Revoke
	if err := s.tenancyRepo.UpdateStatus(ctx, tenancyID, model.TenancyRevoked); err != nil {
		return err
	}

	// Update unit lifecycle back to available
	if err := s.unitRepo.UpdateLifecycle(ctx, tenancy.UnitID, model.UnitAvailable); err != nil {
		return err
	}

	// Log audit event within transaction
	_ = s.auditRepo.LogEvent(ctx, "tenancy.revoke", landlordSubjectID, "tenancy", &tenancyID, map[string]interface{}{
		"status": string(tenancy.Status),
	}, map[string]interface{}{
		"status": string(model.TenancyRevoked),
		"reason": "landlord revoked",
	}, "", "", "", true, "")

	if err := tx.Commit(ctx); err != nil {
		return err
	}

	return nil
}

// ResendInvitation regenerates token for a pending invitation
func (s *TenantService) ResendInvitation(
	ctx context.Context,
	landlordSubjectID uuid.UUID,
	tenancyID uuid.UUID,
) (string, error) {
	// Check landlord authorization
	if err := s.landlordService.CheckOperationalAccess(ctx, landlordSubjectID); err != nil {
		return "", err
	}

	// Use transaction for atomic resend
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return "", err
	}
	defer tx.Rollback(ctx)

	// Get tenancy
	tenancy, err := s.tenancyRepo.GetByID(ctx, tenancyID)
	if err != nil {
		return "", err
	}

	// Verify landlord owns the property
	unit, err := s.unitRepo.GetByID(ctx, tenancy.UnitID)
	if err != nil {
		return "", err
	}

	property, err := s.propertyRepo.GetByID(ctx, unit.PropertyID)
	if err != nil {
		return "", err
	}

	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, landlordSubjectID)
	if err != nil {
		return "", err
	}

	if property.LandlordProfileID != landlordProfile.ID {
		return "", ErrUnauthorizedOperation
	}

	// Only resend invited tenancies
	if tenancy.Status != model.TenancyInvited {
		return "", errors.New("can only resend invited tenancies")
	}

	// Generate new token
	newToken, err := s.generateInvitationToken()
	if err != nil {
		return "", err
	}

	newTokenHash := s.hashToken(newToken)

	// Update tenancy with new token hash only
	tenancy.InvitationTokenHash = newTokenHash
	// Extend expiration by 7 days from now
	newExpiresAt := time.Now().Add(7 * 24 * time.Hour)
	tenancy.InvitationExpiresAt = &newExpiresAt
	tenancy.UpdatedAt = time.Now()

	if err := s.tenancyRepo.Update(ctx, tenancy); err != nil {
		return "", err
	}

	// Log audit event within transaction
	_ = s.auditRepo.LogEvent(ctx, "tenancy.resend", landlordSubjectID, "tenancy", &tenancyID, nil, map[string]interface{}{
		"new_expires_at": newExpiresAt,
	}, "", "", "", true, "")

	if err := tx.Commit(ctx); err != nil {
		return "", err
	}

	// Send resend notification (fire and forget - invitation validity independent of delivery)
	if s.notificationSvc != nil {
		tenantSubject, _ := s.subjectRepo.GetByID(ctx, tenancy.TenantSubjectID)
		go func() {
			_, _ = s.notificationSvc.SendInvitationResend(context.Background(), tenantSubject.Email, newToken)
		}()
	}

	return newToken, nil
}
