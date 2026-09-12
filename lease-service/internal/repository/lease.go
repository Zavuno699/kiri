package repository

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/lease-service/internal/model"
)

type LeaseRepository interface {
	Create(ctx context.Context, lease model.Lease) error
	GetByID(ctx context.Context, id uuid.UUID) (model.Lease, error)
	GetByTenantID(ctx context.Context, tenantID uuid.UUID) (model.Lease, error)
	UpdateStatus(
		ctx context.Context,
		id uuid.UUID,
		expectedVersion int64,
		status model.LeaseStatus,
	) error
	UpdateEntitlement(
		ctx context.Context,
		id uuid.UUID,
		expectedVersion int64,
		entitlementFrom time.Time,
		entitlementUntil time.Time,
		graceUntil time.Time,
		complianceUntil time.Time,
	) error
}

type SQLLeaseRepository struct {
	db *sql.DB
}

func NewSQLLeaseRepository(db *sql.DB) *SQLLeaseRepository {
	return &SQLLeaseRepository{db: db}
}

func (r *SQLLeaseRepository) Create(
	ctx context.Context,
	lease model.Lease,
) error {
	if r == nil || r.db == nil {
		return errors.New("database is required")
	}
	if err := lease.Validate(); err != nil {
		return err
	}

	const query = `
		INSERT INTO leases (
			id, tenant_id, property_id, status,
			entitlement_from, entitlement_until,
			grace_until, compliance_until,
			created_at, updated_at, version
		)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
	`

	_, err := r.db.ExecContext(
		ctx, query,
		lease.ID,
		lease.TenantID,
		lease.PropertyID,
		lease.Status,
		lease.EntitlementFrom,
		lease.EntitlementUntil,
		lease.GraceUntil,
		lease.ComplianceUntil,
		lease.CreatedAt,
		lease.UpdatedAt,
		lease.Version,
	)
	return err
}

func (r *SQLLeaseRepository) GetByID(
	ctx context.Context,
	id uuid.UUID,
) (model.Lease, error) {
	if r == nil || r.db == nil {
		return model.Lease{}, errors.New("database is required")
	}
	if id == uuid.Nil {
		return model.Lease{}, errors.New("lease ID is required")
	}

	const query = `
		SELECT id, tenant_id, property_id, status,
		       entitlement_from, entitlement_until,
		       grace_until, compliance_until,
		       created_at, updated_at, version
		FROM leases
		WHERE id = $1
	`

	var lease model.Lease

	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&lease.ID,
		&lease.TenantID,
		&lease.PropertyID,
		&lease.Status,
		&lease.EntitlementFrom,
		&lease.EntitlementUntil,
		&lease.GraceUntil,
		&lease.ComplianceUntil,
		&lease.CreatedAt,
		&lease.UpdatedAt,
		&lease.Version,
	)
	if errors.Is(err, sql.ErrNoRows) {
		return model.Lease{}, ErrLeaseNotFound
	}
	if err != nil {
		return model.Lease{}, err
	}

	return lease, nil
}

func (r *SQLLeaseRepository) GetByTenantID(
	ctx context.Context,
	tenantID uuid.UUID,
) (model.Lease, error) {
	if r == nil || r.db == nil {
		return model.Lease{}, errors.New("database is required")
	}
	if tenantID == uuid.Nil {
		return model.Lease{}, errors.New("tenant ID is required")
	}

	const query = `
		SELECT id, tenant_id, property_id, status,
		       entitlement_from, entitlement_until,
		       grace_until, compliance_until,
		       created_at, updated_at, version
		FROM leases
		WHERE tenant_id = $1
		ORDER BY created_at DESC
		LIMIT 1
	`

	var lease model.Lease

	err := r.db.QueryRowContext(ctx, query, tenantID).Scan(
		&lease.ID,
		&lease.TenantID,
		&lease.PropertyID,
		&lease.Status,
		&lease.EntitlementFrom,
		&lease.EntitlementUntil,
		&lease.GraceUntil,
		&lease.ComplianceUntil,
		&lease.CreatedAt,
		&lease.UpdatedAt,
		&lease.Version,
	)
	if errors.Is(err, sql.ErrNoRows) {
		return model.Lease{}, ErrLeaseNotFound
	}
	if err != nil {
		return model.Lease{}, err
	}

	return lease, nil
}

func (r *SQLLeaseRepository) UpdateStatus(
	ctx context.Context,
	id uuid.UUID,
	expectedVersion int64,
	status model.LeaseStatus,
) error {
	if r == nil || r.db == nil {
		return errors.New("database is required")
	}
	if id == uuid.Nil {
		return errors.New("lease ID is required")
	}
	if expectedVersion < 1 {
		return errors.New("expected version must be positive")
	}

	status = model.NormalizeLeaseStatus(status)

	if status != model.LeaseActive &&
		status != model.LeaseGracePeriod &&
		status != model.LeaseLocked {
		return errors.New("invalid lease status")
	}

	const query = `
		UPDATE leases
		SET status = $1,
		    updated_at = $2,
		    version = version + 1
		WHERE id = $3
		  AND version = $4
	`

	result, err := r.db.ExecContext(
		ctx,
		query,
		status,
		time.Now().UTC(),
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
		return ErrLeaseVersionConflict
	}

	return nil
}

func (r *SQLLeaseRepository) UpdateEntitlement(
	ctx context.Context,
	id uuid.UUID,
	expectedVersion int64,
	entitlementFrom time.Time,
	entitlementUntil time.Time,
	graceUntil time.Time,
	complianceUntil time.Time,
) error {
	if r == nil || r.db == nil {
		return errors.New("database is required")
	}
	if id == uuid.Nil {
		return errors.New("lease ID is required")
	}
	if expectedVersion < 1 {
		return errors.New("expected version must be positive")
	}
	if entitlementFrom.IsZero() || entitlementUntil.IsZero() ||
		graceUntil.IsZero() || complianceUntil.IsZero() {
		return errors.New("entitlement dates are required")
	}
	if !entitlementUntil.After(entitlementFrom) {
		return errors.New("entitlement end must be after entitlement start")
	}
	if graceUntil.Before(entitlementUntil) {
		return errors.New("grace deadline cannot precede entitlement expiry")
	}
	if complianceUntil.Before(graceUntil) {
		return errors.New("compliance deadline cannot precede grace deadline")
	}

	const query = `
		UPDATE leases
		SET status = $1,
		    entitlement_from = $2,
		    entitlement_until = $3,
		    grace_until = $4,
		    compliance_until = $5,
		    updated_at = $6,
		    version = version + 1
		WHERE id = $7
		  AND version = $8
	`

	result, err := r.db.ExecContext(
		ctx,
		query,
		model.LeaseActive,
		entitlementFrom.UTC(),
		entitlementUntil.UTC(),
		graceUntil.UTC(),
		complianceUntil.UTC(),
		time.Now().UTC(),
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
		return ErrLeaseVersionConflict
	}

	return nil
}
