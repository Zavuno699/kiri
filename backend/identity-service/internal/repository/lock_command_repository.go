package repository

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/kirilock/backend/identity-service/internal/model"
)

var (
	ErrLockCommandNotFound  = errors.New("lock command not found")
	ErrLockCommandDuplicate = errors.New("lock command with this idempotency key already exists")
)

type LockCommandRepository interface {
	Create(ctx context.Context, command model.LockCommand) error
	GetByID(ctx context.Context, id uuid.UUID) (model.LockCommand, error)
	GetByIdempotencyKey(ctx context.Context, idempotencyKey string) (model.LockCommand, error)
	GetByLockID(ctx context.Context, lockID uuid.UUID) ([]model.LockCommand, error)
	UpdateStatus(ctx context.Context, id uuid.UUID, status model.LockCommandStatus) error
	Update(ctx context.Context, command model.LockCommand) error
}

type DBLockCommandRepository struct {
	db *pgxpool.Pool
}

func NewLockCommandRepository(db *pgxpool.Pool) LockCommandRepository {
	return &DBLockCommandRepository{db: db}
}

func (r *DBLockCommandRepository) Create(ctx context.Context, command model.LockCommand) error {
	query := `
		INSERT INTO lock_commands (
			id, lock_id, operation, status,
			tenant_subject_id, tenancy_id, unit_id, authorization_reason,
			idempotency_key, correlation_id,
			created_at, updated_at, version
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
	`

	_, err := r.db.Exec(ctx, query,
		command.ID, command.LockID, command.Operation, command.Status,
		command.TenantSubjectID, command.TenancyID, command.UnitID, command.AuthorizationReason,
		command.IdempotencyKey, command.CorrelationID,
		command.CreatedAt, command.UpdatedAt, command.Version,
	)

	if err != nil {
		// Check for idempotency key violation (unique constraint)
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) && pgErr.Code == "23505" {
			return ErrLockCommandDuplicate
		}
		return err
	}

	return nil
}

func (r *DBLockCommandRepository) GetByID(ctx context.Context, id uuid.UUID) (model.LockCommand, error) {
	query := `
		SELECT id, lock_id, operation, status,
			tenant_subject_id, tenancy_id, unit_id, authorization_reason,
			idempotency_key, dispatched_at, device_acknowledged_at, executed_at,
			failure_reason, cancelled_by, cancelled_at, correlation_id,
			created_at, updated_at, version
		FROM lock_commands
		WHERE id = $1
	`

	var command model.LockCommand
	err := r.db.QueryRow(ctx, query, id).Scan(
		&command.ID, &command.LockID, &command.Operation, &command.Status,
		&command.TenantSubjectID, &command.TenancyID, &command.UnitID, &command.AuthorizationReason,
		&command.IdempotencyKey, &command.DispatchedAt, &command.DeviceAcknowledgedAt, &command.ExecutedAt,
		&command.FailureReason, &command.CancelledBy, &command.CancelledAt, &command.CorrelationID,
		&command.CreatedAt, &command.UpdatedAt, &command.Version,
	)

	if err == pgx.ErrNoRows {
		return model.LockCommand{}, ErrLockCommandNotFound
	}

	return command, err
}

func (r *DBLockCommandRepository) GetByIdempotencyKey(ctx context.Context, idempotencyKey string) (model.LockCommand, error) {
	query := `
		SELECT id, lock_id, operation, status,
			tenant_subject_id, tenancy_id, unit_id, authorization_reason,
			idempotency_key, dispatched_at, device_acknowledged_at, executed_at,
			failure_reason, cancelled_by, cancelled_at, correlation_id,
			created_at, updated_at, version
		FROM lock_commands
		WHERE idempotency_key = $1
		ORDER BY created_at DESC
		LIMIT 1
	`

	var command model.LockCommand
	err := r.db.QueryRow(ctx, query, idempotencyKey).Scan(
		&command.ID, &command.LockID, &command.Operation, &command.Status,
		&command.TenantSubjectID, &command.TenancyID, &command.UnitID, &command.AuthorizationReason,
		&command.IdempotencyKey, &command.DispatchedAt, &command.DeviceAcknowledgedAt, &command.ExecutedAt,
		&command.FailureReason, &command.CancelledBy, &command.CancelledAt, &command.CorrelationID,
		&command.CreatedAt, &command.UpdatedAt, &command.Version,
	)

	if err == pgx.ErrNoRows {
		return model.LockCommand{}, ErrLockCommandNotFound
	}

	return command, err
}

func (r *DBLockCommandRepository) GetByLockID(ctx context.Context, lockID uuid.UUID) ([]model.LockCommand, error) {
	query := `
		SELECT id, lock_id, operation, status,
			tenant_subject_id, tenancy_id, unit_id, authorization_reason,
			idempotency_key, dispatched_at, device_acknowledged_at, executed_at,
			failure_reason, cancelled_by, cancelled_at, correlation_id,
			created_at, updated_at, version
		FROM lock_commands
		WHERE lock_id = $1
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query, lockID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var commands []model.LockCommand
	for rows.Next() {
		var command model.LockCommand
		err := rows.Scan(
			&command.ID, &command.LockID, &command.Operation, &command.Status,
			&command.TenantSubjectID, &command.TenancyID, &command.UnitID, &command.AuthorizationReason,
			&command.IdempotencyKey, &command.DispatchedAt, &command.DeviceAcknowledgedAt, &command.ExecutedAt,
			&command.FailureReason, &command.CancelledBy, &command.CancelledAt, &command.CorrelationID,
			&command.CreatedAt, &command.UpdatedAt, &command.Version,
		)
		if err != nil {
			return nil, err
		}
		commands = append(commands, command)
	}

	return commands, nil
}

func (r *DBLockCommandRepository) UpdateStatus(ctx context.Context, id uuid.UUID, status model.LockCommandStatus) error {
	query := `
		UPDATE lock_commands
		SET status = $2, updated_at = current_timestamp
		WHERE id = $1
	`

	result, err := r.db.Exec(ctx, query, id, status)
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrLockCommandNotFound
	}

	return nil
}

func (r *DBLockCommandRepository) Update(ctx context.Context, command model.LockCommand) error {
	query := `
		UPDATE lock_commands
		SET status = $2, dispatched_at = $3, device_acknowledged_at = $4, executed_at = $5,
			failure_reason = $6, cancelled_by = $7, cancelled_at = $8,
			updated_at = current_timestamp, version = version + 1
		WHERE id = $1 AND version = $9
	`

	result, err := r.db.Exec(ctx, query,
		command.Status, command.DispatchedAt, command.DeviceAcknowledgedAt, command.ExecutedAt,
		command.FailureReason, command.CancelledBy, command.CancelledAt,
		command.ID, command.Version,
	)

	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrLockCommandNotFound
	}

	return nil
}
