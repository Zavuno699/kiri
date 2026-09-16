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
	ErrTenancyNotFound = errors.New("tenancy not found")
)

type TenancyRepository interface {
	Create(ctx context.Context, tenancy model.Tenancy) error
	GetByID(ctx context.Context, id uuid.UUID) (model.Tenancy, error)
	GetByTenantSubjectID(ctx context.Context, tenantSubjectID uuid.UUID) ([]model.Tenancy, error)
	GetActiveByTenantSubjectID(ctx context.Context, tenantSubjectID uuid.UUID) (model.Tenancy, error)
	GetByUnitID(ctx context.Context, unitID uuid.UUID) ([]model.Tenancy, error)
	GetByTokenHash(ctx context.Context, tokenHash string) (model.Tenancy, error)
	Update(ctx context.Context, tenancy model.Tenancy) error
	UpdateStatus(ctx context.Context, id uuid.UUID, status model.TenancyStatus) error
	AcceptInvitation(ctx context.Context, id uuid.UUID) error
}

type DBTenancyRepository struct {
	db *pgxpool.Pool
}

func NewTenancyRepository(db *pgxpool.Pool) TenancyRepository {
	return &DBTenancyRepository{db: db}
}

func (r *DBTenancyRepository) Create(ctx context.Context, tenancy model.Tenancy) error {
	query := `
		INSERT INTO tenancies (
			id, tenant_subject_id, unit_id, status,
			lease_start_date, lease_end_date,
			invited_by_landlord_profile_id, invitation_token_hash, invitation_expires_at, invitation_accepted_at,
			terminated_at, termination_reason,
			created_at, updated_at, version
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
	`

	_, err := r.db.Exec(ctx, query,
		tenancy.ID, tenancy.TenantSubjectID, tenancy.UnitID, tenancy.Status,
		tenancy.LeaseStartDate, tenancy.LeaseEndDate,
		tenancy.InvitedByLandlordProfileID, tenancy.InvitationTokenHash, tenancy.InvitationExpiresAt, tenancy.InvitationAcceptedAt,
		tenancy.TerminatedAt, tenancy.TerminationReason,
		tenancy.CreatedAt, tenancy.UpdatedAt, tenancy.Version,
	)

	return err
}

func (r *DBTenancyRepository) GetByID(ctx context.Context, id uuid.UUID) (model.Tenancy, error) {
	query := `
		SELECT id, tenant_subject_id, unit_id, status,
			lease_start_date, lease_end_date,
			invited_by_landlord_profile_id, invitation_token_hash, invitation_expires_at, invitation_accepted_at,
			terminated_at, termination_reason,
			created_at, updated_at, version
		FROM tenancies
		WHERE id = $1
	`

	var tenancy model.Tenancy
	err := r.db.QueryRow(ctx, query, id).Scan(
		&tenancy.ID, &tenancy.TenantSubjectID, &tenancy.UnitID, &tenancy.Status,
		&tenancy.LeaseStartDate, &tenancy.LeaseEndDate,
		&tenancy.InvitedByLandlordProfileID, &tenancy.InvitationTokenHash, &tenancy.InvitationExpiresAt, &tenancy.InvitationAcceptedAt,
		&tenancy.TerminatedAt, &tenancy.TerminationReason,
		&tenancy.CreatedAt, &tenancy.UpdatedAt, &tenancy.Version,
	)

	if err == pgx.ErrNoRows {
		return model.Tenancy{}, ErrTenancyNotFound
	}

	return tenancy, err
}

