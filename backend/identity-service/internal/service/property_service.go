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
	ErrPropertyNotFound     = errors.New("property not found")
	ErrUnauthorizedProperty = errors.New("not authorized to access this property")
)

type PropertyService struct {
	propertyRepo    repository.PropertyRepository
	landlordRepo   repository.LandlordProfileRepository
	landlordService *LandlordService
}

func NewPropertyService(
	propertyRepo repository.PropertyRepository,
	landlordRepo repository.LandlordProfileRepository,
	landlordService *LandlordService,
) *PropertyService {
	return &PropertyService{
		propertyRepo:    propertyRepo,
		landlordRepo:   landlordRepo,
		landlordService: landlordService,
	}
}

func (s *PropertyService) CreateProperty(ctx context.Context, landlordSubjectID uuid.UUID, property model.Property) (model.Property, error) {
	// Check landlord authorization
	if err := s.landlordService.CheckOperationalAccess(ctx, landlordSubjectID); err != nil {
		return model.Property{}, err
	}

	// Get landlord profile
	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, landlordSubjectID)
	if err != nil {
		return model.Property{}, err
	}

	property.ID = uuid.New()
	property.LandlordProfileID = landlordProfile.ID
	property.Status = model.PropertyPendingVerification
	property.CreatedAt = time.Now()
	property.UpdatedAt = time.Now()
	property.Version = 1

	if err := property.Validate(); err != nil {
		return model.Property{}, err
	}

	if err := s.propertyRepo.Create(ctx, property); err != nil {
		return model.Property{}, err
	}

	return property, nil
}

func (s *PropertyService) GetProperty(ctx context.Context, landlordSubjectID uuid.UUID, propertyID uuid.UUID) (model.Property, error) {
	property, err := s.propertyRepo.GetByID(ctx, propertyID)
	if err != nil {
		return model.Property{}, err
	}

	// Check authorization
	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, landlordSubjectID)
	if err != nil {
		return model.Property{}, err
	}

	if property.LandlordProfileID != landlordProfile.ID {
		return model.Property{}, ErrUnauthorizedProperty
	}

	return property, nil
}

func (s *PropertyService) GetLandlordProperties(ctx context.Context, landlordSubjectID uuid.UUID) ([]model.Property, error) {
	// Check landlord authorization
	if err := s.landlordService.CheckOperationalAccess(ctx, landlordSubjectID); err != nil {
		return nil, err
	}

	return s.landlordService.GetLandlordProperties(ctx, landlordSubjectID)
}

func (s *PropertyService) UpdateProperty(ctx context.Context, landlordSubjectID uuid.UUID, property model.Property) error {
	// Check authorization
	existing, err := s.GetProperty(ctx, landlordSubjectID, property.ID)
	if err != nil {
		return err
	}

	property.LandlordProfileID = existing.LandlordProfileID
	property.UpdatedAt = time.Now()
	property.Version = existing.Version

	if err := property.Validate(); err != nil {
		return err
	}

	return s.propertyRepo.Update(ctx, property)
}

func (s *PropertyService) ActivateProperty(ctx context.Context, landlordSubjectID uuid.UUID, propertyID uuid.UUID) error {
	property, err := s.GetProperty(ctx, landlordSubjectID, propertyID)
	if err != nil {
		return err
	}

	property.Status = model.PropertyActive
	property.UpdatedAt = time.Now()

	return s.propertyRepo.UpdateStatus(ctx, propertyID, property.Status)
}
