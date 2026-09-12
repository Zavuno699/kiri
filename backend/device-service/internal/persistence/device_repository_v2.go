package persistence

import (
	"context"
	"database/sql"

	"github.com/kirilock/backend/device-service/internal/service"
)

type DeviceRepositoryV2 struct {
	DB *sql.DB
}

func NewDeviceRepositoryV2(
	db *sql.DB,
) *DeviceRepositoryV2 {
	return &DeviceRepositoryV2{
		DB: db,
	}
}

func (r *DeviceRepositoryV2) Get(
	ctx context.Context,
	deviceID string,
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
		deviceID,
	).Scan(
		&record.ID,
		&record.Status,
	)

	return record, err
}

func (r *DeviceRepositoryV2) Save(
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
