package repository

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"

	"github.com/kirilock/backend/device-service/internal/model"
)

type DeviceRepository interface {
	Create(context.Context, model.Device) error
	GetByID(context.Context, uuid.UUID) (model.Device, error)
	GetBySerialNumber(context.Context, string) (model.Device, error)
	UpdateConnectivity(context.Context, uuid.UUID, model.ConnectivityState, *time.Time, int64, time.Time) error
}

type SQLDeviceRepository struct {
	db DB
}

type DB interface {
	Exec(context.Context, string, ...any) (pgconn.CommandTag, error)
	QueryRow(context.Context, string, ...any) pgx.Row
}

func NewSQLDeviceRepository(db DB) (*SQLDeviceRepository, error) {
	if db == nil {
		return nil, errors.New("database is required")
	}

	return &SQLDeviceRepository{db: db}, nil
}

func (r *SQLDeviceRepository) Create(
	ctx context.Context,
	device model.Device,
) error {
	if err := device.Validate(); err != nil {
		return err
	}

	_, err := r.db.Exec(ctx, `
		INSERT INTO devices (
			id,
			device_type,
			serial_number,
			model,
			firmware_version,
			lifecycle_state,
			connectivity_state,
			gateway_id,
			last_heartbeat_at,
			created_at,
			updated_at,
			version
		)
		VALUES (
			$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
		)
	`,
		device.ID,
		device.DeviceType,
		device.SerialNumber,
		device.Model,
		device.FirmwareVersion,
		device.LifecycleState,
		device.ConnectivityState,
		device.GatewayID,
		device.LastHeartbeatAt,
		device.CreatedAt,
		device.UpdatedAt,
		device.Version,
	)

	return err
}

func (r *SQLDeviceRepository) GetByID(
	ctx context.Context,
	id uuid.UUID,
) (model.Device, error) {
	if id == uuid.Nil {
		return model.Device{}, ErrDeviceNotFound
	}

	var d model.Device

	err := r.db.QueryRow(ctx, `
		SELECT
			d.id,
			d.device_type,
			d.serial_number,
			d.model,
			d.firmware_version,
			d.lifecycle_state,
			d.connectivity_state,
			d.gateway_id,
			d.last_heartbeat_at,
			d.created_at,
			d.updated_at,
			d.version,
			c.remote_lock,
			c.remote_unlock,
			c.remote_freeze,
			c.tamper_detection,
			c.battery_telemetry,
			c.ble,
			c.cellular
		FROM devices d
		JOIN device_capabilities c
			ON c.device_id = d.id
		WHERE d.id = $1
	`, id).Scan(
		&d.ID,
		&d.DeviceType,
		&d.SerialNumber,
		&d.Model,
		&d.FirmwareVersion,
		&d.LifecycleState,
		&d.ConnectivityState,
		&d.GatewayID,
		&d.LastHeartbeatAt,
		&d.CreatedAt,
		&d.UpdatedAt,
		&d.Version,
		&d.Capabilities.RemoteLock,
		&d.Capabilities.RemoteUnlock,
		&d.Capabilities.RemoteFreeze,
		&d.Capabilities.TamperDetection,
		&d.Capabilities.BatteryTelemetry,
		&d.Capabilities.BLE,
		&d.Capabilities.Cellular,
	)

	if errors.Is(err, pgx.ErrNoRows) {
		return model.Device{}, ErrDeviceNotFound
	}
	if err != nil {
		return model.Device{}, err
	}

	if err := d.Validate(); err != nil {
		return model.Device{}, err
	}

	return d, nil
}

func (r *SQLDeviceRepository) GetBySerialNumber(
	ctx context.Context,
	serialNumber string,
) (model.Device, error) {
	if serialNumber == "" {
		return model.Device{}, ErrDeviceNotFound
	}

	var d model.Device

	err := r.db.QueryRow(ctx, `
		SELECT
			d.id,
			d.device_type,
			d.serial_number,
			d.model,
			d.firmware_version,
			d.lifecycle_state,
			d.connectivity_state,
			d.gateway_id,
			d.last_heartbeat_at,
			d.created_at,
			d.updated_at,
			d.version,
			c.remote_lock,
			c.remote_unlock,
			c.remote_freeze,
			c.tamper_detection,
			c.battery_telemetry,
			c.ble,
			c.cellular
		FROM devices d
		JOIN device_capabilities c
			ON c.device_id = d.id
		WHERE d.serial_number = $1
	`, serialNumber).Scan(
		&d.ID,
		&d.DeviceType,
		&d.SerialNumber,
		&d.Model,
		&d.FirmwareVersion,
		&d.LifecycleState,
		&d.ConnectivityState,
		&d.GatewayID,
		&d.LastHeartbeatAt,
		&d.CreatedAt,
		&d.UpdatedAt,
		&d.Version,
		&d.Capabilities.RemoteLock,
		&d.Capabilities.RemoteUnlock,
		&d.Capabilities.RemoteFreeze,
		&d.Capabilities.TamperDetection,
		&d.Capabilities.BatteryTelemetry,
		&d.Capabilities.BLE,
		&d.Capabilities.Cellular,
	)

	if errors.Is(err, pgx.ErrNoRows) {
		return model.Device{}, ErrDeviceNotFound
	}
	if err != nil {
		return model.Device{}, err
	}

	if err := d.Validate(); err != nil {
		return model.Device{}, err
	}

	return d, nil
}

func (r *SQLDeviceRepository) UpdateConnectivity(
	ctx context.Context,
	id uuid.UUID,
	state model.ConnectivityState,
	heartbeatAt *time.Time,
	expectedVersion int64,
	now time.Time,
) error {
	if id == uuid.Nil {
		return ErrDeviceNotFound
	}
	if err := state.Validate(); err != nil {
		return err
	}
	if expectedVersion < 1 {
		return ErrDeviceVersionConflict
	}
	if now.IsZero() {
		return errors.New("update time is required")
	}

	result, err := r.db.Exec(ctx, `
		UPDATE devices
		SET
			connectivity_state = $1,
			last_heartbeat_at = $2,
			updated_at = $3,
			version = version + 1
		WHERE id = $4
		  AND version = $5
	`,
		state,
		heartbeatAt,
		now,
		id,
		expectedVersion,
	)
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrDeviceVersionConflict
	}

	return nil
}
