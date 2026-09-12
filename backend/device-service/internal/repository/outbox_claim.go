package repository

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"
)

type DeviceOutboxClaimRepository interface {
	ClaimNext(context.Context, time.Time, time.Duration) (*DeviceOutboxEvent, error)
	MarkPublished(context.Context, uuid.UUID, time.Time) error
	MarkFailed(context.Context, uuid.UUID, time.Time, string, time.Duration) error
}

type SQLDeviceOutboxClaimRepository struct {
	db DB
}

func NewSQLDeviceOutboxClaimRepository(
	db DB,
) *SQLDeviceOutboxClaimRepository {
	return &SQLDeviceOutboxClaimRepository{db: db}
}

func (r *SQLDeviceOutboxClaimRepository) ClaimNext(
	ctx context.Context,
	now time.Time,
	claimDuration time.Duration,
) (*DeviceOutboxEvent, error) {
	if r == nil || r.db == nil {
		return nil, errors.New("database is required")
	}
	if ctx == nil {
		return nil, errors.New("context is required")
	}
	if now.IsZero() {
		return nil, errors.New("claim time is required")
	}
	if claimDuration <= 0 {
		return nil, errors.New("claim duration must be positive")
	}

	txdb, ok := r.db.(TxDB)
	if !ok {
		return nil, errors.New("database does not support transactions")
	}

	tx, err := txdb.Begin(ctx)
	if err != nil {
		return nil, err
	}

	committed := false
	defer func() {
		if !committed {
			_ = tx.Rollback(ctx)
		}
	}()

	claimUntil := now.UTC().Add(claimDuration)

	row := tx.QueryRow(
		ctx,
		`WITH candidate AS (
			SELECT id
			FROM device_event_outbox
			WHERE
				(
					status IN ('PENDING', 'FAILED')
					AND available_at <= $1
				)
				OR (
					status = 'PROCESSING'
					AND locked_at IS NOT NULL
					AND locked_at <= $1 - $2
				)
			ORDER BY created_at, id
			FOR UPDATE SKIP LOCKED
			LIMIT 1
		)
		UPDATE device_event_outbox AS e
		SET
			status = 'PROCESSING',
			attempts = e.attempts + 1,
			locked_at = $1,
			updated_at = $1,
			version = e.version + 1
		FROM candidate
		WHERE e.id = candidate.id
		RETURNING
			e.id,
			e.event_id,
			e.event_type,
			e.event_version,
			e.aggregate_id,
			e.correlation_id,
			COALESCE(e.causation_id, ''),
			e.producer,
			e.payload,
			e.status,
			e.attempts,
			e.available_at,
			e.locked_at,
			e.published_at,
			COALESCE(e.last_error, ''),
			e.created_at,
			e.updated_at,
			e.version`,
		now.UTC(),
		claimDuration,
	)

	var event DeviceOutboxEvent

	err = row.Scan(
		&event.ID,
		&event.EventID,
		&event.EventType,
		&event.EventVersion,
		&event.AggregateID,
		&event.CorrelationID,
		&event.CausationID,
		&event.Producer,
		&event.Payload,
		&event.Status,
		&event.Attempts,
		&event.AvailableAt,
		&event.LockedAt,
		&event.PublishedAt,
		&event.LastError,
		&event.CreatedAt,
		&event.UpdatedAt,
		&event.Version,
	)
	if err != nil {
		if strings.Contains(strings.ToLower(err.Error()), "no rows") {
			_ = tx.Rollback(ctx)
			return nil, nil
		}
		return nil, err
	}

	if err := event.Validate(); err != nil {
		return nil, err
	}

	if err := tx.Commit(ctx); err != nil {
		return nil, err
	}

	committed = true
	_ = claimUntil

	return &event, nil
}

func (r *SQLDeviceOutboxClaimRepository) MarkPublished(
	ctx context.Context,
	id uuid.UUID,
	now time.Time,
) error {
	if r == nil || r.db == nil {
		return errors.New("database is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if id == uuid.Nil {
		return errors.New("outbox ID is required")
	}
	if now.IsZero() {
		return errors.New("publication time is required")
	}

	tag, err := r.db.Exec(
		ctx,
		`UPDATE device_event_outbox
		 SET status = 'PUBLISHED',
		     published_at = $1,
		     locked_at = NULL,
		     last_error = NULL,
		     updated_at = $1,
		     version = version + 1
		 WHERE id = $2
		   AND status = 'PROCESSING'`,
		now.UTC(),
		id,
	)
	if err != nil {
		return err
	}

	if tag.RowsAffected() != 1 {
		return ErrOutboxEventConflict
	}

	return nil
}

func (r *SQLDeviceOutboxClaimRepository) MarkFailed(
	ctx context.Context,
	id uuid.UUID,
	now time.Time,
	lastError string,
	retryAfter time.Duration,
) error {
	if r == nil || r.db == nil {
		return errors.New("database is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if id == uuid.Nil {
		return errors.New("outbox ID is required")
	}
	if now.IsZero() {
		return errors.New("failure time is required")
	}
	if retryAfter <= 0 {
		return errors.New("retry delay must be positive")
	}

	lastError = strings.TrimSpace(lastError)
	if lastError == "" {
		lastError = "outbox publication failed"
	}

	tag, err := r.db.Exec(
		ctx,
		`UPDATE device_event_outbox
		 SET status = 'FAILED',
		     available_at = $1,
		     locked_at = NULL,
		     last_error = $2,
		     updated_at = $3,
		     version = version + 1
		 WHERE id = $4
		   AND status = 'PROCESSING'`,
		now.UTC().Add(retryAfter),
		lastError,
		now.UTC(),
		id,
	)
	if err != nil {
		return err
	}

	if tag.RowsAffected() != 1 {
		return ErrOutboxEventConflict
	}

	return nil
}
