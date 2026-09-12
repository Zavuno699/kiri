package service

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
)

type EntitlementRepository interface {
	UpdateEntitlement(
		ctx context.Context,
		id uuid.UUID,
		expectedVersion int64,
		entitlementFrom time.Time,
		entitlementUntil time.Time,
		graceUntil time.Time,
		complianceUntil time.Time,
	) error
}

type EntitlementApplication struct {
	repo   EntitlementRepository
	policy EntitlementPolicy
}

func NewEntitlementApplication(
	repo EntitlementRepository,
	policy EntitlementPolicy,
) (*EntitlementApplication, error) {
	if repo == nil {
		return nil, errors.New("entitlement repository is required")
	}

	return &EntitlementApplication{
		repo:   repo,
		policy: policy,
	}, nil
}

func (a *EntitlementApplication) ApplyPaymentEntitlement(
	ctx context.Context,
	leaseID uuid.UUID,
	expectedVersion int64,
	days int,
	now time.Time,
) error {
	if leaseID == uuid.Nil {
		return errors.New("lease ID is required")
	}
	if expectedVersion < 1 {
		return errors.New("expected lease version must be positive")
	}

	from, until, grace, compliance, err :=
		CalculateEntitlement(now, days, a.policy)
	if err != nil {
		return err
	}

	return a.repo.UpdateEntitlement(
		ctx,
		leaseID,
		expectedVersion,
		from,
		until,
		grace,
		compliance,
	)
}
