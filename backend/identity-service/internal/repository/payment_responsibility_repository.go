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
	ErrPaymentResponsibilityNotFound = errors.New("payment responsibility not found")
)

type PaymentResponsibilityRepository interface {
	Create(ctx context.Context, responsibility model.PaymentResponsibility) error
	GetByID(ctx context.Context, id uuid.UUID) (model.PaymentResponsibility, error)
	GetByTenantSubjectID(ctx context.Context, tenantSubjectID uuid.UUID) ([]model.PaymentResponsibility, error)
	GetActiveByTenantSubjectID(ctx context.Context, tenantSubjectID uuid.UUID) (model.PaymentResponsibility, error)
	GetByTenancyID(ctx context.Context, tenancyID uuid.UUID) ([]model.PaymentResponsibility, error)
	Update(ctx context.Context, responsibility model.PaymentResponsibility) error
	UpdateStatus(ctx context.Context, id uuid.UUID, status model.PaymentResponsibilityStatus) error
}

type DBPaymentResponsibilityRepository struct {
	db *pgxpool.Pool
}

func NewPaymentResponsibilityRepository(db *pgxpool.Pool) PaymentResponsibilityRepository {
	return &DBPaymentResponsibilityRepository{db: db}
}

func (r *DBPaymentResponsibilityRepository) Create(ctx context.Context, responsibility model.PaymentResponsibility) error {
	query := `
		INSERT INTO payment_responsibilities (
			id, tenant_subject_id, payment_account_id, tenancy_id,
			status, responsible_for_rent, responsible_for_utilities, responsible_for_fees,
			monthly_rent_amount, notes,
			created_at, updated_at, version
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
	`

	_, err := r.db.Exec(ctx, query,
		responsibility.ID, responsibility.TenantSubjectID, responsibility.PaymentAccountID, responsibility.TenancyID,
		responsibility.Status, responsibility.ResponsibleForRent, responsibility.ResponsibleForUtilities, responsibility.ResponsibleForFees,
		responsibility.MonthlyRentAmount, responsibility.Notes,
		responsibility.CreatedAt, responsibility.UpdatedAt, responsibility.Version,
	)

	return err
}

func (r *DBPaymentResponsibilityRepository) GetByID(ctx context.Context, id uuid.UUID) (model.PaymentResponsibility, error) {
	query := `
		SELECT id, tenant_subject_id, payment_account_id, tenancy_id,
			status, responsible_for_rent, responsible_for_utilities, responsible_for_fees,
			monthly_rent_amount, notes,
			created_at, updated_at, version
		FROM payment_responsibilities
		WHERE id = $1
	`

	var responsibility model.PaymentResponsibility
	err := r.db.QueryRow(ctx, query, id).Scan(
		&responsibility.ID, &responsibility.TenantSubjectID, &responsibility.PaymentAccountID, &responsibility.TenancyID,
		&responsibility.Status, &responsibility.ResponsibleForRent, &responsibility.ResponsibleForUtilities, &responsibility.ResponsibleForFees,
		&responsibility.MonthlyRentAmount, &responsibility.Notes,
		&responsibility.CreatedAt, &responsibility.UpdatedAt, &responsibility.Version,
	)

	if err == pgx.ErrNoRows {
		return model.PaymentResponsibility{}, ErrPaymentResponsibilityNotFound
	}

	return responsibility, err
}

