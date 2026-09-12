package kafka

import (
	"context"
	"database/sql"
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"
)

type SQLEventProcessingRepository struct {
	db *sql.DB
}

func NewSQLEventProcessingRepository(db *sql.DB) (*SQLEventProcessingRepository, error) {
	if db == nil {
		return nil, errors.New("database is required")
	}

	return &SQLEventProcessingRepository{db: db}, nil
}

func (r *SQLEventProcessingRepository) Claim(
	ctx context.Context,
	record EventProcessingRecord,
) (bool, error) {
	if r == nil || r.db == nil {
		return false, errors.New("database is required")
	}
	if ctx == nil {
		return false, errors.New("context is required")
	}
	if err := record.Validate(); err != nil {
		return false, err
	}
	if record.Status != EventProcessingStarted {
		return false, errors.New("event claim must start in PROCESSING status")
	}

	_, err := r.db.ExecContext(
		ctx,
		`INSERT INTO event_processing (
			consumer_name,
			event_id,
			event_type,
			status,
			correlation_id,
			occurred_at,
			started_at,
			version
		)
		VALUES ($1, $2, $3, 'PROCESSING', $4, $5, $6, $7)
		ON CONFLICT (consumer_name, event_id) DO NOTHING`,
		strings.TrimSpace(record.ConsumerName),
		record.EventID,
		record.EventType,
		record.CorrelationID,
		record.OccurredAt.UTC(),
		record.StartedAt.UTC(),
		record.Version,
	)
	if err != nil {
		return false, err
	}

	var claimed bool

	err = r.db.QueryRowContext(
		ctx,
		`SELECT status = 'PROCESSING' AND started_at = $1
		 FROM event_processing
		 WHERE consumer_name = $2
		   AND event_id = $3`,
		record.StartedAt.UTC(),
		strings.TrimSpace(record.ConsumerName),
		record.EventID,
	).Scan(&claimed)
	if err != nil {
		return false, err
	}

	return claimed, nil
}

func (r *SQLEventProcessingRepository) Complete(
	ctx context.Context,
	consumerName string,
	eventID uuid.UUID,
	completedAt time.Time,
) error {
	if r == nil || r.db == nil {
		return errors.New("database is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if strings.TrimSpace(consumerName) == "" {
		return errors.New("consumer name is required")
	}
	if eventID == uuid.Nil {
		return errors.New("event ID is required")
	}
	if completedAt.IsZero() {
		return errors.New("completed_at is required")
	}

	result, err := r.db.ExecContext(
		ctx,
		`UPDATE event_processing
		 SET status = 'COMPLETED',
		     completed_at = $1,
		     version = version + 1
		 WHERE consumer_name = $2
		   AND event_id = $3
		   AND status = 'PROCESSING'`,
		completedAt.UTC(),
		strings.TrimSpace(consumerName),
		eventID,
	)
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return errors.New("event processing record was not found or already completed")
	}

	return nil
}

func (r *SQLEventProcessingRepository) Release(
	ctx context.Context,
	consumerName string,
	eventID uuid.UUID,
) error {
	if r == nil || r.db == nil {
		return errors.New("database is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if strings.TrimSpace(consumerName) == "" {
		return errors.New("consumer name is required")
	}
	if eventID == uuid.Nil {
		return errors.New("event ID is required")
	}

	result, err := r.db.ExecContext(
		ctx,
		`DELETE FROM event_processing
		 WHERE consumer_name = $1
		   AND event_id = $2
		   AND status = 'PROCESSING'`,
		strings.TrimSpace(consumerName),
		eventID,
	)
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rows == 0 {
		return errors.New(
			"event processing record was not found or already completed",
		)
	}

	return nil
}
