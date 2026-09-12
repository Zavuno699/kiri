package repository

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5"

	"github.com/kirilock/backend/device-service/internal/model"
)

type ProvisioningRepository interface {
	ProvisionDevice(context.Context, model.Device) error
}

type SQLProvisioningRepository struct {
	db DB
}

type TxDB interface {
	Begin(context.Context) (pgx.Tx, error)
}

func NewSQLProvisioningRepository(db DB, txdb TxDB) (*SQLProvisioningRepository, error) {
	if db == nil {
		return nil, errors.New("database is required")
	}
	if txdb == nil {
		return nil, errors.New("transaction database is required")
	}

	return &SQLProvisioningRepository{
		db: db,
	}, nil
}

func (r *SQLProvisioningRepository) ProvisionDevice(
	ctx context.Context,
	device model.Device,
) error {
	if err := device.Validate(); err != nil {
		return err
	}

	tx, err := r.begin(ctx)
	if err != nil {
		return err
	}

	defer func() {
		_ = tx.Rollback(ctx)
	}()

	_, err = tx.Exec(ctx, `
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
	if err != nil {
		return err
	}

	_, err = tx.Exec(ctx, `
		INSERT INTO device_capabilities (
			device_id,
			remote_lock,
			remote_unlock,
			remote_freeze,
			tamper_detection,
			battery_telemetry,
			ble,
			cellular
		)
		VALUES (
			$1,$2,$3,$4,$5,$6,$7,$8
		)
	`,
		device.ID,
		device.Capabilities.RemoteLock,
		device.Capabilities.RemoteUnlock,
		device.Capabilities.RemoteFreeze,
		device.Capabilities.TamperDetection,
		device.Capabilities.BatteryTelemetry,
		device.Capabilities.BLE,
		device.Capabilities.Cellular,
	)
	if err != nil {
		return err
	}

	return tx.Commit(ctx)
}

func (r *SQLProvisioningRepository) begin(ctx context.Context) (pgx.Tx, error) {
	txdb, ok := r.db.(TxDB)
	if !ok {
		return nil, errors.New("database does not support transactions")
	}

	return txdb.Begin(ctx)
}