func (r *DBPaymentResponsibilityRepository) GetByTenantSubjectID(ctx context.Context, tenantSubjectID uuid.UUID) ([]model.PaymentResponsibility, error) {
	query := `
		SELECT id, tenant_subject_id, payment_account_id, tenancy_id,
			status, responsible_for_rent, responsible_for_utilities, responsible_for_fees,
			monthly_rent_amount, notes,
			created_at, updated_at, version
		FROM payment_responsibilities
		WHERE tenant_subject_id = $1
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query, tenantSubjectID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var responsibilities []model.PaymentResponsibility
	for rows.Next() {
		var responsibility model.PaymentResponsibility
		err := rows.Scan(
			&responsibility.ID, &responsibility.TenantSubjectID, &responsibility.PaymentAccountID, &responsibility.TenancyID,
			&responsibility.Status, &responsibility.ResponsibleForRent, &responsibility.ResponsibleForUtilities, &responsibility.ResponsibleForFees,
			&responsibility.MonthlyRentAmount, &responsibility.Notes,
			&responsibility.CreatedAt, &responsibility.UpdatedAt, &responsibility.Version,
		)
		if err != nil {
			return nil, err
		}
		responsibilities = append(responsibilities, responsibility)
	}

	return responsibilities, nil
}

func (r *DBPaymentResponsibilityRepository) GetActiveByTenantSubjectID(ctx context.Context, tenantSubjectID uuid.UUID) (model.PaymentResponsibility, error) {
	query := `
		SELECT id, tenant_subject_id, payment_account_id, tenancy_id,
			status, responsible_for_rent, responsible_for_utilities, responsible_for_fees,
			monthly_rent_amount, notes,
			created_at, updated_at, version
		FROM payment_responsibilities
		WHERE tenant_subject_id = $1 AND status = 'ACTIVE'
		LIMIT 1
	`

	var responsibility model.PaymentResponsibility
	err := r.db.QueryRow(ctx, query, tenantSubjectID).Scan(
		&responsibility.ID, &responsibility.TenantSubjectID, &responsibility.PaymentAccountID, &responsibility.TenancyID,
		&responsibility.Status, &responsibility.ResponsibleForRent, &responsibility.ResponsibleForUtilities, &responsibility.ResponsibleForFees,
		&responsibility.MonthlyRentAmount, &responsibility.Notes,
		&responsibility.CreatedAt, &responsibility.UpdatedAt, &responsibility.Version,
	)

	if err == pgx.ErrNoRows {
		return model.PaymentResponsibility{}, ErrPaymentResponsibilityNotFound
	}

	return responsibility, err
}

func (r *DBPaymentResponsibilityRepository) GetByTenancyID(ctx context.Context, tenancyID uuid.UUID) ([]model.PaymentResponsibility, error) {
	query := `
		SELECT id, tenant_subject_id, payment_account_id, tenancy_id,
			status, responsible_for_rent, responsible_for_utilities, responsible_for_fees,
			monthly_rent_amount, notes,
			created_at, updated_at, version
		FROM payment_responsibilities
		WHERE tenancy_id = $1
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query, tenancyID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var responsibilities []model.PaymentResponsibility
	for rows.Next() {
		var responsibility model.PaymentResponsibility
		err := rows.Scan(
			&responsibility.ID, &responsibility.TenantSubjectID, &responsibility.PaymentAccountID, &responsibility.TenancyID,
			&responsibility.Status, &responsibility.ResponsibleForRent, &responsibility.ResponsibleForUtilities, &responsibility.ResponsibleForFees,
			&responsibility.MonthlyRentAmount, &responsibility.Notes,
			&responsibility.CreatedAt, &responsibility.UpdatedAt, &responsibility.Version,
		)
		if err != nil {
			return nil, err
		}
		responsibilities = append(responsibilities, responsibility)
	}

	return responsibilities, nil
}

func (r *DBPaymentResponsibilityRepository) Update(ctx context.Context, responsibility model.PaymentResponsibility) error {
	query := `
		UPDATE payment_responsibilities
		SET status = $2, responsible_for_rent = $3, responsible_for_utilities = $4, responsible_for_fees = $5,
			monthly_rent_amount = $6, notes = $7,
			updated_at = $8, version = version + 1
		WHERE id = $1 AND version = $9
	`

	result, err := r.db.Exec(ctx, query,
		responsibility.ID, responsibility.Status, responsibility.ResponsibleForRent, responsibility.ResponsibleForUtilities, responsibility.ResponsibleForFees,
		responsibility.MonthlyRentAmount, responsibility.Notes,
		responsibility.UpdatedAt, responsibility.Version,
	)

	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrPaymentResponsibilityNotFound
	}

	return nil
}

func (r *DBPaymentResponsibilityRepository) UpdateStatus(ctx context.Context, id uuid.UUID, status model.PaymentResponsibilityStatus) error {
	query := `
		UPDATE payment_responsibilities
		SET status = $2, updated_at = current_timestamp
		WHERE id = $1
	`

	result, err := r.db.Exec(ctx, query, id, status)
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrPaymentResponsibilityNotFound
	}

	return nil
}
