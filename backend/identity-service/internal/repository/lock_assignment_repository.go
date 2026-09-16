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
	ErrLockAssignmentNotFound = errors.New("lock assignment not found")
	ErrLockAlreadyAssigned    = errors.New("lock already assigned to a different unit")
	ErrUnitAlreadyAssigned    = errors.New("unit already has an active lock assignment")
)

type LockAssignmentRepository interface {
	Create(ctx context.Context, assignment model.LockAssignment) error
	GetByID(ctx context.Context, id uuid.UUID) (model.LockAssignment, error)
	GetActiveByLockID(ctx context.Context, lockID uuid.UUID) (*model.LockAssignment, error)
	GetActiveByUnitID(ctx context.Context, unitID uuid.UUID) (*model.LockAssignment, error)
	GetByLockID(ctx context.Context, lockID uuid.UUID) ([]model.LockAssignment, error)
	GetByUnitID(ctx context.Context, unitID uuid.UUID) ([]model.LockAssignment, error)
	UpdateStatus(ctx context.Context, id uuid.UUID, status model.LockAssignmentStatus, deactivatedAt *string) error
}

type DBLockAssignmentRepository struct {
	db *pgxpool.Pool
}

func NewLockAssignmentRepository(db *pgxpool.Pool) LockAssignmentRepository {
	return &DBLockAssignmentRepository{db: db}
}

func (r *DBLockAssignmentRepository) Create(ctx context.Context, assignment model.LockAssignment) error {
	query := `
		INSERT INTO lock_unit_assignments (
			id, lock_id, unit_id, status, assigned_at, deactivated_at, notes,
			created_at, updated_at, version
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
	`

	_, err := r.db.Exec(ctx, query,
		assignment.ID, assignment.LockID, assignment.UnitID, assignment.Status,
		assignment.AssignedAt, assignment.DeactivatedAt, assignment.Notes,
		assignment.CreatedAt, assignment.UpdatedAt, assignment.Version,
	)

	return err
}

func (r *DBLockAssignmentRepository) GetByID(ctx context.Context, id uuid.UUID) (model.LockAssignment, error) {
	query := `
		SELECT id, lock_id, unit_id, status, assigned_at, deactivated_at, notes,
			created_at, updated_at, version
		FROM lock_unit_assignments
		WHERE id = $1
	`

	var assignment model.LockAssignment
	err := r.db.QueryRow(ctx, query, id).Scan(
		&assignment.ID, &assignment.LockID, &assignment.UnitID, &assignment.Status,
		&assignment.AssignedAt, &assignment.DeactivatedAt, &assignment.Notes,
		&assignment.CreatedAt, &assignment.UpdatedAt, &assignment.Version,
	)

	if err == pgx.ErrNoRows {
		return model.LockAssignment{}, ErrLockAssignmentNotFound
	}

	return assignment, err
}

func (r *DBLockAssignmentRepository) GetActiveByLockID(ctx context.Context, lockID uuid.UUID) (*model.LockAssignment, error) {
	query := `
		SELECT id, lock_id, unit_id, status, assigned_at, deactivated_at, notes,
			created_at, updated_at, version
		FROM lock_unit_assignments
		WHERE lock_id = $1 AND status = 'ACTIVE'
		ORDER BY assigned_at DESC
		LIMIT 1
	`

	var assignment model.LockAssignment
	err := r.db.QueryRow(ctx, query, lockID).Scan(
		&assignment.ID, &assignment.LockID, &assignment.UnitID, &assignment.Status,
		&assignment.AssignedAt, &assignment.DeactivatedAt, &assignment.Notes,
		&assignment.CreatedAt, &assignment.UpdatedAt, &assignment.Version,
	)

	if err == pgx.ErrNoRows {
		return nil, nil
	}

	return &assignment, err
}

func (r *DBLockAssignmentRepository) GetActiveByUnitID(ctx context.Context, unitID uuid.UUID) (*model.LockAssignment, error) {
	query := `
		SELECT id, lock_id, unit_id, status, assigned_at, deactivated_at, notes,
			created_at, updated_at, version
		FROM lock_unit_assignments
		WHERE unit_id = $1 AND status = 'ACTIVE'
		ORDER BY assigned_at DESC
		LIMIT 1
	`

	var assignment model.LockAssignment
	err := r.db.QueryRow(ctx, query, unitID).Scan(
		&assignment.ID, &assignment.LockID, &assignment.UnitID, &assignment.Status,
		&assignment.AssignedAt, &assignment.DeactivatedAt, &assignment.Notes,
		&assignment.CreatedAt, &assignment.UpdatedAt, &assignment.Version,
	)

	if err == pgx.ErrNoRows {
		return nil, nil
	}

	return &assignment, err
}

func (r *DBLockAssignmentRepository) GetByLockID(ctx context.Context, lockID uuid.UUID) ([]model.LockAssignment, error) {
	query := `
		SELECT id, lock_id, unit_id, status, assigned_at, deactivated_at, notes,
			created_at, updated_at, version
		FROM lock_unit_assignments
		WHERE lock_id = $1
		ORDER BY assigned_at DESC
	`

	rows, err := r.db.Query(ctx, query, lockID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var assignments []model.LockAssignment
	for rows.Next() {
		var assignment model.LockAssignment
		err := rows.Scan(
			&assignment.ID, &assignment.LockID, &assignment.UnitID, &assignment.Status,
			&assignment.AssignedAt, &assignment.DeactivatedAt, &assignment.Notes,
			&assignment.CreatedAt, &assignment.UpdatedAt, &assignment.Version,
		)
		if err != nil {
			return nil, err
		}
		assignments = append(assignments, assignment)
	}

	return assignments, nil
}

func (r *DBLockAssignmentRepository) GetByUnitID(ctx context.Context, unitID uuid.UUID) ([]model.LockAssignment, error) {
	query := `
		SELECT id, lock_id, unit_id, status, assigned_at, deactivated_at, notes,
			created_at, updated_at, version
		FROM lock_unit_assignments
		WHERE unit_id = $1
		ORDER BY assigned_at DESC
	`

	rows, err := r.db.Query(ctx, query, unitID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var assignments []model.LockAssignment
	for rows.Next() {
		var assignment model.LockAssignment
		err := rows.Scan(
			&assignment.ID, &assignment.LockID, &assignment.UnitID, &assignment.Status,
			&assignment.AssignedAt, &assignment.DeactivatedAt, &assignment.Notes,
			&assignment.CreatedAt, &assignment.UpdatedAt, &assignment.Version,
		)
		if err != nil {
			return nil, err
		}
		assignments = append(assignments, assignment)
	}

	return assignments, nil
}

func (r *DBLockAssignmentRepository) UpdateStatus(ctx context.Context, id uuid.UUID, status model.LockAssignmentStatus, deactivatedAt *string) error {
	query := `
		UPDATE lock_unit_assignments
		SET status = $2, deactivated_at = $3, updated_at = current_timestamp
		WHERE id = $1
	`

	result, err := r.db.Exec(ctx, query, id, status, deactivatedAt)
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrLockAssignmentNotFound
	}

	return nil
}
