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
	ErrUnitNotFound = errors.New("unit not found")
)

type UnitRepository interface {
	Create(ctx context.Context, unit model.Unit) error
	GetByID(ctx context.Context, id uuid.UUID) (model.Unit, error)
	GetByPropertyID(ctx context.Context, propertyID uuid.UUID) ([]model.Unit, error)
	GetAvailableByPropertyID(ctx context.Context, propertyID uuid.UUID) ([]model.Unit, error)
	Update(ctx context.Context, unit model.Unit) error
	UpdateLifecycle(ctx context.Context, id uuid.UUID, lifecycle model.UnitLifecycle) error
	// Transactional method
	UpdateLifecycleTx(pgx.Tx, uuid.UUID, model.UnitLifecycle) error
}

type DBUnitRepository struct {
	db *pgxpool.Pool
}

func NewUnitRepository(db *pgxpool.Pool) UnitRepository {
	return &DBUnitRepository{db: db}
}

func (r *DBUnitRepository) Create(ctx context.Context, unit model.Unit) error {
	query := `
		INSERT INTO units (
			id, property_id, unit_number, unit_type, floor_number,
			square_feet, bedrooms, bathrooms, lifecycle,
			description, amenities,
			created_at, updated_at, version
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
	`

	_, err := r.db.Exec(ctx, query,
		unit.ID, unit.PropertyID, unit.UnitNumber, unit.UnitType, unit.FloorNumber,
		unit.SquareFeet, unit.Bedrooms, unit.Bathrooms, unit.Lifecycle,
		unit.Description, unit.Amenities,
		unit.CreatedAt, unit.UpdatedAt, unit.Version,
	)

	return err
}

func (r *DBUnitRepository) GetByID(ctx context.Context, id uuid.UUID) (model.Unit, error) {
	query := `
		SELECT id, property_id, unit_number, unit_type, floor_number,
			square_feet, bedrooms, bathrooms, lifecycle,
			description, amenities,
			created_at, updated_at, version
		FROM units
		WHERE id = $1
	`

	var unit model.Unit
	err := r.db.QueryRow(ctx, query, id).Scan(
		&unit.ID, &unit.PropertyID, &unit.UnitNumber, &unit.UnitType, &unit.FloorNumber,
		&unit.SquareFeet, &unit.Bedrooms, &unit.Bathrooms, &unit.Lifecycle,
		&unit.Description, &unit.Amenities,
		&unit.CreatedAt, &unit.UpdatedAt, &unit.Version,
	)

	if err == pgx.ErrNoRows {
		return model.Unit{}, ErrUnitNotFound
	}

	return unit, err
}

func (r *DBUnitRepository) GetByPropertyID(ctx context.Context, propertyID uuid.UUID) ([]model.Unit, error) {
	query := `
		SELECT id, property_id, unit_number, unit_type, floor_number,
			square_feet, bedrooms, bathrooms, lifecycle,
			description, amenities,
			created_at, updated_at, version
		FROM units
		WHERE property_id = $1
		ORDER BY unit_number
	`

	rows, err := r.db.Query(ctx, query, propertyID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var units []model.Unit
	for rows.Next() {
		var unit model.Unit
		err := rows.Scan(
			&unit.ID, &unit.PropertyID, &unit.UnitNumber, &unit.UnitType, &unit.FloorNumber,
			&unit.SquareFeet, &unit.Bedrooms, &unit.Bathrooms, &unit.Lifecycle,
			&unit.Description, &unit.Amenities,
			&unit.CreatedAt, &unit.UpdatedAt, &unit.Version,
		)
		if err != nil {
			return nil, err
		}
		units = append(units, unit)
	}

	return units, nil
}

func (r *DBUnitRepository) GetAvailableByPropertyID(ctx context.Context, propertyID uuid.UUID) ([]model.Unit, error) {
	query := `
		SELECT id, property_id, unit_number, unit_type, floor_number,
			square_feet, bedrooms, bathrooms, lifecycle,
			description, amenities,
			created_at, updated_at, version
		FROM units
		WHERE property_id = $1 AND lifecycle = 'AVAILABLE'
		ORDER BY unit_number
	`

	rows, err := r.db.Query(ctx, query, propertyID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var units []model.Unit
	for rows.Next() {
		var unit model.Unit
		err := rows.Scan(
			&unit.ID, &unit.PropertyID, &unit.UnitNumber, &unit.UnitType, &unit.FloorNumber,
			&unit.SquareFeet, &unit.Bedrooms, &unit.Bathrooms, &unit.Lifecycle,
			&unit.Description, &unit.Amenities,
			&unit.CreatedAt, &unit.UpdatedAt, &unit.Version,
		)
		if err != nil {
			return nil, err
		}
		units = append(units, unit)
	}

	return units, nil
}

func (r *DBUnitRepository) Update(ctx context.Context, unit model.Unit) error {
	query := `
		UPDATE units
		SET unit_number = $2, unit_type = $3, floor_number = $4,
			square_feet = $5, bedrooms = $6, bathrooms = $7, lifecycle = $8,
			description = $9, amenities = $10,
			updated_at = $11, version = version + 1
		WHERE id = $1 AND version = $12
	`

	result, err := r.db.Exec(ctx, query,
		unit.ID, unit.UnitNumber, unit.UnitType, unit.FloorNumber,
		unit.SquareFeet, unit.Bedrooms, unit.Bathrooms, unit.Lifecycle,
		unit.Description, unit.Amenities,
		unit.UpdatedAt, unit.Version,
	)

	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrUnitNotFound
	}

	return nil
}

func (r *DBUnitRepository) UpdateLifecycle(ctx context.Context, id uuid.UUID, lifecycle model.UnitLifecycle) error {
	query := `
		UPDATE units
		SET lifecycle = $2, updated_at = current_timestamp
		WHERE id = $1
	`

	result, err := r.db.Exec(ctx, query, id, lifecycle)
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrUnitNotFound
	}

	return nil
}

func (r *DBUnitRepository) UpdateLifecycleTx(tx pgx.Tx, id uuid.UUID, lifecycle model.UnitLifecycle) error {
	query := `
		UPDATE units
		SET lifecycle = $2, updated_at = current_timestamp
		WHERE id = $1
	`

	result, err := tx.Exec(context.Background(), query, id, lifecycle)
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrUnitNotFound
	}

	return nil
}
