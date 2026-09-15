package service

import (
	"errors"
	"fmt"
	"sync"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/billing-service/internal/model"
)

var (
	ErrPaymentNotFound         = errors.New("payment not found")
	ErrPaymentAlreadySettled   = errors.New("payment already settled")
	ErrPaymentSettlementDenied = errors.New("payment settlement denied")
	ErrSettlementReplay        = errors.New("settlement replay")
	ErrSettlementConflict      = errors.New("settlement conflict")
)

type SettlementRequest struct {
	PaymentID        uuid.UUID
	Provider         string
	ProviderChargeID string
	Reference        string
	AmountMinor      int64
	Currency         string
	ProviderEventID  string
	CorrelationID    string
}

type PaymentLedger interface {
	Settle(SettlementRequest) (model.Payment, error)
}

type InMemoryPaymentLedger struct {
	mu       sync.Mutex
	payments map[uuid.UUID]model.Payment
	events   map[string]struct{}
}

func NewInMemoryPaymentLedger() *InMemoryPaymentLedger {
	return &InMemoryPaymentLedger{
		payments: make(map[uuid.UUID]model.Payment),
		events:   make(map[string]struct{}),
	}
}

func (l *InMemoryPaymentLedger) Add(payment model.Payment) error {
	if err := payment.Validate(); err != nil {
		return err
	}

	l.mu.Lock()
	defer l.mu.Unlock()

	if _, exists := l.payments[payment.ID]; exists {
		return fmt.Errorf("payment already exists: %w", ErrSettlementConflict)
	}

	l.payments[payment.ID] = payment

	return nil
}

func (l *InMemoryPaymentLedger) Settle(
	req SettlementRequest,
) (model.Payment, error) {
	l.mu.Lock()
	defer l.mu.Unlock()

	payment, exists := l.payments[req.PaymentID]
	if !exists {
		return model.Payment{}, ErrPaymentNotFound
	}

	if req.Provider != payment.Provider ||
		req.ProviderChargeID != payment.ProviderChargeID ||
		req.Reference != payment.Reference ||
		req.AmountMinor != payment.AmountMinor ||
		req.Currency != payment.Currency {
		return model.Payment{}, ErrPaymentSettlementDenied
	}

	if req.ProviderEventID == "" {
		return model.Payment{}, ErrSettlementDenied()
	}

	if _, seen := l.events[req.Provider+":"+req.ProviderEventID]; seen {
		return payment, ErrSettlementReplay
	}

	if payment.Status == model.PaymentSettled {
		l.events[req.Provider+":"+req.ProviderEventID] = struct{}{}
		return payment, ErrPaymentAlreadySettled
	}

	if payment.Status != model.PaymentPending {
		return model.Payment{}, ErrPaymentSettlementDenied
	}

	now := time.Now().UTC()

	payment.Status = model.PaymentSettled
	payment.SettledAt = &now
	payment.UpdatedAt = now
	payment.Version++

	l.payments[payment.ID] = payment
	l.events[req.Provider+":"+req.ProviderEventID] = struct{}{}

	return payment, nil
}

func ErrSettlementDenied() error {
	return ErrPaymentSettlementDenied
}