func (r *DBTenancyRepository) GetByTenantSubjectID(ctx context.Context, tenantSubjectID uuid.UUID) ([]model.Tenancy, error) {
	query := `
		SELECT id, tenant_subject_id, unit_id, status,
			lease_start_date, lease_end_date,
			invited_by_landlord_profile_id, invitation_token_hash, invitation_expires_at, invitation_accepted_at,
			terminated_at, termination_reason,
			created_at, updated_at, version
		FROM tenancies
		WHERE tenant_subject_id = $1
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query, tenantSubjectID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tenancies []model.Tenancy
	for rows.Next() {
		var tenancy model.Tenancy
		err := rows.Scan(
			&tenancy.ID, &tenancy.TenantSubjectID, &tenancy.UnitID, &tenancy.Status,
			&tenancy.LeaseStartDate, &tenancy.LeaseEndDate,
			&tenancy.InvitedByLandlordProfileID, &tenancy.InvitationTokenHash, &tenancy.InvitationExpiresAt, &tenancy.InvitationAcceptedAt,
			&tenancy.TerminatedAt, &tenancy.TerminationReason,
			&tenancy.CreatedAt, &tenancy.UpdatedAt, &tenancy.Version,
		)
		if err != nil {
			return nil, err
		}
		tenancies = append(tenancies, tenancy)
	}

	return tenancies, nil
}

func (r *DBTenancyRepository) GetActiveByTenantSubjectID(ctx context.Context, tenantSubjectID uuid.UUID) (model.Tenancy, error) {
	query := `
		SELECT id, tenant_subject_id, unit_id, status,
			lease_start_date, lease_end_date,
			invited_by_landlord_profile_id, invitation_token_hash, invitation_expires_at, invitation_accepted_at,
			terminated_at, termination_reason,
			created_at, updated_at, version
		FROM tenancies
		WHERE tenant_subject_id = $1 AND status = 'ACTIVE'
		LIMIT 1
	`

	var tenancy model.Tenancy
	err := r.db.QueryRow(ctx, query, tenantSubjectID).Scan(
		&tenancy.ID, &tenancy.TenantSubjectID, &tenancy.UnitID, &tenancy.Status,
		&tenancy.LeaseStartDate, &tenancy.LeaseEndDate,
		&tenancy.InvitedByLandlordProfileID, &tenancy.InvitationTokenHash, &tenancy.InvitationExpiresAt, &tenancy.InvitationAcceptedAt,
		&tenancy.TerminatedAt, &tenancy.TerminationReason,
		&tenancy.CreatedAt, &tenancy.UpdatedAt, &tenancy.Version,
	)

	if err == pgx.ErrNoRows {
		return model.Tenancy{}, ErrTenancyNotFound
	}

	return tenancy, err
}

func (r *DBTenancyRepository) GetByUnitID(ctx context.Context, unitID uuid.UUID) ([]model.Tenancy, error) {
	query := `
		SELECT id, tenant_subject_id, unit_id, status,
			lease_start_date, lease_end_date,
			invited_by_landlord_profile_id, invitation_token_hash, invitation_expires_at, invitation_accepted_at,
			terminated_at, termination_reason,
			created_at, updated_at, version
		FROM tenancies
		WHERE unit_id = $1
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query, unitID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tenancies []model.Tenancy
	for rows.Next() {
		var tenancy model.Tenancy
		err := rows.Scan(
			&tenancy.ID, &tenancy.TenantSubjectID, &tenancy.UnitID, &tenancy.Status,
			&tenancy.LeaseStartDate, &tenancy.LeaseEndDate,
			&tenancy.InvitedByLandlordProfileID, &tenancy.InvitationTokenHash, &tenancy.InvitationExpiresAt, &tenancy.InvitationAcceptedAt,
			&tenancy.TerminatedAt, &tenancy.TerminationReason,
			&tenancy.CreatedAt, &tenancy.UpdatedAt, &tenancy.Version,
		)
		if err != nil {
			return nil, err
		}
		tenancies = append(tenancies, tenancy)
	}

	return tenancies, nil
}

func (r *DBTenancyRepository) GetByTokenHash(ctx context.Context, tokenHash string) (model.Tenancy, error) {
	query := `
		SELECT id, tenant_subject_id, unit_id, status,
			lease_start_date, lease_end_date,
			invited_by_landlord_profile_id, invitation_token_hash, invitation_expires_at, invitation_accepted_at,
			terminated_at, termination_reason,
			created_at, updated_at, version
		FROM tenancies
		WHERE invitation_token_hash = $1
		ORDER BY created_at DESC
		LIMIT 1
	`

	var tenancy model.Tenancy
	err := r.db.QueryRow(ctx, query, tokenHash).Scan(
		&tenancy.ID, &tenancy.TenantSubjectID, &tenancy.UnitID, &tenancy.Status,
		&tenancy.LeaseStartDate, &tenancy.LeaseEndDate,
		&tenancy.InvitedByLandlordProfileID, &tenancy.InvitationTokenHash, &tenancy.InvitationExpiresAt, &tenancy.InvitationAcceptedAt,
		&tenancy.TerminatedAt, &tenancy.TerminationReason,
		&tenancy.CreatedAt, &tenancy.UpdatedAt, &tenancy.Version,
	)

	if err == pgx.ErrNoRows {
		return model.Tenancy{}, ErrTenancyNotFound
	}

	return tenancy, err
}

func (r *DBTenancyRepository) Update(ctx context.Context, tenancy model.Tenancy) error {
	query := `
		UPDATE tenancies
		SET status = $2, lease_start_date = $3, lease_end_date = $4,
			invited_by_landlord_profile_id = $5, invitation_token_hash = $6, invitation_expires_at = $7, invitation_accepted_at = $8,
			terminated_at = $9, termination_reason = $10,
			updated_at = $11, version = version + 1
		WHERE id = $1 AND version = $12
	`

	result, err := r.db.Exec(ctx, query,
		tenancy.ID, tenancy.Status, tenancy.LeaseStartDate, tenancy.LeaseEndDate,
		tenancy.InvitedByLandlordProfileID, tenancy.InvitationTokenHash, tenancy.InvitationExpiresAt, tenancy.InvitationAcceptedAt,
		tenancy.TerminatedAt, tenancy.TerminationReason,
		tenancy.UpdatedAt, tenancy.Version,
	)

	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrTenancyNotFound
	}

	return nil
}

func (r *DBTenancyRepository) UpdateStatus(ctx context.Context, id uuid.UUID, status model.TenancyStatus) error {
	query := `
		UPDATE tenancies
		SET status = $2, updated_at = current_timestamp
		WHERE id = $1
	`

	result, err := r.db.Exec(ctx, query, id, status)
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrTenancyNotFound
	}

	return nil
}

func (r *DBTenancyRepository) AcceptInvitation(ctx context.Context, id uuid.UUID) error {
	now := "current_timestamp"
	query := `
		UPDATE tenancies
		SET status = 'ACTIVE', invitation_accepted_at = ` + now + `, updated_at = current_timestamp
		WHERE id = $1 AND status = 'INVITED'
	`

	result, err := r.db.Exec(ctx, query, id)
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrTenancyNotFound
	}

	return nil
}
