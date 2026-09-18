package service

import (
	"errors"
	"testing"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/billing-service/internal/model"
)

func phase5HPayment() model.Payment {
	now := time.Now().UTC()

	return model.Payment{
		ID:             uuid.New(),
		TenantID:       uuid.New(),
		Reference:      "KIRI-5H-001",
		Provider:       "flutterwave",
		AmountMinor:    20000,
		Currency:       "UGX",
		Status:         model.PaymentPending,
		IdempotencyKey: uuid.NewString(),
		CorrelationID:  uuid.NewString(),
		CreatedAt:      now,
		UpdatedAt:      now,
		Version:        1,
	}
}

func phase5HRequest(p model.Payment, eventID string) SettlementRequest {
	return SettlementRequest{
		PaymentID:        p.ID,
		Provider:         p.Provider,
		ProviderChargeID: "FLW-CHARGE-5H-001",
		Reference:        p.Reference,
		AmountMinor:      p.AmountMinor,
		Currency:         p.Currency,
		ProviderEventID:  eventID,
		CorrelationID:    p.CorrelationID,
	}
}

func TestPhase5HSettlement(t *testing.T) {
	ledger := NewInMemoryPaymentLedger()
	payment := phase5HPayment()
	payment.ProviderChargeID = "FLW-CHARGE-5H-001"

	if err := ledger.Add(payment); err != nil {
		t.Fatalf("add payment: %v", err)
	}

	settled, err := ledger.Settle(
		phase5HRequest(payment, "event-001"),
	)

	if err != nil {
		t.Fatalf("settlement failed: %v", err)
	}

	if settled.Status != model.PaymentSettled {
		t.Fatalf("status = %q, want SETTLED", settled.Status)
	}

	if settled.SettledAt == nil {
		t.Fatal("settled_at is nil")
	}

	if settled.Version != 2 {
		t.Fatalf("version = %d, want 2", settled.Version)
	}
}

func TestPhase5HRejectsWrongAmount(t *testing.T) {
	ledger := NewInMemoryPaymentLedger()
	payment := phase5HPayment()
	payment.ProviderChargeID = "FLW-CHARGE-5H-001"

	if err := ledger.Add(payment); err != nil {
		t.Fatalf("add payment: %v", err)
	}

	req := phase5HRequest(payment, "event-002")
	req.AmountMinor = 999999

	_, err := ledger.Settle(req)

	if !errors.Is(err, ErrPaymentSettlementDenied) {
		t.Fatalf("error = %v, want settlement denied", err)
	}
}

func TestPhase5HRejectsWrongReference(t *testing.T) {
	ledger := NewInMemoryPaymentLedger()
	payment := phase5HPayment()
	payment.ProviderChargeID = "FLW-CHARGE-5H-001"

	if err := ledger.Add(payment); err != nil {
		t.Fatalf("add payment: %v", err)
	}

	req := phase5HRequest(payment, "event-003")
	req.Reference = "ATTACKER-REFERENCE"

	_, err := ledger.Settle(req)

	if !errors.Is(err, ErrPaymentSettlementDenied) {
		t.Fatalf("error = %v, want settlement denied", err)
	}
}

func TestPhase5HRejectsWrongChargeID(t *testing.T) {
	ledger := NewInMemoryPaymentLedger()
	payment := phase5HPayment()
	payment.ProviderChargeID = "FLW-CHARGE-5H-001"

	if err := ledger.Add(payment); err != nil {
		t.Fatalf("add payment: %v", err)
	}

	req := phase5HRequest(payment, "event-004")
	req.ProviderChargeID = "FLW-ATTACKER-CHARGE"

	_, err := ledger.Settle(req)

	if !errors.Is(err, ErrPaymentSettlementDenied) {
		t.Fatalf("error = %v, want settlement denied", err)
	}
}

func TestPhase5HRejectsWrongCurrency(t *testing.T) {
	ledger := NewInMemoryPaymentLedger()
	payment := phase5HPayment()
	payment.ProviderChargeID = "FLW-CHARGE-5H-001"

	if err := ledger.Add(payment); err != nil {
		t.Fatalf("add payment: %v", err)
	}

	req := phase5HRequest(payment, "event-005")
	req.Currency = "USD"

	_, err := ledger.Settle(req)

	if !errors.Is(err, ErrPaymentSettlementDenied) {
		t.Fatalf("error = %v, want settlement denied", err)
	}
}

func TestPhase5HRejectsUnknownPayment(t *testing.T) {
	ledger := NewInMemoryPaymentLedger()

	payment := phase5HPayment()
	payment.ProviderChargeID = "FLW-CHARGE-5H-001"

	_, err := ledger.Settle(
		phase5HRequest(payment, "event-006"),
	)

	if !errors.Is(err, ErrPaymentNotFound) {
		t.Fatalf("error = %v, want payment not found", err)
	}
}

func TestPhase5HRejectsReplay(t *testing.T) {
	ledger := NewInMemoryPaymentLedger()
	payment := phase5HPayment()
	payment.ProviderChargeID = "FLW-CHARGE-5H-001"

	if err := ledger.Add(payment); err != nil {
		t.Fatalf("add payment: %v", err)
	}

	req := phase5HRequest(payment, "event-007")

	first, err := ledger.Settle(req)
	if err != nil {
		t.Fatalf("first settlement failed: %v", err)
	}

	second, err := ledger.Settle(req)

	if !errors.Is(err, ErrSettlementReplay) &&
		!errors.Is(err, ErrPaymentAlreadySettled) {
		t.Fatalf("second settlement error = %v", err)
	}

	if second.ID != first.ID {
		t.Fatal("replay returned a different payment")
	}
}

func TestPhase5HSettlesOnlyOnce(t *testing.T) {
	ledger := NewInMemoryPaymentLedger()
	payment := phase5HPayment()
	payment.ProviderChargeID = "FLW-CHARGE-5H-001"

	if err := ledger.Add(payment); err != nil {
		t.Fatalf("add payment: %v", err)
	}

	req1 := phase5HRequest(payment, "event-008")
	req2 := phase5HRequest(payment, "event-009")

	settled, err := ledger.Settle(req1)
	if err != nil {
		t.Fatalf("first settlement failed: %v", err)
	}

	_, err = ledger.Settle(req2)

	if !errors.Is(err, ErrPaymentAlreadySettled) {
		t.Fatalf("second event error = %v, want already settled", err)
	}

	if settled.Status != model.PaymentSettled {
		t.Fatal("payment was not settled")
	}
}

func TestPhase5HValidationDoesNotSettlePayment(t *testing.T) {
	ledger := NewInMemoryPaymentLedger()
	payment := phase5HPayment()
	payment.ProviderChargeID = "FLW-CHARGE-5H-001"

	if err := ledger.Add(payment); err != nil {
		t.Fatalf("add payment: %v", err)
	}

	if payment.Status != model.PaymentPending {
		t.Fatalf("initial status = %q", payment.Status)
	}

	if payment.SettledAt != nil {
		t.Fatal("new payment unexpectedly has settled_at")
	}
}
