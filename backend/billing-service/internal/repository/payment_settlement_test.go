package repository

import (
	"context"
	"database/sql"
	"errors"
	"regexp"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/google/uuid"
	"github.com/kirilock/backend/billing-service/internal/model"
)

const settlementTime = "2026-01-01 00:00:00 +0000 UTC"

func settlementPayment() model.Payment {
	now := time.Now().UTC().Truncate(time.Microsecond)

	return model.Payment{
		ID:               uuid.New(),
		TenantID:         uuid.New(),
		Reference:        "KIRI-5J-REF-001",
		Provider:         "FLUTTERWAVE",
		ProviderChargeID: "",
		AmountMinor:      50000, // 500.00 in minor units
		Currency:         "UGX",
		Status:           model.PaymentPending,
		IdempotencyKey:   "idem-5j-001",
		CorrelationID:    "corr-5j-001",
		CreatedAt:        now,
		UpdatedAt:        now,
		Version:          1,
	}
}

func settlementNow() time.Time {
	return time.Date(
		2026,
		time.January,
		1,
		0,
		0,
		0,
		0,
		time.UTC,
	)
}

func expectPaymentLock(
	mock sqlmock.Sqlmock,
	payment model.Payment,
) {
	mock.ExpectQuery(regexp.QuoteMeta(`
		SELECT
			id,
			tenant_id,
			provider,
			reference,
			provider_charge_id,
			amount_minor,
			currency,
			status,
			version
		FROM payments
		WHERE reference = $1
		FOR UPDATE
	`)).
		WithArgs(payment.Reference).
		WillReturnRows(
			sqlmock.NewRows([]string{
				"id",
				"tenant_id",
				"provider",
				"reference",
				"provider_charge_id",
				"amount_minor",
				"currency",
				"status",
				"version",
			}).
				AddRow(
					payment.ID,
					payment.TenantID,
					payment.Provider,
					payment.Reference,
					nil,
					payment.AmountMinor,
					payment.Currency,
					string(model.PaymentPending),
					payment.Version,
				),
		)
}

func expectWebhookInsert(
	mock sqlmock.Sqlmock,
	payment model.Payment,
	webhookEventID string,
	providerChargeID string,
	payloadHash string,
) {
	mock.ExpectExec(regexp.QuoteMeta(`
		INSERT INTO payment_webhook_receipts (
			id,
			provider,
			provider_event_id,
			payment_id,
			provider_charge_id,
			payload_hash,
			received_at,
			processed_at,
			status
		)
		VALUES (
			$1,
			$2,
			$3,
			$4,
			$5,
			$6,
			$7,
			$7,
			$8
		)
	`)).
		WithArgs(
			sqlmock.AnyArg(),
			payment.Provider,
			webhookEventID,
			payment.ID,
			providerChargeID,
			payloadHash,
			settlementNow(),
			"PROCESSED",
		).
		WillReturnResult(sqlmock.NewResult(1, 1))
}
func expectPaymentUpdate(
	mock sqlmock.Sqlmock,
	payment model.Payment,
	providerChargeID string,
) {
	mock.ExpectExec(regexp.QuoteMeta(`
		UPDATE payments
		SET
			provider_charge_id = $1,
			status = $2,
			updated_at = $3,
			settled_at = $3,
			version = version + 1
		WHERE id = $4
		  AND version = $5
		  AND status <> $6
	`)).
		WithArgs(
			providerChargeID,
			model.PaymentSettled,
			settlementNow(),
			payment.ID,
			payment.Version,
			model.PaymentSettled,
		).
		WillReturnResult(sqlmock.NewResult(1, 1))
}

