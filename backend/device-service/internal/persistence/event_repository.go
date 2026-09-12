package persistence

import (
	"context"
	"database/sql"

	"github.com/kirilock/backend/device-service/internal/service"
)

type EventRepository struct {
	DB *sql.DB
}

func NewEventRepository(
	db *sql.DB,
) *EventRepository {
	return &EventRepository{
		DB: db,
	}
}

func (r *EventRepository) Append(
	ctx context.Context,
	message service.DeviceServiceMessage,
) error {
	const query = `
		INSERT INTO device_events (
			topic,
			message_key,
			payload
		)
		VALUES ($1, $2, $3)
	`

	_, err := r.DB.ExecContext(
		ctx,
		query,
		message.Topic,
		message.Key,
		message.Payload,
	)

	return err
}
