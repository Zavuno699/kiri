package repository

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
)

var (
	ErrIdempotencyClaimed  = errors.New("payment idempotency key is already being processed")
	ErrIdempotencyConflict = errors.New("payment idempotency key was already used with a different request")
)

type PaymentIdempotencyClaim struct {
	ID               uuid.UUID
	Provider         string
	IdempotencyKey   string
	RequestHash      string
	PaymentReference string
	Status           string
	PaymentID        *uuid.UUID
	CreatedAt        time.Time
	UpdatedAt        time.Time
	ExpiresAt        time.Time
}

func (r *PaymentRepository) ClaimPaymentIdempotency(
	ctx context.Context,
	provider string,
	idempotencyKey string,
	requestHash string,
	reference string,
	now time.Time,
) (PaymentIdempotencyClaim, error) {
	if provider == "" {
		return PaymentIdempotencyClaim{}, errors.New("payment provider is required")
	}
	if idempotencyKey == "" {
		return PaymentIdempotencyClaim{}, errors.New("idempotency key is required")
	}
	if requestHash == "" {
		return PaymentIdempotencyClaim{}, errors.New("request hash is required")
	}
	if reference == "" {
		return PaymentIdempotencyClaim{}, errors.New("payment reference is required")
	}

	expiresAt := now.Add(2 * time.Minute)

	claim := PaymentIdempotencyClaim{
		ID:               uuid.New(),
		Provider:         provider,
		IdempotencyKey:   idempotencyKey,
		RequestHash:      requestHash,
		PaymentReference: reference,
		Status:           "PROCESSING",
		CreatedAt:        now,
		UpdatedAt:        now,
		ExpiresAt:        expiresAt,
	}

	result, err := r.db.ExecContext(
		ctx,
		`
		INSERT INTO payment_idempotency_claims (
			id,
			provider,
			idempotency_key,
			request_hash,
			payment_reference,
			status,
			created_at,
			updated_at,
			expires_at
		)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
			ON CONFLICT DO NOTHING
		`,
		claim.ID,
		claim.Provider,
		claim.IdempotencyKey,
		claim.RequestHash,
		claim.PaymentReference,
		claim.Status,
		claim.CreatedAt,
		claim.UpdatedAt,
		claim.ExpiresAt,
	)
	if err == nil {
		rows, rowsErr := result.RowsAffected()
		if rowsErr != nil {
			return PaymentIdempotencyClaim{}, fmt.Errorf(
				"check payment idempotency claim ownership: %w",
				rowsErr,
			)
		}
		if rows == 1 {
			return claim, nil
		}
		// rows == 0 means another request owns the unique key.
		// Continue through the existing reclaim/existing-claim resolution.
	} else if !isUniqueViolation(err) {
		return PaymentIdempotencyClaim{}, fmt.Errorf(
			"claim payment idempotency: %w",
			err,
		)
	}

	// An expired PROCESSING claim may be atomically reclaimed.
	result, err = r.db.ExecContext(
		ctx,
		`
		UPDATE payment_idempotency_claims
		SET
			request_hash = $1,
			payment_reference = $2,
			updated_at = $3,
			expires_at = $4
		WHERE provider = $5
		  AND idempotency_key = $6
		  AND status = 'PROCESSING'
		  AND expires_at <= $3
		  AND request_hash = $1
		`,
		requestHash,
		reference,
		now,
		expiresAt,
		provider,
		idempotencyKey,
	)
	if err != nil {
		return PaymentIdempotencyClaim{}, fmt.Errorf(
			"reclaim payment idempotency: %w",
			err,
		)
	}

	if rows, err := result.RowsAffected(); err == nil && rows == 1 {
		claim.ID = uuid.Nil

		var reclaimed PaymentIdempotencyClaim

		err = r.db.QueryRowContext(
			ctx,
			`
			SELECT
				id,
				provider,
				idempotency_key,
				request_hash,
				payment_reference,
				status,
				payment_id,
				created_at,
				updated_at,
				expires_at
			FROM payment_idempotency_claims
			WHERE provider = $1
			  AND idempotency_key = $2
			`,
			provider,
			idempotencyKey,
		).Scan(
			&reclaimed.ID,
			&reclaimed.Provider,
			&reclaimed.IdempotencyKey,
			&reclaimed.RequestHash,
			&reclaimed.PaymentReference,
			&reclaimed.Status,
			&reclaimed.PaymentID,
			&reclaimed.CreatedAt,
			&reclaimed.UpdatedAt,
			&reclaimed.ExpiresAt,
		)
		if err != nil {
			return PaymentIdempotencyClaim{}, fmt.Errorf(
				"read reclaimed payment idempotency claim: %w",
				err,
			)
		}

		return reclaimed, nil
	}

	var existing PaymentIdempotencyClaim

	err = r.db.QueryRowContext(
		ctx,
		`
		SELECT
			id,
			provider,
			idempotency_key,
			request_hash,
			payment_reference,
			status,
			payment_id,
			created_at,
			updated_at,
			expires_at
		FROM payment_idempotency_claims
		WHERE provider = $1
		  AND idempotency_key = $2
		`,
		provider,
		idempotencyKey,
	).Scan(
		&existing.ID,
		&existing.Provider,
		&existing.IdempotencyKey,
		&existing.RequestHash,
		&existing.PaymentReference,
		&existing.Status,
		&existing.PaymentID,
		&existing.CreatedAt,
		&existing.UpdatedAt,
		&existing.ExpiresAt,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return PaymentIdempotencyClaim{}, ErrIdempotencyClaimed
		}
		return PaymentIdempotencyClaim{}, fmt.Errorf(
			"read payment idempotency claim: %w",
			err,
		)
	}

	if existing.RequestHash != requestHash {
		return PaymentIdempotencyClaim{}, ErrIdempotencyConflict
	}

	if existing.Status == "PROCESSING" {
		return PaymentIdempotencyClaim{}, ErrIdempotencyClaimed
	}

	return existing, nil
}

