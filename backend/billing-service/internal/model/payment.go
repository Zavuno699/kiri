package model

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type PaymentStatus string

const (
	PaymentPending   PaymentStatus = "PENDING"
	PaymentSettled   PaymentStatus = "SETTLED"
	PaymentFailed    PaymentStatus = "FAILED"
	PaymentCancelled PaymentStatus = "CANCELLED"
)

type Payment struct {
	ID                      uuid.UUID
	TenantID                uuid.UUID
	PaymentResponsibilityID *uuid.UUID // Links to identity-service PaymentResponsibility for authoritative ownership
	Reference               string
	Provider                string
	ProviderChargeID        string
	AmountMinor             int64  // Amount in minor units (cents)
	Currency                string // ISO 4217 currency code
	Status                  PaymentStatus
	IdempotencyKey          string
	RequestHash             string
	CorrelationID           string
	CreatedAt               time.Time
	UpdatedAt               time.Time
	SettledAt               *time.Time
	Version                 int64
}

func (p Payment) Validate() error {
	if p.ID == uuid.Nil {
		return errors.New("payment id is required")
	}

	if p.TenantID == uuid.Nil {
		return errors.New("tenant id is required")
	}

	if p.Reference == "" {
		return errors.New("payment reference is required")
	}

	if p.Provider == "" {
		return errors.New("payment provider is required")
	}

	if p.AmountMinor <= 0 {
		return errors.New("payment amount must be positive")
	}

	if p.Currency == "" {
		return errors.New("payment currency is required")
	}

	// Currency validation: must be ISO 4217 format (3 uppercase letters)
	if len(p.Currency) != 3 {
		return errors.New("payment currency must be 3-character ISO 4217 code")
	}

	if p.IdempotencyKey == "" {
		return errors.New("payment idempotency key is required")
	}

	if p.CorrelationID == "" {
		return errors.New("payment correlation id is required")
	}

	switch p.Status {
	case PaymentPending, PaymentSettled, PaymentFailed, PaymentCancelled:
	default:
		return errors.New("invalid payment status")
	}

	if p.Status == PaymentSettled && p.SettledAt == nil {
		return errors.New("settled payment requires settled_at")
	}

	return nil
}
