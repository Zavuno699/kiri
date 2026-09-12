package persistence

import (
	"context"
	"database/sql"

	"github.com/kirilock/backend/device-service/internal/service"
)

type DeviceRepository struct {
	DB *sql.DB
}

func NewDeviceRepository(
	db *sql.DB,
) *DeviceRepository {
	return &DeviceRepository{
		DB: db,
	}
}

func (r *DeviceRepository) Get(
	ctx context.Context,
	id string,
) (service.DeviceRecord, error) {
	const query = `
		SELECT id, status
		FROM devices
		WHERE id = $1
	`

	var record service.DeviceRecord

	err := r.DB.QueryRowContext(
		ctx,
		query,
		id,
	).Scan(
		&record.ID,
		&record.Status,
	)

	return record, err
}

func (r *DeviceRepository) Save(
	ctx context.Context,
	record service.DeviceRecord,
) error {
	const query = `
		INSERT INTO devices (id, status)
		VALUES ($1, $2)
		ON CONFLICT(id)
		DO UPDATE SET status = excluded.status
	`

	_, err := r.DB.ExecContext(
		ctx,
		query,
		record.ID,
		record.Status,
	)

	return err
}
