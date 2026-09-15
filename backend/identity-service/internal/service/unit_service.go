package service

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/identity-service/internal/model"
	"github.com/kirilock/backend/identity-service/internal/repository"
)

var (
	ErrUnitNotFound     = errors.New("unit not found")
	ErrUnauthorizedUnit = errors.New("not authorized to access this unit")
)

type UnitService struct {
	unitRepo        repository.UnitRepository
	propertyRepo    repository.PropertyRepository
	landlordRepo    repository.LandlordProfileRepository
	landlordService *LandlordService
}

func NewUnitService(
	unitRepo repository.UnitRepository,
	propertyRepo repository.PropertyRepository,
	landlordRepo repository.LandlordProfileRepository,
	landlordService *LandlordService,
) *UnitService {
	return &UnitService{
		unitRepo:        unitRepo,
		propertyRepo:    propertyRepo,
		landlordRepo:    landlordRepo,
		landlordService: landlordService,
	}
}

func (s *UnitService) CreateUnit(ctx context.Context, landlordSubjectID uuid.UUID, unit model.Unit) (model.Unit, error) {
	// Check landlord authorization
	if err := s.landlordService.CheckOperationalAccess(ctx, landlordSubjectID); err != nil {
		return model.Unit{}, err
	}

	// Verify property ownership
	property, err := s.propertyRepo.GetByID(ctx, unit.PropertyID)
	if err != nil {
		return model.Unit{}, ErrPropertyNotFound
	}

	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, landlordSubjectID)
	if err != nil {
		return model.Unit{}, err
	}

	if property.LandlordProfileID != landlordProfile.ID {
		return model.Unit{}, ErrUnauthorizedProperty
	}

	unit.ID = uuid.New()
	unit.Lifecycle = model.UnitAvailable
	unit.CreatedAt = time.Now()
	unit.UpdatedAt = time.Now()
	unit.Version = 1

	if err := unit.Validate(); err != nil {
		return model.Unit{}, err
	}

	if err := s.unitRepo.Create(ctx, unit); err != nil {
		return model.Unit{}, err
	}

	// Update property total units count
	property.TotalUnits++
	property.UpdatedAt = time.Now()
	s.propertyRepo.Update(ctx, property)

	return unit, nil
}

func (s *UnitService) GetUnit(ctx context.Context, landlordSubjectID uuid.UUID, unitID uuid.UUID) (model.Unit, error) {
	unit, err := s.unitRepo.GetByID(ctx, unitID)
	if err != nil {
		return model.Unit{}, err
	}

	// Check authorization via property ownership
	property, err := s.propertyRepo.GetByID(ctx, unit.PropertyID)
	if err != nil {
		return model.Unit{}, err
	}

	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, landlordSubjectID)
	if err != nil {
		return model.Unit{}, err
	}

	if property.LandlordProfileID != landlordProfile.ID {
		return model.Unit{}, ErrUnauthorizedUnit
	}

	return unit, nil
}

func (s *UnitService) GetPropertyUnits(ctx context.Context, landlordSubjectID uuid.UUID, propertyID uuid.UUID) ([]model.Unit, error) {
	// Verify property ownership
	property, err := s.propertyRepo.GetByID(ctx, propertyID)
	if err != nil {
		return nil, ErrPropertyNotFound
	}

	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, landlordSubjectID)
	if err != nil {
		return nil, err
	}

	if property.LandlordProfileID != landlordProfile.ID {
		return nil, ErrUnauthorizedProperty
	}

	return s.unitRepo.GetByPropertyID(ctx, propertyID)
}

func (s *UnitService) GetAvailableUnits(ctx context.Context, landlordSubjectID uuid.UUID, propertyID uuid.UUID) ([]model.Unit, error) {
	// Verify property ownership
	property, err := s.propertyRepo.GetByID(ctx, propertyID)
	if err != nil {
		return nil, ErrPropertyNotFound
	}

	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, landlordSubjectID)
	if err != nil {
		return nil, err
	}

	if property.LandlordProfileID != landlordProfile.ID {
		return nil, ErrUnauthorizedProperty
	}

	return s.unitRepo.GetAvailableByPropertyID(ctx, propertyID)
}

func (s *UnitService) UpdateUnit(ctx context.Context, landlordSubjectID uuid.UUID, unit model.Unit) error {
	// Check authorization
	existing, err := s.GetUnit(ctx, landlordSubjectID, unit.ID)
	if err != nil {
		return err
	}

	unit.PropertyID = existing.PropertyID
	unit.UpdatedAt = time.Now()
	unit.Version = existing.Version

	if err := unit.Validate(); err != nil {
		return err
	}

	return s.unitRepo.Update(ctx, unit)
}

func (s *UnitService) UpdateUnitLifecycle(ctx context.Context, landlordSubjectID uuid.UUID, unitID uuid.UUID, lifecycle model.UnitLifecycle) error {
	// Check authorization
	if _, err := s.GetUnit(ctx, landlordSubjectID, unitID); err != nil {
		return err
	}

	return s.unitRepo.UpdateLifecycle(ctx, unitID, lifecycle)
}
