package repository

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgconn"
)

func TestClaimPaymentIdempotencyRejectsActiveProcessingClaim(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	repo := NewPaymentRepository(db)
	now := time.Date(2026, 9, 11, 10, 0, 0, 0, time.UTC)
	expiresAt := now.Add(2 * time.Minute)

	mock.ExpectExec("INSERT INTO payment_idempotency_claims").
		WillReturnError(&pgconn.PgError{
			Code:    "23505",
			Message: "duplicate key value violates unique constraint",
		})

	mock.ExpectExec("UPDATE payment_idempotency_claims").
		WillReturnResult(sqlmock.NewResult(1, 0))

	mock.ExpectQuery("SELECT .*FROM payment_idempotency_claims").
		WillReturnRows(
			sqlmock.NewRows([]string{
				"id",
				"provider",
				"idempotency_key",
				"request_hash",
				"payment_reference",
				"status",
				"payment_id",
				"created_at",
				"updated_at",
				"expires_at",
			}).AddRow(
				uuid.New(),
				"FLUTTERWAVE",
				"idem-active",
				"hash-active",
				"ref-active",
				"PROCESSING",
				nil,
				now.Add(-time.Minute),
				now,
				expiresAt,
			),
		)

	_, err = repo.ClaimPaymentIdempotency(
		context.Background(),
		"FLUTTERWAVE",
		"idem-active",
		"hash-active",
		"ref-active",
		now,
	)
	if !errors.Is(err, ErrIdempotencyClaimed) {
		t.Fatalf("expected ErrIdempotencyClaimed, got %v", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatal(err)
	}
}

func TestClaimPaymentIdempotencyReclaimsExpiredProcessingClaim(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	repo := NewPaymentRepository(db)
	now := time.Date(2026, 9, 11, 10, 0, 0, 0, time.UTC)
	existingID := uuid.New()

	mock.ExpectExec("INSERT INTO payment_idempotency_claims").
		WillReturnError(&pgconn.PgError{
			Code:    "23505",
			Message: "duplicate key value violates unique constraint",
		})

	mock.ExpectExec("UPDATE payment_idempotency_claims").
		WillReturnResult(sqlmock.NewResult(1, 1))

	mock.ExpectQuery("SELECT .*FROM payment_idempotency_claims").
		WillReturnRows(
			sqlmock.NewRows([]string{
				"id",
				"provider",
				"idempotency_key",
				"request_hash",
				"payment_reference",
				"status",
				"payment_id",
				"created_at",
				"updated_at",
				"expires_at",
			}).AddRow(
				existingID,
				"FLUTTERWAVE",
				"idem-expired",
				"hash-expired",
				"ref-expired",
				"PROCESSING",
				nil,
				now.Add(-5*time.Minute),
				now,
				now.Add(2*time.Minute),
			),
		)

	claim, err := repo.ClaimPaymentIdempotency(
		context.Background(),
		"FLUTTERWAVE",
		"idem-expired",
		"hash-expired",
		"ref-expired",
		now,
	)
	if err != nil {
		t.Fatalf("expected expired claim to be reclaimed, got %v", err)
	}

	if claim.ID != existingID {
		t.Fatalf("expected existing claim ID %s, got %s", existingID, claim.ID)
	}

	if claim.Status != "PROCESSING" {
		t.Fatalf("expected PROCESSING status, got %s", claim.Status)
	}

	if !claim.ExpiresAt.After(now) {
		t.Fatalf("expected reclaimed claim expiry after now, got %s", claim.ExpiresAt)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatal(err)
	}
}

func TestClaimPaymentIdempotencyRejectsExpiredClaimWithDifferentRequest(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	repo := NewPaymentRepository(db)
	now := time.Date(2026, 9, 11, 10, 0, 0, 0, time.UTC)

	mock.ExpectExec("INSERT INTO payment_idempotency_claims").
		WillReturnError(&pgconn.PgError{
			Code:    "23505",
			Message: "duplicate key value violates unique constraint",
		})

	mock.ExpectExec("UPDATE payment_idempotency_claims").
		WillReturnResult(sqlmock.NewResult(1, 0))

	mock.ExpectQuery("SELECT .*FROM payment_idempotency_claims").
		WillReturnRows(
			sqlmock.NewRows([]string{
				"id",
				"provider",
				"idempotency_key",
				"request_hash",
				"payment_reference",
				"status",
				"payment_id",
				"created_at",
				"updated_at",
				"expires_at",
			}).AddRow(
				uuid.New(),
				"FLUTTERWAVE",
				"idem-conflict",
				"old-hash",
				"old-ref",
				"PROCESSING",
				nil,
				now.Add(-5*time.Minute),
				now,
				now.Add(-time.Minute),
			),
		)

	_, err = repo.ClaimPaymentIdempotency(
		context.Background(),
		"FLUTTERWAVE",
		"idem-conflict",
		"new-hash",
		"new-ref",
		now,
	)
	if !errors.Is(err, ErrIdempotencyConflict) {
		t.Fatalf("expected ErrIdempotencyConflict, got %v", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatal(err)
	}
}
