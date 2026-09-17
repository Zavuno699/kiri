package repository

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/kirilock/backend/identity-service/internal/model"
)

var (
	ErrLockNotFound = errors.New("lock not found")
)

type LockRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (model.Lock, error)
}

type DBLockRepository struct {
	db *pgxpool.Pool
}

func NewLockRepository(db *pgxpool.Pool) LockRepository {
	return &DBLockRepository{db: db}
}

func (r *DBLockRepository) GetByID(ctx context.Context, id uuid.UUID) (model.Lock, error) {
	query := `
		SELECT id, lease_id, device_id, state, created_at, updated_at, version
		FROM locks
		WHERE id = $1
	`

	var lock model.Lock
	err := r.db.QueryRow(ctx, query, id).Scan(
		&lock.ID, &lock.LeaseID, &lock.DeviceID, &lock.State,
		&lock.CreatedAt, &lock.UpdatedAt, &lock.Version,
	)

	if err == pgx.ErrNoRows {
		return model.Lock{}, ErrLockNotFound
	}

	return lock, err
}
