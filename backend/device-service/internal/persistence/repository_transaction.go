package persistence

import (
	"context"
	"database/sql"

	"github.com/kirilock/backend/device-service/internal/service"
)

type RepositoryTransaction struct {
	Tx *sql.Tx
}

func NewRepositoryTransaction(
	tx *sql.Tx,
) *RepositoryTransaction {
	return &RepositoryTransaction{
		Tx: tx,
	}
}

func (t *RepositoryTransaction) SaveDevice(
	ctx context.Context,
	record service.DeviceRecord,
) error {
	const query = `
		INSERT INTO devices (id, status)
		VALUES ($1, $2)
		ON CONFLICT(id)
		DO UPDATE SET status = excluded.status
	`

	_, err := t.Tx.ExecContext(
		ctx,
		query,
		record.ID,
		record.Status,
	)

	return err
}

func (t *RepositoryTransaction) AppendEvent(
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

	_, err := t.Tx.ExecContext(
		ctx,
		query,
		message.Topic,
		message.Key,
		message.Payload,
	)

	return err
}

func (t *RepositoryTransaction) Commit() error {
	return t.Tx.Commit()
}

func (t *RepositoryTransaction) Rollback() error {
	return t.Tx.Rollback()
}
