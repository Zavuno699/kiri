package repository

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/lock-service/internal/model"
)

type LockRepository interface {
	Create(context.Context, model.Lock) error
	GetByID(context.Context, uuid.UUID) (model.Lock, error)
	GetByLeaseID(context.Context, uuid.UUID) (model.Lock, error)
	UpdateState(
		context.Context,
		uuid.UUID,
		int64,
		model.LockState,
		time.Time,
	) error
}

type SQLLockRepository struct {
	db *sql.DB
}

func NewSQLLockRepository(db *sql.DB) (*SQLLockRepository, error) {
	if db == nil {
		return nil, errors.New("database is required")
	}

	return &SQLLockRepository{db: db}, nil
}

func (r *SQLLockRepository) Create(
	ctx context.Context,
	lock model.Lock,
) error {
	if r == nil || r.db == nil {
		return errors.New("database is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if err := lock.Validate(); err != nil {
		return err
	}

	_, err := r.db.ExecContext(
		ctx,
		`INSERT INTO locks (
			id,
			lease_id,
			device_id,
			state,
			created_at,
			updated_at,
			version
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7)`,
		lock.ID,
		lock.LeaseID,
		lock.DeviceID,
		lock.State,
		lock.CreatedAt.UTC(),
		lock.UpdatedAt.UTC(),
		lock.Version,
	)

	return err
}

func (r *SQLLockRepository) GetByID(
	ctx context.Context,
	id uuid.UUID,
) (model.Lock, error) {
	if r == nil || r.db == nil {
		return model.Lock{}, errors.New("database is required")
	}
	if ctx == nil {
		return model.Lock{}, errors.New("context is required")
	}
	if id == uuid.Nil {
		return model.Lock{}, errors.New("lock ID is required")
	}

	var lock model.Lock

	err := r.db.QueryRowContext(
		ctx,
		`SELECT
			id,
			lease_id,
			device_id,
			state,
			created_at,
			updated_at,
			version
		FROM locks
		WHERE id = $1`,
		id,
	).Scan(
		&lock.ID,
		&lock.LeaseID,
		&lock.DeviceID,
		&lock.State,
		&lock.CreatedAt,
		&lock.UpdatedAt,
		&lock.Version,
	)

	if errors.Is(err, sql.ErrNoRows) {
		return model.Lock{}, ErrLockNotFound
	}
	if err != nil {
		return model.Lock{}, err
	}

	return lock, nil
}

func (r *SQLLockRepository) GetByLeaseID(
	ctx context.Context,
	leaseID uuid.UUID,
) (model.Lock, error) {
	if r == nil || r.db == nil {
		return model.Lock{}, errors.New("database is required")
	}
	if ctx == nil {
		return model.Lock{}, errors.New("context is required")
	}
	if leaseID == uuid.Nil {
		return model.Lock{}, errors.New("lease ID is required")
	}

	var lock model.Lock

	err := r.db.QueryRowContext(
		ctx,
		`SELECT
			id,
			lease_id,
			device_id,
			state,
			created_at,
			updated_at,
			version
		FROM locks
		WHERE lease_id = $1
		ORDER BY created_at DESC
		LIMIT 1`,
		leaseID,
	).Scan(
		&lock.ID,
		&lock.LeaseID,
		&lock.DeviceID,
		&lock.State,
		&lock.CreatedAt,
		&lock.UpdatedAt,
		&lock.Version,
	)

	if errors.Is(err, sql.ErrNoRows) {
		return model.Lock{}, ErrLockNotFound
	}
	if err != nil {
		return model.Lock{}, err
	}

	return lock, nil
}

func (r *SQLLockRepository) UpdateState(
	ctx context.Context,
	id uuid.UUID,
	expectedVersion int64,
	state model.LockState,
	now time.Time,
) error {
	if r == nil || r.db == nil {
		return errors.New("database is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if id == uuid.Nil {
		return errors.New("lock ID is required")
	}
	if expectedVersion < 1 {
		return errors.New("expected version must be positive")
	}
	if now.IsZero() {
		return errors.New("update time is required")
	}

	state = model.NormalizeLockState(state)

	if state != model.LockActive &&
		state != model.LockLocked &&
		state != model.LockFrozen {
		return errors.New("invalid lock state")
	}

	result, err := r.db.ExecContext(
		ctx,
		`UPDATE locks
		SET state = $1,
		    updated_at = $2,
		    version = version + 1
		WHERE id = $3
		  AND version = $4`,
		state,
		now.UTC(),
		id,
		expectedVersion,
	)
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return ErrLockVersionConflict
	}

	return nil
}
