package repository

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/kirilock/backend/billing-service/internal/model"
)

var (
	ErrPaymentNotFound       = errors.New("payment not found")
	ErrPaymentAlreadySettled = errors.New("payment already settled")
	ErrPaymentMismatch       = errors.New("payment settlement mismatch")
	ErrWebhookAlreadySeen    = errors.New("webhook already processed")
)

type PaymentRepository struct {
	db *sql.DB
}

func NewPaymentRepository(db *sql.DB) *PaymentRepository {
	return &PaymentRepository{
		db: db,
	}
}

func (r *PaymentRepository) CreatePending(
	ctx context.Context,
	payment model.Payment,
) error {
	if payment.ID == uuid.Nil {
		return errors.New("payment ID is required")
	}

	if payment.TenantID == uuid.Nil {
		return errors.New("tenant ID is required")
	}

	if payment.Reference == "" {
		return errors.New("payment reference is required")
	}

	if payment.Provider == "" {
		return errors.New("payment provider is required")
	}

	if payment.AmountUGX <= 0 {
		return errors.New("payment amount must be positive")
	}

	if payment.Currency != "UGX" {
		return errors.New("payment currency must be UGX")
	}

	_, err := r.db.ExecContext(
		ctx,
		`
		INSERT INTO payments (
			
                        id,
                        tenant_id,
                        reference,
                        provider,
                        provider_charge_id,
                        amount_ugx,
                        currency,
                        status,
                        idempotency_key,
                        request_hash,
                        correlation_id,
                        created_at,
                        updated_at,
                        version
                )
		VALUES (
			
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        $7,
                        $8,
                        $9,
                        $10,
                        $11,
                        $12,
                        $13,
                        $14
                )
		`,
		payment.ID,
		payment.TenantID,
		payment.Reference,
		payment.Provider,
		payment.ProviderChargeID,
		payment.AmountUGX,
		payment.Currency,
		payment.Status,
		payment.IdempotencyKey,
		payment.RequestHash,
		payment.CorrelationID,
		payment.CreatedAt,
		payment.UpdatedAt,
		payment.Version,
	)

	if err != nil {
		return fmt.Errorf("create pending payment: %w", err)
	}

	return nil
}

func (r *PaymentRepository) GetByReference(
	ctx context.Context,
	reference string,
) (model.Payment, error) {
	if reference == "" {
		return model.Payment{}, errors.New("payment reference is required")
	}

	return scanPayment(
		r.db.QueryRowContext(
			ctx,
			paymentSelectSQL+`
			WHERE reference = $1
			`,
			reference,
		),
	)
}

func (r *PaymentRepository) GetByIdempotencyKey(
	ctx context.Context,
	provider string,
	idempotencyKey string,
) (model.Payment, error) {
	if provider == "" {
		return model.Payment{}, errors.New("payment provider is required")
	}

	if idempotencyKey == "" {
		return model.Payment{}, errors.New("idempotency key is required")
	}

	return scanPayment(
		r.db.QueryRowContext(
			ctx,
			paymentSelectSQL+`
			WHERE provider = $1
			  AND idempotency_key = $2
			`,
			provider,
			idempotencyKey,
		),
	)
}

func (r *PaymentRepository) FailPayment(
	ctx context.Context,
	reference string,
	providerChargeID string,
	now time.Time,
) (model.Payment, error) {
	if reference == "" {
		return model.Payment{}, errors.New("payment reference is required")
	}

	var payment model.Payment
	var currentStatus model.PaymentStatus

	err := r.db.QueryRowContext(
		ctx,
		`
		SELECT
			id,
			tenant_id,
			reference,
			provider,
			provider_charge_id,
			amount_ugx,
			currency,
			status,
			idempotency_key,
			request_hash,
			correlation_id,
			created_at,
			updated_at,
			settled_at,
			version
		FROM payments
		WHERE reference = $1
		`,
		reference,
	).Scan(
		&payment.ID,
		&payment.TenantID,
		&payment.Reference,
		&payment.Provider,
		&payment.ProviderChargeID,
		&payment.AmountUGX,
		&payment.Currency,
		&currentStatus,
		&payment.IdempotencyKey,
		&payment.RequestHash,
		&payment.CorrelationID,
		&payment.CreatedAt,
		&payment.UpdatedAt,
		&payment.SettledAt,
		&payment.Version,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return model.Payment{}, ErrPaymentNotFound
		}
		return model.Payment{}, fmt.Errorf("read payment for failure: %w", err)
	}

	if currentStatus == model.PaymentFailed {
		return payment, nil
	}

	if currentStatus == model.PaymentSettled {
		return model.Payment{}, ErrPaymentAlreadySettled
	}

	if providerChargeID != "" {
		payment.ProviderChargeID = providerChargeID
	}

	payment.Status = model.PaymentFailed
	payment.UpdatedAt = now
	payment.Version++

	_, err = r.db.ExecContext(
		ctx,
		`
		UPDATE payments
		SET
			provider_charge_id = $1,
			status = $2,
			updated_at = $3,
			version = $4
		WHERE reference = $5
		`,
		payment.ProviderChargeID,
		payment.Status,
		payment.UpdatedAt,
		payment.Version,
		payment.Reference,
	)
	if err != nil {
		return model.Payment{}, fmt.Errorf("fail payment: %w", err)
	}

	return payment, nil
}

