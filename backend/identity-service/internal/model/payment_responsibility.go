package model

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type PaymentResponsibilityStatus string

const (
	PaymentResponsibilityActive      PaymentResponsibilityStatus = "ACTIVE"
	PaymentResponsibilityInactive   PaymentResponsibilityStatus = "INACTIVE"
	PaymentResponsibilityTransferred PaymentResponsibilityStatus = "TRANSFERRED"
)

type PaymentResponsibility struct {
	ID                      uuid.UUID
	TenantSubjectID         uuid.UUID
	PaymentAccountID        uuid.UUID
	TenancyID               uuid.UUID
	Status                  PaymentResponsibilityStatus
	ResponsibleForRent      bool
	ResponsibleForUtilities bool
	ResponsibleForFees      bool
	MonthlyRentAmount       float64
	Notes                   string
	CreatedAt               time.Time
	UpdatedAt               time.Time
	Version                 int
}

func (p PaymentResponsibility) Validate() error {
	if p.ID == uuid.Nil {
		return errors.New("id is required")
	}
	if p.TenantSubjectID == uuid.Nil {
		return errors.New("tenant_subject_id is required")
	}
	if p.PaymentAccountID == uuid.Nil {
		return errors.New("payment_account_id is required")
	}
	if p.TenancyID == uuid.Nil {
		return errors.New("tenancy_id is required")
	}

	switch p.Status {
	case PaymentResponsibilityActive, PaymentResponsibilityInactive, PaymentResponsibilityTransferred:
		// Valid
	default:
		return errors.New("invalid payment responsibility status")
	}

	if p.MonthlyRentAmount < 0 {
		return errors.New("monthly_rent_amount must be >= 0")
	}

	if p.Version < 1 {
		return errors.New("version must be >= 1")
	}

	return nil
}

func (p PaymentResponsibility) IsActive() bool {
	return p.Status == PaymentResponsibilityActive
}