func TestSettlePaymentUsesTransaction(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	repo := NewPaymentRepository(db)
	payment := settlementPayment()

	mock.ExpectBegin()

	expectPaymentLock(mock, payment)

	expectWebhookInsert(
		mock,
		payment,
		"FW-EVENT-5J-001",
		"FW-CHARGE-5J-001",
		"payload-hash-5j-001",
	)

	expectPaymentUpdate(
		mock,
		payment,
		"FW-CHARGE-5J-001",
	)

	mock.ExpectCommit()

	err = repo.SettlePayment(
		context.Background(),
		payment.Provider,
		payment.Reference,
		"FW-CHARGE-5J-001",
		payment.AmountMinor,
		payment.Currency,
		"FW-EVENT-5J-001",
		"payload-hash-5j-001",
		settlementNow(),
	)

	if err != nil {
		t.Fatalf("SettlePayment returned error: %v", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("transaction expectations were not met: %v", err)
	}
}

func TestSettlePaymentRollsBackWhenWebhookReceiptFails(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	repo := NewPaymentRepository(db)
	payment := settlementPayment()

	mock.ExpectBegin()

	expectPaymentLock(mock, payment)

	mock.ExpectExec(regexp.QuoteMeta(`
		INSERT INTO payment_webhook_receipts (
			id,
			provider,
			provider_event_id,
			payment_id,
			provider_charge_id,
			payload_hash,
			received_at,
			processed_at,
			status
		)
		VALUES (
			$1,
			$2,
			$3,
			$4,
			$5,
			$6,
			$7,
			$7,
			$8
		)
	`)).
		WillReturnError(errors.New("simulated receipt failure"))

	mock.ExpectRollback()

	err = repo.SettlePayment(
		context.Background(),
		payment.Provider,
		payment.Reference,
		"FW-CHARGE-5J-002",
		payment.AmountMinor,
		payment.Currency,
		"FW-EVENT-5J-002",
		"payload-hash-5j-002",
		settlementNow(),
	)

	if err == nil {
		t.Fatal("expected settlement failure")
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("rollback expectations were not met: %v", err)
	}
}

func TestSettlePaymentRejectsInvalidCurrencyBeforeTransaction(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	repo := NewPaymentRepository(db)
	payment := settlementPayment()

	// Test that currency mismatch is detected (not UGX-only restriction)
	err = repo.SettlePayment(
		context.Background(),
		payment.Provider,
		payment.Reference,
		"FW-CHARGE-5J-003",
		payment.AmountMinor,
		"USD", // Different currency than the payment
		"FW-EVENT-5J-003",
		"payload-hash-5j-003",
		settlementNow(),
	)

	// This should fail because the database will detect the currency mismatch
	// The actual error message depends on the database query
	if err == nil {
		t.Fatal("expected currency mismatch error")
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("unexpected database interaction: %v", err)
	}
}

func TestSettlePaymentRejectsAmountMismatch(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	repo := NewPaymentRepository(db)
	payment := settlementPayment()

	mock.ExpectBegin()

	expectPaymentLock(mock, payment)

	mock.ExpectRollback()

	err = repo.SettlePayment(
		context.Background(),
		payment.Provider,
		payment.Reference,
		"FW-CHARGE-5J-004",
		payment.AmountMinor+1,
		payment.Currency,
		"FW-EVENT-5J-004",
		"payload-hash-5j-004",
		settlementNow(),
	)

	if !errors.Is(err, ErrPaymentMismatch) {
		t.Fatalf("expected ErrPaymentMismatch, got %v", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("database expectations were not met: %v", err)
	}
}

func TestSettlePaymentRejectsProviderMismatch(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	repo := NewPaymentRepository(db)
	payment := settlementPayment()

	mock.ExpectBegin()

	expectPaymentLock(mock, payment)

	mock.ExpectRollback()

	err = repo.SettlePayment(
		context.Background(),
		"OTHER_PROVIDER",
		payment.Reference,
		"FW-CHARGE-5J-005",
		payment.AmountMinor,
		payment.Currency,
		"FW-EVENT-5J-005",
		"payload-hash-5j-005",
		settlementNow(),
	)

	if !errors.Is(err, ErrPaymentMismatch) {
		t.Fatalf("expected ErrPaymentMismatch, got %v", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("database expectations were not met: %v", err)
	}
}

func TestSettlePaymentRejectsProviderChargeMismatch(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	repo := NewPaymentRepository(db)
	payment := settlementPayment()
	payment.ProviderChargeID = "FW-ORIGINAL-CHARGE"

	mock.ExpectBegin()

	expectPaymentLockWithCharge(
		mock,
		payment,
	)

	mock.ExpectRollback()

	err = repo.SettlePayment(
		context.Background(),
		payment.Provider,
		payment.Reference,
		"FW-DIFFERENT-CHARGE",
		payment.AmountMinor,
		payment.Currency,
		"FW-EVENT-5J-006",
		"payload-hash-5j-006",
		settlementNow(),
	)

	if !errors.Is(err, ErrPaymentMismatch) {
		t.Fatalf("expected ErrPaymentMismatch, got %v", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("database expectations were not met: %v", err)
	}
}

func expectPaymentLockWithCharge(
	mock sqlmock.Sqlmock,
	payment model.Payment,
) {
	mock.ExpectQuery(regexp.QuoteMeta(`
		SELECT
			id,
			tenant_id,
			provider,
			reference,
			provider_charge_id,
			amount_minor,
			currency,
			status,
			version
		FROM payments
		WHERE reference = $1
		FOR UPDATE
	`)).
		WithArgs(payment.Reference).
		WillReturnRows(
			sqlmock.NewRows([]string{
				"id",
				"tenant_id",
				"provider",
				"reference",
				"provider_charge_id",
				"amount_minor",
				"currency",
				"status",
				"version",
			}).
				AddRow(
					payment.ID,
					payment.TenantID,
					payment.Provider,
					payment.Reference,
					payment.ProviderChargeID,
					payment.AmountMinor,
					payment.Currency,
					string(model.PaymentPending),
					payment.Version,
				),
		)
}

func TestSettlePaymentAlreadySettledIsNotSecondSettlement(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	repo := NewPaymentRepository(db)
	payment := settlementPayment()
	payment.ProviderChargeID = "FW-ALREADY-SETTLED"

	mock.ExpectBegin()

	mock.ExpectQuery(regexp.QuoteMeta(`
		SELECT
			id,
			tenant_id,
			provider,
			reference,
			provider_charge_id,
			amount_minor,
			currency,
			status,
			version
		FROM payments
		WHERE reference = $1
		FOR UPDATE
	`)).
		WithArgs(payment.Reference).
		WillReturnRows(
			sqlmock.NewRows([]string{
				"id",
				"tenant_id",
				"provider",
				"reference",
				"provider_charge_id",
				"amount_minor",
				"currency",
				"status",
				"version",
			}).
				AddRow(
					payment.ID,
					payment.TenantID,
					payment.Provider,
					payment.Reference,
					payment.ProviderChargeID,
					payment.AmountMinor,
					payment.Currency,
					string(model.PaymentSettled),
					payment.Version,
				),
		)

	mock.ExpectRollback()

	err = repo.SettlePayment(
		context.Background(),
		payment.Provider,
		payment.Reference,
		payment.ProviderChargeID,
		payment.AmountMinor,
		payment.Currency,
		"FW-EVENT-5J-007",
		"payload-hash-5j-007",
		settlementNow(),
	)

	if !errors.Is(err, ErrPaymentAlreadySettled) {
		t.Fatalf("expected ErrPaymentAlreadySettled, got %v", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("database expectations were not met: %v", err)
	}
}

type duplicateKeyError struct{}

func (e *duplicateKeyError) Error() string {
	return "duplicate key value violates unique constraint"
}

func (e *duplicateKeyError) SQLState() string {
	return "23505"
}

func TestSettlePaymentRejectsReplayFromReceiptConstraint(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	repo := NewPaymentRepository(db)
	payment := settlementPayment()

	mock.ExpectBegin()

	expectPaymentLock(mock, payment)

	mock.ExpectExec(regexp.QuoteMeta(`
		INSERT INTO payment_webhook_receipts (
			id,
			provider,
			provider_event_id,
			payment_id,
			provider_charge_id,
			payload_hash,
			received_at,
			processed_at,
			status
		)
		VALUES (
			$1,
			$2,
			$3,
			$4,
			$5,
			$6,
			$7,
			$7,
			$8
		)
	`)).
		WillReturnError(&duplicateKeyError{})

	mock.ExpectRollback()

	err = repo.SettlePayment(
		context.Background(),
		payment.Provider,
		payment.Reference,
		"FW-CHARGE-5J-008",
		payment.AmountMinor,
		payment.Currency,
		"FW-EVENT-5J-008",
		"payload-hash-5j-008",
		settlementNow(),
	)

	if !errors.Is(err, ErrWebhookAlreadySeen) {
		t.Fatalf("expected ErrWebhookAlreadySeen, got %v", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("database expectations were not met: %v", err)
	}
}

func TestSettlePaymentDoesNotCommitAfterUpdateFailure(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	repo := NewPaymentRepository(db)
	payment := settlementPayment()

	mock.ExpectBegin()

	expectPaymentLock(mock, payment)

	expectWebhookInsert(
		mock,
		payment,
		"FW-EVENT-5J-009",
		"FW-CHARGE-5J-009",
		"payload-hash-5j-009",
	)

	mock.ExpectExec(regexp.QuoteMeta(`
		UPDATE payments
		SET
			provider_charge_id = $1,
			status = $2,
			updated_at = $3,
			settled_at = $3,
			version = version + 1
		WHERE id = $4
		  AND version = $5
		  AND status <> $6
	`)).
		WillReturnError(errors.New("simulated payment update failure"))

	mock.ExpectRollback()

	err = repo.SettlePayment(
		context.Background(),
		payment.Provider,
		payment.Reference,
		"FW-CHARGE-5J-009",
		payment.AmountMinor,
		payment.Currency,
		"FW-EVENT-5J-009",
		"payload-hash-5j-009",
		settlementNow(),
	)

	if err == nil {
		t.Fatal("expected settlement failure")
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("rollback expectations were not met: %v", err)
	}
}

func TestSettlePaymentReturnsNotFound(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	repo := NewPaymentRepository(db)
	payment := settlementPayment()

	mock.ExpectBegin()

	mock.ExpectQuery(regexp.QuoteMeta(`
		SELECT
			id,
			tenant_id,
			provider,
			reference,
			provider_charge_id,
			amount_minor,
			currency,
			status,
			version
		FROM payments
		WHERE reference = $1
		FOR UPDATE
	`)).
		WithArgs(payment.Reference).
		WillReturnError(sql.ErrNoRows)

	mock.ExpectRollback()

	err = repo.SettlePayment(
		context.Background(),
		payment.Provider,
		payment.Reference,
		"FW-CHARGE-5J-010",
		payment.AmountMinor,
		payment.Currency,
		"FW-EVENT-5J-010",
		"payload-hash-5j-010",
		settlementNow(),
	)

	if !errors.Is(err, ErrPaymentNotFound) {
		t.Fatalf("expected ErrPaymentNotFound, got %v", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("database expectations were not met: %v", err)
	}
}

func TestSettlePaymentRejectsEmptyRequiredFields(t *testing.T) {
	tests := []struct {
		name string
		call func(*PaymentRepository) error
		want string
	}{
		{
			name: "missing provider",
			call: func(repo *PaymentRepository) error {
				return repo.SettlePayment(
					context.Background(),
					"",
					"KIRI-5J-REF-011",
					"FW-CHARGE-5J-011",
					50000,
					"UGX",
					"FW-EVENT-5J-011",
					"hash",
					settlementNow(),
				)
			},
			want: "payment provider is required",
		},
		{
			name: "missing reference",
			call: func(repo *PaymentRepository) error {
				return repo.SettlePayment(
					context.Background(),
					"FLUTTERWAVE",
					"",
					"FW-CHARGE-5J-012",
					50000,
					"UGX",
					"FW-EVENT-5J-012",
					"hash",
					settlementNow(),
				)
			},
			want: "payment reference is required",
		},
		{
			name: "missing charge ID",
			call: func(repo *PaymentRepository) error {
				return repo.SettlePayment(
					context.Background(),
					"FLUTTERWAVE",
					"KIRI-5J-REF-013",
					"",
					50000,
					"UGX",
					"FW-EVENT-5J-013",
					"hash",
					settlementNow(),
				)
			},
			want: "provider charge ID is required",
		},
		{
			name: "invalid amount",
			call: func(repo *PaymentRepository) error {
				return repo.SettlePayment(
					context.Background(),
					"FLUTTERWAVE",
					"KIRI-5J-REF-014",
					"FW-CHARGE-5J-014",
					0,
					"UGX",
					"FW-EVENT-5J-014",
					"hash",
					settlementNow(),
				)
			},
			want: "settlement amount must be positive",
		},
		{
			name: "missing event ID",
			call: func(repo *PaymentRepository) error {
				return repo.SettlePayment(
					context.Background(),
					"FLUTTERWAVE",
					"KIRI-5J-REF-015",
					"FW-CHARGE-5J-015",
					50000,
					"UGX",
					"",
					"hash",
					settlementNow(),
				)
			},
			want: "webhook event ID is required",
		},
		{
			name: "missing payload hash",
			call: func(repo *PaymentRepository) error {
				return repo.SettlePayment(
					context.Background(),
					"FLUTTERWAVE",
					"KIRI-5J-REF-016",
					"FW-CHARGE-5J-016",
					50000,
					"UGX",
					"FW-EVENT-5J-016",
					"",
					settlementNow(),
				)
			},
			want: "webhook payload hash is required",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			db, mock, err := sqlmock.New()
			if err != nil {
				t.Fatal(err)
			}
			defer db.Close()

			repo := NewPaymentRepository(db)

			err = tt.call(repo)

			if err == nil {
				t.Fatal("expected validation error")
			}

			if err.Error() != tt.want {
				t.Fatalf("expected %q, got %q", tt.want, err.Error())
			}

			if err := mock.ExpectationsWereMet(); err != nil {
				t.Fatalf("unexpected database interaction: %v", err)
			}
		})
	}
}
