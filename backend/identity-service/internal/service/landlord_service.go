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
	ErrLandlordNotVerified      = errors.New("landlord not verified")
	ErrLandlordNotAuthorized    = errors.New("landlord not authorized for this operation")
	ErrInvalidVerificationState = errors.New("invalid verification state transition")
)

type LandlordService struct {
	landlordRepo repository.LandlordProfileRepository
	propertyRepo repository.PropertyRepository
}

func NewLandlordService(
	landlordRepo repository.LandlordProfileRepository,
	propertyRepo repository.PropertyRepository,
) *LandlordService {
	return &LandlordService{
		landlordRepo: landlordRepo,
		propertyRepo: propertyRepo,
	}
}

func (s *LandlordService) CreateLandlordProfile(ctx context.Context, subjectID uuid.UUID, legalName string) (model.LandlordProfile, error) {
	profile := model.LandlordProfile{
		ID:                 uuid.New(),
		SubjectID:          subjectID,
		VerificationStatus:  model.VerificationPending,
		AuthorizationState:  model.AuthorizationAccountCreated,
		LegalName:          legalName,
		CreatedAt:          time.Now(),
		UpdatedAt:          time.Now(),
		Version:            1,
	}

	if err := profile.Validate(); err != nil {
		return model.LandlordProfile{}, err
	}

	if err := s.landlordRepo.Create(ctx, profile); err != nil {
		return model.LandlordProfile{}, err
	}

	return profile, nil
}

func (s *LandlordService) SubmitVerificationInformation(ctx context.Context, profileID uuid.UUID, info model.LandlordProfile) error {
	profile, err := s.landlordRepo.GetByID(ctx, profileID)
	if err != nil {
		return err
	}

	if profile.VerificationStatus != model.VerificationPending && 
	   profile.VerificationStatus != model.VerificationNeedsMoreInformation {
		return ErrInvalidVerificationState
	}

	profile.VerificationStatus = model.VerificationInformationSubmitted
	profile.LegalName = info.LegalName
	profile.BusinessName = info.BusinessName
	profile.TaxID = info.TaxID
	profile.Phone = info.Phone
	profile.AddressLine1 = info.AddressLine1
	profile.AddressLine2 = info.AddressLine2
	profile.City = info.City
	profile.State = info.State
	profile.PostalCode = info.PostalCode
	profile.Country = info.Country
	profile.SubmittedAt = &[]time.Time{time.Now()}[0]
	profile.UpdatedAt = time.Now()
	profile.Version++

	if err := profile.Validate(); err != nil {
		return err
	}

	return s.landlordRepo.Update(ctx, profile)
}

func (s *LandlordService) ApproveVerification(ctx context.Context, profileID uuid.UUID) error {
	profile, err := s.landlordRepo.GetByID(ctx, profileID)
	if err != nil {
		return err
	}

	if profile.VerificationStatus != model.VerificationInformationSubmitted && 
	   profile.VerificationStatus != model.VerificationUnderReview {
		return ErrInvalidVerificationState
	}

	profile.VerificationStatus = model.VerificationVerified
	profile.AuthorizationState = model.AuthorizationIdentityVerified
	now := time.Now()
	profile.ReviewedAt = &now
	profile.VerifiedAt = &now
	profile.UpdatedAt = time.Now()
	profile.Version++

	if err := profile.Validate(); err != nil {
		return err
	}

	return s.landlordRepo.Update(ctx, profile)
}

func (s *LandlordService) RejectVerification(ctx context.Context, profileID uuid.UUID, reason string) error {
	profile, err := s.landlordRepo.GetByID(ctx, profileID)
	if err != nil {
		return err
	}

	if profile.VerificationStatus != model.VerificationInformationSubmitted && 
	   profile.VerificationStatus != model.VerificationUnderReview {
		return ErrInvalidVerificationState
	}

	profile.VerificationStatus = model.VerificationRejected
	profile.RejectionReason = reason
	now := time.Now()
	profile.ReviewedAt = &now
	profile.UpdatedAt = time.Now()
	profile.Version++

	if err := profile.Validate(); err != nil {
		return err
	}

	return s.landlordRepo.Update(ctx, profile)
}

func (s *LandlordService) RequestMoreInformation(ctx context.Context, profileID uuid.UUID, notes string) error {
	profile, err := s.landlordRepo.GetByID(ctx, profileID)
	if err != nil {
		return err
	}

	if profile.VerificationStatus != model.VerificationInformationSubmitted && 
	   profile.VerificationStatus != model.VerificationUnderReview {
		return ErrInvalidVerificationState
	}

	profile.VerificationStatus = model.VerificationNeedsMoreInformation
	profile.Notes = notes
	now := time.Now()
	profile.ReviewedAt = &now
	profile.UpdatedAt = time.Now()
	profile.Version++

	if err := profile.Validate(); err != nil {
		return err
	}

	return s.landlordRepo.Update(ctx, profile)
}

func (s *LandlordService) UpdateAuthorizationState(ctx context.Context, profileID uuid.UUID, state model.LandlordAuthorizationState) error {
	profile, err := s.landlordRepo.GetByID(ctx, profileID)
	if err != nil {
		return err
	}

	// Validate state transitions
	switch state {
	case model.AuthorizationIdentityVerified:
		if profile.VerificationStatus != model.VerificationVerified {
			return ErrLandlordNotVerified
		}
	case model.AuthorizationOwnershipVerified:
		if profile.AuthorizationState != model.AuthorizationIdentityVerified {
			return ErrInvalidVerificationState
		}
	case model.AuthorizationPaymentVerified:
		if profile.AuthorizationState != model.AuthorizationOwnershipVerified {
			return ErrInvalidVerificationState
		}
	case model.AuthorizationOperationalAccess:
		if profile.AuthorizationState != model.AuthorizationPaymentVerified {
			return ErrInvalidVerificationState
		}
	}

	return s.landlordRepo.UpdateAuthorizationState(ctx, profileID, state)
}

func (s *LandlordService) CheckOperationalAccess(ctx context.Context, subjectID uuid.UUID) error {
	profile, err := s.landlordRepo.GetBySubjectID(ctx, subjectID)
	if err != nil {
		return err
	}

	if !profile.CanPerformOperationalActions() {
		return ErrLandlordNotAuthorized
	}

	return nil
}

func (s *LandlordService) GetLandlordProfile(ctx context.Context, subjectID uuid.UUID) (model.LandlordProfile, error) {
	return s.landlordRepo.GetBySubjectID(ctx, subjectID)
}

func (s *LandlordService) GetLandlordProperties(ctx context.Context, subjectID uuid.UUID) ([]model.Property, error) {
	profile, err := s.landlordRepo.GetBySubjectID(ctx, subjectID)
	if err != nil {
		return nil, err
	}

	return s.propertyRepo.GetByLandlordProfileID(ctx, profile.ID)
}
