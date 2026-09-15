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
	ErrPropertyNotFound = errors.New("property not found")
)

type PropertyRepository interface {
	Create(ctx context.Context, property model.Property) error
	GetByID(ctx context.Context, id uuid.UUID) (model.Property, error)
	GetByLandlordProfileID(ctx context.Context, landlordProfileID uuid.UUID) ([]model.Property, error)
	Update(ctx context.Context, property model.Property) error
	UpdateStatus(ctx context.Context, id uuid.UUID, status model.PropertyStatus) error
}

type DBPropertyRepository struct {
	db *pgxpool.Pool
}

func NewPropertyRepository(db *pgxpool.Pool) PropertyRepository {
	return &DBPropertyRepository{db: db}
}

func (r *DBPropertyRepository) Create(ctx context.Context, property model.Property) error {
	query := `
		INSERT INTO properties (
			id, landlord_profile_id, property_name, property_type,
			address_line1, address_line2, city, state, postal_code, country,
			status, total_units, description,
			created_at, updated_at, version
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
	`

	_, err := r.db.Exec(ctx, query,
		property.ID, property.LandlordProfileID, property.PropertyName, property.PropertyType,
		property.AddressLine1, property.AddressLine2, property.City, property.State, property.PostalCode, property.Country,
		property.Status, property.TotalUnits, property.Description,
		property.CreatedAt, property.UpdatedAt, property.Version,
	)

	return err
}

func (r *DBPropertyRepository) GetByID(ctx context.Context, id uuid.UUID) (model.Property, error) {
	query := `
		SELECT id, landlord_profile_id, property_name, property_type,
			address_line1, address_line2, city, state, postal_code, country,
			status, total_units, description,
			created_at, updated_at, version
		FROM properties
		WHERE id = $1
	`

	var property model.Property
	err := r.db.QueryRow(ctx, query, id).Scan(
		&property.ID, &property.LandlordProfileID, &property.PropertyName, &property.PropertyType,
		&property.AddressLine1, &property.AddressLine2, &property.City, &property.State, &property.PostalCode, &property.Country,
		&property.Status, &property.TotalUnits, &property.Description,
		&property.CreatedAt, &property.UpdatedAt, &property.Version,
	)

	if err == pgx.ErrNoRows {
		return model.Property{}, ErrPropertyNotFound
	}

	return property, err
}

func (r *DBPropertyRepository) GetByLandlordProfileID(ctx context.Context, landlordProfileID uuid.UUID) ([]model.Property, error) {
	query := `
		SELECT id, landlord_profile_id, property_name, property_type,
			address_line1, address_line2, city, state, postal_code, country,
			status, total_units, description,
			created_at, updated_at, version
		FROM properties
		WHERE landlord_profile_id = $1
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query, landlordProfileID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var properties []model.Property
	for rows.Next() {
		var property model.Property
		err := rows.Scan(
			&property.ID, &property.LandlordProfileID, &property.PropertyName, &property.PropertyType,
			&property.AddressLine1, &property.AddressLine2, &property.City, &property.State, &property.PostalCode, &property.Country,
			&property.Status, &property.TotalUnits, &property.Description,
			&property.CreatedAt, &property.UpdatedAt, &property.Version,
		)
		if err != nil {
			return nil, err
		}
		properties = append(properties, property)
	}

	return properties, nil
}

func (r *DBPropertyRepository) Update(ctx context.Context, property model.Property) error {
	query := `
		UPDATE properties
		SET property_name = $2, property_type = $3,
			address_line1 = $4, address_line2 = $5, city = $6, state = $7, postal_code = $8, country = $9,
			status = $10, total_units = $11, description = $12,
			updated_at = $13, version = version + 1
		WHERE id = $1 AND version = $14
	`

	result, err := r.db.Exec(ctx, query,
		property.ID, property.PropertyName, property.PropertyType,
		property.AddressLine1, property.AddressLine2, property.City, property.State, property.PostalCode, property.Country,
		property.Status, property.TotalUnits, property.Description,
		property.UpdatedAt, property.Version,
	)

	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrPropertyNotFound
	}

	return nil
}

func (r *DBPropertyRepository) UpdateStatus(ctx context.Context, id uuid.UUID, status model.PropertyStatus) error {
	query := `
		UPDATE properties
		SET status = $2, updated_at = current_timestamp
		WHERE id = $1
	`

	result, err := r.db.Exec(ctx, query, id, status)
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrPropertyNotFound
	}

	return nil
}