func (r *PaymentRepository) ListPendingPayments(
	ctx context.Context,
	limit int,
) ([]model.Payment, error) {
	if limit <= 0 {
		return nil, errors.New("pending payment limit must be positive")
	}

	if limit > 1000 {
		limit = 1000
	}

	rows, err := r.db.QueryContext(
		ctx,
		`
		SELECT
			id,
			tenant_id,
			reference,
			provider,
			provider_charge_id,
			amount_ugx,
			currency,
			status,
			idempotency_key,
			request_hash,
			correlation_id,
			created_at,
			updated_at,
			settled_at,
			version
		FROM payments
		WHERE status = $1
		ORDER BY created_at ASC
		LIMIT $2
		`,
		model.PaymentPending,
		limit,
	)
	if err != nil {
		return nil, fmt.Errorf("list pending payments: %w", err)
	}
	defer rows.Close()

	payments := make([]model.Payment, 0, limit)

	for rows.Next() {
		var payment model.Payment

		if err := rows.Scan(
			&payment.ID,
			&payment.TenantID,
			&payment.Reference,
			&payment.Provider,
			&payment.ProviderChargeID,
			&payment.AmountUGX,
			&payment.Currency,
			&payment.Status,
			&payment.IdempotencyKey,
			&payment.RequestHash,
			&payment.CorrelationID,
			&payment.CreatedAt,
			&payment.UpdatedAt,
			&payment.SettledAt,
			&payment.Version,
		); err != nil {
			return nil, fmt.Errorf("scan pending payment: %w", err)
		}

		payments = append(payments, payment)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate pending payments: %w", err)
	}

	return payments, nil
}

func (r *PaymentRepository) SettlePaymentFromReconciliation(
	ctx context.Context,
	provider string,
	reference string,
	providerChargeID string,
	amountUGX int64,
	currency string,
	now time.Time,
) (model.Payment, error) {
	if r == nil || r.db == nil {
		return model.Payment{}, errors.New("payment repository is required")
	}
	if ctx == nil {
		return model.Payment{}, errors.New("context is required")
	}
	if provider == "" {
		return model.Payment{}, errors.New("payment provider is required")
	}
	if reference == "" {
		return model.Payment{}, errors.New("payment reference is required")
	}
	if providerChargeID == "" {
		return model.Payment{}, errors.New("provider charge ID is required")
	}
	if amountUGX <= 0 {
		return model.Payment{}, errors.New("settlement amount must be positive")
	}
	if currency == "" {
		return model.Payment{}, errors.New("settlement currency is required")
	}

	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return model.Payment{}, fmt.Errorf(
			"begin reconciliation settlement: %w",
			err,
		)
	}
	defer func() {
		_ = tx.Rollback()
	}()

	row := tx.QueryRowContext(
		ctx,
		`SELECT `+paymentSelectSQL+`
		 FROM payments
		 WHERE provider = $1
		   AND reference = $2
		 FOR UPDATE`,
		provider,
		reference,
	)

	payment, err := scanPayment(row)
	if err != nil {
		return model.Payment{}, err
	}

	if payment.AmountUGX != amountUGX {
		return model.Payment{}, errors.New(
			"settlement amount mismatch during reconciliation",
		)
	}

	if payment.Currency != currency {
		return model.Payment{}, errors.New(
			"settlement currency mismatch during reconciliation",
		)
	}

	if payment.Status == model.PaymentSettled {
		if payment.ProviderChargeID != providerChargeID {
			return model.Payment{}, errors.New(
				"settled provider charge mismatch during reconciliation",
			)
		}

		if err := tx.Commit(); err != nil {
			return model.Payment{}, fmt.Errorf(
				"commit already-settled reconciliation: %w",
				err,
			)
		}

		return payment, nil
	}

	if payment.Status == model.PaymentFailed ||
		payment.Status == model.PaymentCancelled {
		return model.Payment{}, fmt.Errorf(
			"payment %q is already terminal with status %q",
			reference,
			payment.Status,
		)
	}

	_, err = tx.ExecContext(
		ctx,
		`UPDATE payments
		 SET provider_charge_id = $1,
		     status = $2,
		     settled_at = $3,
		     updated_at = $3,
		     version = version + 1
		 WHERE id = $4`,
		providerChargeID,
		model.PaymentSettled,
		now.UTC(),
		payment.ID,
	)
	if err != nil {
		return model.Payment{}, fmt.Errorf(
			"update reconciled payment: %w",
			err,
		)
	}

	payment, err = scanPayment(
		tx.QueryRowContext(
			ctx,
			`SELECT `+paymentSelectSQL+`
			 FROM payments
			 WHERE id = $1`,
			payment.ID,
		),
	)
	if err != nil {
		return model.Payment{}, err
	}

	if err := tx.Commit(); err != nil {
		return model.Payment{}, fmt.Errorf(
			"commit reconciliation settlement: %w",
			err,
		)
	}

	return payment, nil
}

