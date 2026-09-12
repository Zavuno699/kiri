package persistence

import (
	"context"
	"database/sql"

	"github.com/kirilock/backend/device-service/internal/service"
)

type EventRepositoryV2 struct {
	DB *sql.DB
}

func NewEventRepositoryV2(
	db *sql.DB,
) *EventRepositoryV2 {
	return &EventRepositoryV2{
		DB: db,
	}
}

func (r *EventRepositoryV2) Append(
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
