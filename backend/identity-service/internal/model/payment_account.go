package model

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type PaymentAccountStatus string

const (
	PaymentAccountPending   PaymentAccountStatus = "PENDING"
	PaymentAccountActive    PaymentAccountStatus = "ACTIVE"
	PaymentAccountPaused    PaymentAccountStatus = "PAUSED"
	PaymentAccountSuspended PaymentAccountStatus = "SUSPENDED"
	PaymentAccountCancelled PaymentAccountStatus = "CANCELLED"
	PaymentAccountFailed    PaymentAccountStatus = "FAILED"
)

type PaymentProvider string

const (
	ProviderStripe       PaymentProvider = "STRIPE"
	ProviderPayPal       PaymentProvider = "PAYPAL"
	ProviderBankTransfer PaymentProvider = "BANK_TRANSFER"
	ProviderCheck        PaymentProvider = "CHECK"
	ProviderOther        PaymentProvider = "OTHER"
)

type PaymentAccount struct {
	ID                  uuid.UUID
	LandlordProfileID   uuid.UUID
	AccountName         string
	Provider            PaymentProvider
	ProviderAccountID   string
	ProviderCustomerID  string
	Status              PaymentAccountStatus
	Currency            string
	Notes               string
	CreatedAt           time.Time
	UpdatedAt           time.Time
	Version             int
}

func (p PaymentAccount) Validate() error {
	if p.ID == uuid.Nil {
		return errors.New("id is required")
	}
	if p.LandlordProfileID == uuid.Nil {
		return errors.New("landlord_profile_id is required")
	}
	if p.AccountName == "" {
		return errors.New("account_name is required")
	}

	switch p.Provider {
	case ProviderStripe, ProviderPayPal, ProviderBankTransfer, ProviderCheck, ProviderOther:
		// Valid
	default:
		return errors.New("invalid payment provider")
	}

	switch p.Status {
	case PaymentAccountPending, PaymentAccountActive, PaymentAccountPaused,
		PaymentAccountSuspended, PaymentAccountCancelled, PaymentAccountFailed:
		// Valid
	default:
		return errors.New("invalid payment account status")
	}

	if p.Version < 1 {
		return errors.New("version must be >= 1")
	}

	return nil
}

func (p PaymentAccount) IsActive() bool {
	return p.Status == PaymentAccountActive
}
