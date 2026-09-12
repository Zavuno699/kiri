package service

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
)

type SettledPayment struct {
	PaymentID       uuid.UUID
	TenantID        uuid.UUID
	LeaseID         uuid.UUID
	Reference       string
	AmountUGX       int64
	Currency        string
	DaysGranted     int
	SettledAt       time.Time
	ProviderEventID string
}

type PaymentEntitlementApplication struct {
	entitlements *EntitlementApplication
}

func NewPaymentEntitlementApplication(
	entitlements *EntitlementApplication,
) (*PaymentEntitlementApplication, error) {
	if entitlements == nil {
		return nil, errors.New("entitlement application is required")
	}

	return &PaymentEntitlementApplication{
		entitlements: entitlements,
	}, nil
}

func (a *PaymentEntitlementApplication) ApplySettledPayment(
	ctx context.Context,
	payment SettledPayment,
	expectedLeaseVersion int64,
) error {
	if a == nil || a.entitlements == nil {
		return errors.New("entitlement application is required")
	}

	if payment.PaymentID == uuid.Nil {
		return errors.New("payment ID is required")
	}
	if payment.TenantID == uuid.Nil {
		return errors.New("tenant ID is required")
	}
	if payment.LeaseID == uuid.Nil {
		return errors.New("lease ID is required")
	}
	if payment.AmountUGX <= 0 {
		return errors.New("payment amount must be positive")
	}
	if payment.Currency != "UGX" {
		return errors.New("payment currency must be UGX")
	}
	if payment.DaysGranted < 1 {
		return errors.New("days granted must be positive")
	}
	if payment.SettledAt.IsZero() {
		return errors.New("settled_at is required")
	}
	if expectedLeaseVersion < 1 {
		return errors.New("expected lease version must be positive")
	}

	return a.entitlements.ApplyPaymentEntitlement(
		ctx,
		payment.LeaseID,
		expectedLeaseVersion,
		payment.DaysGranted,
		payment.SettledAt,
	)
}
