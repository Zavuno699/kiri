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
	ErrLandlordProfileNotFound = errors.New("landlord profile not found")
)

type LandlordProfileRepository interface {
	Create(ctx context.Context, profile model.LandlordProfile) error
	GetBySubjectID(ctx context.Context, subjectID uuid.UUID) (model.LandlordProfile, error)
	GetByID(ctx context.Context, id uuid.UUID) (model.LandlordProfile, error)
	Update(ctx context.Context, profile model.LandlordProfile) error
	UpdateVerificationStatus(ctx context.Context, id uuid.UUID, status model.LandlordVerificationStatus) error
	UpdateAuthorizationState(ctx context.Context, id uuid.UUID, state model.LandlordAuthorizationState) error
}

type DBLandlordProfileRepository struct {
	db *pgxpool.Pool
}

func NewLandlordProfileRepository(db *pgxpool.Pool) LandlordProfileRepository {
	return &DBLandlordProfileRepository{db: db}
}

func (r *DBLandlordProfileRepository) Create(ctx context.Context, profile model.LandlordProfile) error {
	query := `
		INSERT INTO landlord_profiles (
			id, subject_id, verification_status, authorization_state,
			legal_name, business_name, legal_entity_type, tax_id, phone,
			address_line1, address_line2, city, state, postal_code, country,
			submitted_at, reviewed_at, verified_at, rejection_reason, notes,
			created_at, updated_at, version
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
	`

	_, err := r.db.Exec(ctx, query,
		profile.ID, profile.SubjectID, profile.VerificationStatus, profile.AuthorizationState,
		profile.LegalName, profile.BusinessName, profile.LegalEntityType, profile.TaxID, profile.Phone,
		profile.AddressLine1, profile.AddressLine2, profile.City, profile.State, profile.PostalCode, profile.Country,
		profile.SubmittedAt, profile.ReviewedAt, profile.VerifiedAt, profile.RejectionReason, profile.Notes,
		profile.CreatedAt, profile.UpdatedAt, profile.Version,
	)

	return err
}

func (r *DBLandlordProfileRepository) GetBySubjectID(ctx context.Context, subjectID uuid.UUID) (model.LandlordProfile, error) {
	query := `
		SELECT id, subject_id, verification_status, authorization_state,
			legal_name, business_name, legal_entity_type, tax_id, phone,
			address_line1, address_line2, city, state, postal_code, country,
			submitted_at, reviewed_at, verified_at, rejection_reason, notes,
			created_at, updated_at, version
		FROM landlord_profiles
		WHERE subject_id = $1
	`

	var profile model.LandlordProfile
	err := r.db.QueryRow(ctx, query, subjectID).Scan(
		&profile.ID, &profile.SubjectID, &profile.VerificationStatus, &profile.AuthorizationState,
		&profile.LegalName, &profile.BusinessName, &profile.LegalEntityType, &profile.TaxID, &profile.Phone,
		&profile.AddressLine1, &profile.AddressLine2, &profile.City, &profile.State, &profile.PostalCode, &profile.Country,
		&profile.SubmittedAt, &profile.ReviewedAt, &profile.VerifiedAt, &profile.RejectionReason, &profile.Notes,
		&profile.CreatedAt, &profile.UpdatedAt, &profile.Version,
	)

	if err == pgx.ErrNoRows {
		return model.LandlordProfile{}, ErrLandlordProfileNotFound
	}

	return profile, err
}

func (r *DBLandlordProfileRepository) GetByID(ctx context.Context, id uuid.UUID) (model.LandlordProfile, error) {
	query := `
		SELECT id, subject_id, verification_status, authorization_state,
			legal_name, business_name, legal_entity_type, tax_id, phone,
			address_line1, address_line2, city, state, postal_code, country,
			submitted_at, reviewed_at, verified_at, rejection_reason, notes,
			created_at, updated_at, version
		FROM landlord_profiles
		WHERE id = $1
	`

	var profile model.LandlordProfile
	err := r.db.QueryRow(ctx, query, id).Scan(
		&profile.ID, &profile.SubjectID, &profile.VerificationStatus, &profile.AuthorizationState,
		&profile.LegalName, &profile.BusinessName, &profile.LegalEntityType, &profile.TaxID, &profile.Phone,
		&profile.AddressLine1, &profile.AddressLine2, &profile.City, &profile.State, &profile.PostalCode, &profile.Country,
		&profile.SubmittedAt, &profile.ReviewedAt, &profile.VerifiedAt, &profile.RejectionReason, &profile.Notes,
		&profile.CreatedAt, &profile.UpdatedAt, &profile.Version,
	)

	if err == pgx.ErrNoRows {
		return model.LandlordProfile{}, ErrLandlordProfileNotFound
	}

	return profile, err
}

func (r *DBLandlordProfileRepository) Update(ctx context.Context, profile model.LandlordProfile) error {
	query := `
		UPDATE landlord_profiles
		SET verification_status = $2, authorization_state = $3,
			legal_name = $4, business_name = $5, legal_entity_type = $6, tax_id = $7, phone = $8,
			address_line1 = $9, address_line2 = $10, city = $11, state = $12, postal_code = $13, country = $14,
			submitted_at = $15, reviewed_at = $16, verified_at = $17, rejection_reason = $18, notes = $19,
			updated_at = $20, version = version + 1
		WHERE id = $1 AND version = $21
	`

	result, err := r.db.Exec(ctx, query,
		profile.ID, profile.VerificationStatus, profile.AuthorizationState,
		profile.LegalName, profile.BusinessName, profile.LegalEntityType, profile.TaxID, profile.Phone,
		profile.AddressLine1, profile.AddressLine2, profile.City, profile.State, profile.PostalCode, profile.Country,
		profile.SubmittedAt, profile.ReviewedAt, profile.VerifiedAt, profile.RejectionReason, profile.Notes,
		profile.UpdatedAt, profile.Version,
	)

	if err != nil {
		return err
	}

	rowsAffected := result.RowsAffected()
	if rowsAffected == 0 {
		return ErrLandlordProfileNotFound
	}

	return nil
}

func (r *DBLandlordProfileRepository) UpdateVerificationStatus(ctx context.Context, id uuid.UUID, status model.LandlordVerificationStatus) error {
	query := `
		UPDATE landlord_profiles
		SET verification_status = $2, updated_at = current_timestamp, version = version + 1
		WHERE id = $1
	`

	result, err := r.db.Exec(ctx, query, id, status)
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrLandlordProfileNotFound
	}

	return nil
}

func (r *DBLandlordProfileRepository) UpdateAuthorizationState(ctx context.Context, id uuid.UUID, state model.LandlordAuthorizationState) error {
	query := `
		UPDATE landlord_profiles
		SET authorization_state = $2, updated_at = current_timestamp
		WHERE id = $1
	`

	result, err := r.db.Exec(ctx, query, id, state)
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrLandlordProfileNotFound
	}

	return nil
}