func (r *PaymentRepository) SettlePayment(
	ctx context.Context,
	provider string,
	reference string,
	providerChargeID string,
	amountUGX int64,
	currency string,
	webhookEventID string,
	payloadHash string,
	now time.Time,
) error {
	if provider == "" {
		return errors.New("payment provider is required")
	}

	if reference == "" {
		return errors.New("payment reference is required")
	}

	if providerChargeID == "" {
		return errors.New("provider charge ID is required")
	}

	if amountUGX <= 0 {
		return errors.New("settlement amount must be positive")
	}

	if currency != "UGX" {
		return errors.New("settlement currency must be UGX")
	}

	if webhookEventID == "" {
		return errors.New("webhook event ID is required")
	}

	if payloadHash == "" {
		return errors.New("webhook payload hash is required")
	}

	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("begin settlement transaction: %w", err)
	}

	committed := false

	defer func() {
		if !committed {
			_ = tx.Rollback()
		}
	}()

	var (
		paymentID        uuid.UUID
		paymentTenantID  uuid.UUID
		expectedProvider string
		expectedRef      string
		expectedChargeID sql.NullString
		expectedAmount   int64
		expectedCurrency string
		currentStatus    model.PaymentStatus
		currentVersion   int64
	)

	err = tx.QueryRowContext(
		ctx,
		`
		SELECT
			id,
			tenant_id,
			provider,
			reference,
			provider_charge_id,
			amount_ugx,
			currency,
			status,
			version
		FROM payments
		WHERE reference = $1
		FOR UPDATE
		`,
		reference,
	).Scan(
		&paymentID,
		&paymentTenantID,
		&expectedProvider,
		&expectedRef,
		&expectedChargeID,
		&expectedAmount,
		&expectedCurrency,
		&currentStatus,
		&currentVersion,
	)

	if errors.Is(err, sql.ErrNoRows) {
		return ErrPaymentNotFound
	}

	if err != nil {
		return fmt.Errorf("lock payment row: %w", err)
	}

	if expectedProvider != provider ||
		expectedRef != reference ||
		expectedAmount != amountUGX ||
		expectedCurrency != currency {
		return ErrPaymentMismatch
	}

	if currentStatus == model.PaymentSettled {
		if expectedChargeID.Valid &&
			expectedChargeID.String == providerChargeID {
			return ErrPaymentAlreadySettled
		}

		return ErrPaymentMismatch
	}

	if expectedChargeID.Valid &&
		expectedChargeID.String != providerChargeID {
		return ErrPaymentMismatch
	}

	_, err = tx.ExecContext(
		ctx,
		`
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
		`,
		uuid.New(),
		provider,
		webhookEventID,
		paymentID,
		providerChargeID,
		payloadHash,
		now,
		"PROCESSED",
	)
	if err != nil {
		if isUniqueViolation(err) {
			return ErrWebhookAlreadySeen
		}

		return fmt.Errorf("record webhook receipt: %w", err)
	}

	result, err := tx.ExecContext(
		ctx,
		`
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
		`,
		providerChargeID,
		model.PaymentSettled,
		now,
		paymentID,
		currentVersion,
		model.PaymentSettled,
	)

	if err != nil {
		return fmt.Errorf("settle payment: %w", err)
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("read settlement result: %w", err)
	}

	if rows != 1 {
		return ErrPaymentMismatch
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("commit settlement transaction: %w", err)
	}

	committed = true

	_ = paymentTenantID

	return nil
}

const paymentSelectSQL = `
SELECT
	id,
	tenant_id,
	reference,
	provider,
	provider_charge_id,
	amount_ugx,
	currency,
	status,
	idempotency_key,
	request_hash,
	correlation_id,
	created_at,
	updated_at,
	settled_at,
	version
FROM payments
`

type rowScanner interface {
	Scan(dest ...any) error
}

func scanPayment(row rowScanner) (model.Payment, error) {
	var payment model.Payment

	err := row.Scan(
		&payment.ID,
		&payment.TenantID,
		&payment.Reference,
		&payment.Provider,
		&payment.ProviderChargeID,
		&payment.AmountUGX,
		&payment.Currency,
		&payment.Status,
		&payment.IdempotencyKey,
		&payment.RequestHash,
		&payment.CorrelationID,
		&payment.CreatedAt,
		&payment.UpdatedAt,
		&payment.SettledAt,
		&payment.Version,
	)

	if errors.Is(err, sql.ErrNoRows) {
		return model.Payment{}, ErrPaymentNotFound
	}

	if err != nil {
		return model.Payment{}, fmt.Errorf("scan payment: %w", err)
	}

	return payment, nil
}

func isUniqueViolation(err error) bool {
	// The exact Cockroach/PostgreSQL SQLSTATE is 23505.
	type sqlStater interface {
		SQLState() string
	}

	var state sqlStater
	if errors.As(err, &state) {
		return state.SQLState() == "23505"
	}

	return false
}
