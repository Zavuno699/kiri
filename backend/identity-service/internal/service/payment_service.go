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
	ErrPaymentAccountNotFound = errors.New("payment account not found")
	ErrUnauthorizedPayment    = errors.New("not authorized to access this payment account")
)

type PaymentService struct {
	paymentAccountRepo        repository.PaymentAccountRepository
	paymentResponsibilityRepo repository.PaymentResponsibilityRepository
	landlordRepo              repository.LandlordProfileRepository
	landlordService           *LandlordService
}

func NewPaymentService(
	paymentAccountRepo repository.PaymentAccountRepository,
	paymentResponsibilityRepo repository.PaymentResponsibilityRepository,
	landlordRepo repository.LandlordProfileRepository,
	landlordService *LandlordService,
) *PaymentService {
	return &PaymentService{
		paymentAccountRepo:        paymentAccountRepo,
		paymentResponsibilityRepo: paymentResponsibilityRepo,
		landlordRepo:              landlordRepo,
		landlordService:           landlordService,
	}
}

func (s *PaymentService) CreatePaymentAccount(ctx context.Context, landlordSubjectID uuid.UUID, account model.PaymentAccount) (model.PaymentAccount, error) {
	// Check landlord authorization
	if err := s.landlordService.CheckOperationalAccess(ctx, landlordSubjectID); err != nil {
		return model.PaymentAccount{}, err
	}

	// Get landlord profile
	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, landlordSubjectID)
	if err != nil {
		return model.PaymentAccount{}, err
	}

	account.ID = uuid.New()
	account.LandlordProfileID = landlordProfile.ID
	account.Status = model.PaymentAccountPending
	account.CreatedAt = time.Now()
	account.UpdatedAt = time.Now()
	account.Version = 1

	if err := account.Validate(); err != nil {
		return model.PaymentAccount{}, err
	}

	if err := s.paymentAccountRepo.Create(ctx, account); err != nil {
		return model.PaymentAccount{}, err
	}

	return account, nil
}

func (s *PaymentService) GetPaymentAccount(ctx context.Context, landlordSubjectID uuid.UUID, accountID uuid.UUID) (model.PaymentAccount, error) {
	account, err := s.paymentAccountRepo.GetByID(ctx, accountID)
	if err != nil {
		return model.PaymentAccount{}, err
	}

	// Check authorization
	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, landlordSubjectID)
	if err != nil {
		return model.PaymentAccount{}, err
	}

	if account.LandlordProfileID != landlordProfile.ID {
		return model.PaymentAccount{}, ErrUnauthorizedPayment
	}

	return account, nil
}

func (s *PaymentService) GetLandlordPaymentAccounts(ctx context.Context, landlordSubjectID uuid.UUID) ([]model.PaymentAccount, error) {
	// Check landlord authorization
	if err := s.landlordService.CheckOperationalAccess(ctx, landlordSubjectID); err != nil {
		return nil, err
	}

	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, landlordSubjectID)
	if err != nil {
		return nil, err
	}

	return s.paymentAccountRepo.GetByLandlordProfileID(ctx, landlordProfile.ID)
}

func (s *PaymentService) ActivatePaymentAccount(ctx context.Context, landlordSubjectID uuid.UUID, accountID uuid.UUID) error {
	account, err := s.GetPaymentAccount(ctx, landlordSubjectID, accountID)
	if err != nil {
		return err
	}

	account.Status = model.PaymentAccountActive
	account.UpdatedAt = time.Now()

	return s.paymentAccountRepo.UpdateStatus(ctx, accountID, account.Status)
}

func (s *PaymentService) CreatePaymentResponsibility(
	ctx context.Context,
	landlordSubjectID uuid.UUID,
	responsibility model.PaymentResponsibility,
) (model.PaymentResponsibility, error) {
	// Check landlord authorization
	if err := s.landlordService.CheckOperationalAccess(ctx, landlordSubjectID); err != nil {
		return model.PaymentResponsibility{}, err
	}

	// Verify payment account ownership
	account, err := s.paymentAccountRepo.GetByID(ctx, responsibility.PaymentAccountID)
	if err != nil {
		return model.PaymentResponsibility{}, ErrPaymentAccountNotFound
	}

	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, landlordSubjectID)
	if err != nil {
		return model.PaymentResponsibility{}, err
	}

	if account.LandlordProfileID != landlordProfile.ID {
		return model.PaymentResponsibility{}, ErrUnauthorizedPayment
	}

	responsibility.ID = uuid.New()
	responsibility.Status = model.PaymentResponsibilityActive
	responsibility.CreatedAt = time.Now()
	responsibility.UpdatedAt = time.Now()
	responsibility.Version = 1

	if err := responsibility.Validate(); err != nil {
		return model.PaymentResponsibility{}, err
	}

	if err := s.paymentResponsibilityRepo.Create(ctx, responsibility); err != nil {
		return model.PaymentResponsibility{}, err
	}

	return responsibility, nil
}

func (s *PaymentService) GetTenantPaymentResponsibility(ctx context.Context, tenantSubjectID uuid.UUID) (model.PaymentResponsibility, error) {
	return s.paymentResponsibilityRepo.GetActiveByTenantSubjectID(ctx, tenantSubjectID)
}

func (s *PaymentService) UpdatePaymentResponsibility(
	ctx context.Context,
	landlordSubjectID uuid.UUID,
	responsibility model.PaymentResponsibility,
) error {
	// Check landlord authorization
	if err := s.landlordService.CheckOperationalAccess(ctx, landlordSubjectID); err != nil {
		return err
	}

	// Verify payment account ownership
	account, err := s.paymentAccountRepo.GetByID(ctx, responsibility.PaymentAccountID)
	if err != nil {
		return err
	}

	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, landlordSubjectID)
	if err != nil {
		return err
	}

	if account.LandlordProfileID != landlordProfile.ID {
		return ErrUnauthorizedPayment
	}

	responsibility.UpdatedAt = time.Now()

	return s.paymentResponsibilityRepo.Update(ctx, responsibility)
}
