package repository

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/kirilock/backend/device-service/internal/model"
)

type TransactionalHeartbeatRepository interface {
	RecordHeartbeatWithOutbox(
		context.Context,
		model.Device,
		time.Time,
		[]DeviceOutboxEvent,
	) (model.Device, error)
}

type SQLTransactionalHeartbeatRepository struct {
	db DB
}

func NewSQLTransactionalHeartbeatRepository(
	db DB,
) *SQLTransactionalHeartbeatRepository {
	return &SQLTransactionalHeartbeatRepository{db: db}
}

func (r *SQLTransactionalHeartbeatRepository) RecordHeartbeatWithOutbox(
	ctx context.Context,
	device model.Device,
	now time.Time,
	outboxEvents []DeviceOutboxEvent,
) (model.Device, error) {
	if ctx == nil {
		return model.Device{}, errors.New("context is required")
	}
	if device.ID == uuid.Nil {
		return model.Device{}, errors.New("device ID is required")
	}
	if now.IsZero() {
		return model.Device{}, errors.New("processing time is required")
	}
	if err := device.Validate(); err != nil {
		return model.Device{}, err
	}

	txdb, ok := r.db.(TxDB)
	if !ok {
		return model.Device{}, errors.New(
			"database does not support transactions",
		)
	}

	tx, err := txdb.Begin(ctx)
	if err != nil {
		return model.Device{}, err
	}

	committed := false
	defer func() {
		if !committed {
			_ = tx.Rollback(ctx)
		}
	}()

	tag, err := tx.Exec(
		ctx,
		`UPDATE devices
		 SET connectivity_state = $1,
		     last_heartbeat_at = $2,
		     updated_at = $3,
		     version = version + 1
		 WHERE id = $4
		   AND version = $5`,
		device.ConnectivityState,
		device.LastHeartbeatAt,
		now.UTC(),
		device.ID,
		device.Version,
	)
	if err != nil {
		return model.Device{}, err
	}

	if tag.RowsAffected() != 1 {
		return model.Device{}, ErrDeviceVersionConflict
	}

	for _, event := range outboxEvents {
		if err := event.Validate(); err != nil {
			return model.Device{}, err
		}

		_, err := tx.Exec(
			ctx,
			`INSERT INTO device_event_outbox (
				id,
				event_id,
				event_type,
				event_version,
				aggregate_id,
				correlation_id,
				causation_id,
				producer,
				payload,
				status,
				attempts,
				available_at,
				locked_at,
				published_at,
				last_error,
				created_at,
				updated_at,
				version
			)
			VALUES (
				$1, $2, $3, $4, $5, $6, $7, $8, $9,
				$10, $11, $12, $13, $14, $15, $16, $17, $18
			)
			ON CONFLICT (event_id) DO NOTHING`,
			event.ID,
			event.EventID,
			event.EventType,
			event.EventVersion,
			event.AggregateID,
			event.CorrelationID,
			nullIfEmpty(event.CausationID),
			event.Producer,
			event.Payload,
			event.Status,
			event.Attempts,
			event.AvailableAt,
			event.LockedAt,
			event.PublishedAt,
			nullIfEmpty(event.LastError),
			event.CreatedAt,
			event.UpdatedAt,
			event.Version,
		)
		if err != nil {
			return model.Device{}, err
		}
	}

	device.UpdatedAt = now.UTC()
	device.Version++

	if err := device.Validate(); err != nil {
		return model.Device{}, err
	}

	if err := tx.Commit(ctx); err != nil {
		return model.Device{}, err
	}

	committed = true
	return device, nil
}