func (r *PaymentRepository) FailPaymentIdempotency(
	ctx context.Context,
	provider string,
	idempotencyKey string,
	now time.Time,
) error {
	if provider == "" {
		return errors.New("payment provider is required")
	}
	if idempotencyKey == "" {
		return errors.New("idempotency key is required")
	}

	result, err := r.db.ExecContext(
		ctx,
		`
		UPDATE payment_idempotency_claims
		SET
			status = 'FAILED',
			updated_at = $1
		WHERE provider = $2
		  AND idempotency_key = $3
		  AND status = 'PROCESSING'
		`,
		now,
		provider,
		idempotencyKey,
	)
	if err != nil {
		return fmt.Errorf("fail payment idempotency: %w", err)
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("check failed payment idempotency: %w", err)
	}

	if rows != 1 {
		return fmt.Errorf(
			"fail payment idempotency: claim not in PROCESSING state",
		)
	}

	return nil
}

func (r *PaymentRepository) CompletePaymentIdempotency(
	ctx context.Context,
	provider string,
	idempotencyKey string,
	paymentID uuid.UUID,
	now time.Time,
) error {
	if provider == "" {
		return errors.New("payment provider is required")
	}
	if idempotencyKey == "" {
		return errors.New("idempotency key is required")
	}
	if paymentID == uuid.Nil {
		return errors.New("payment ID is required")
	}

	result, err := r.db.ExecContext(
		ctx,
		`
		UPDATE payment_idempotency_claims
		SET
			status = 'COMPLETED',
			payment_id = $1,
			updated_at = $2
		WHERE provider = $3
		  AND idempotency_key = $4
		  AND status = 'PROCESSING'
		`,
		paymentID,
		now,
		provider,
		idempotencyKey,
	)
	if err != nil {
		return fmt.Errorf("complete payment idempotency: %w", err)
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("check payment idempotency completion: %w", err)
	}

	if rows != 1 {
		return errors.New("payment idempotency claim could not be completed")
	}

	return nil
}
