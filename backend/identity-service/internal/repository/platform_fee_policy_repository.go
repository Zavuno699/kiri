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
	ErrPlatformFeePolicyNotFound = errors.New("platform fee policy not found")
)

type PlatformFeePolicyRepository interface {
	Create(ctx context.Context, policy model.PlatformFeePolicy) error
	GetByID(ctx context.Context, id uuid.UUID) (model.PlatformFeePolicy, error)
	GetByVersion(ctx context.Context, version string) (model.PlatformFeePolicy, error)
	GetActiveByCurrency(ctx context.Context, currency string) (model.PlatformFeePolicy, error)
	List(ctx context.Context) ([]model.PlatformFeePolicy, error)
	Update(ctx context.Context, policy model.PlatformFeePolicy) error
}

type DBPlatformFeePolicyRepository struct {
	db *pgxpool.Pool
}

func NewPlatformFeePolicyRepository(db *pgxpool.Pool) PlatformFeePolicyRepository {
	return &DBPlatformFeePolicyRepository{db: db}
}

func (r *DBPlatformFeePolicyRepository) Create(ctx context.Context, policy model.PlatformFeePolicy) error {
	query := `
		INSERT INTO platform_fee_policies (
			id, policy_version, fee_type, percentage_fee, fixed_fee,
			currency, effective_from, effective_until,
			description, created_by, created_at
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
	`

	_, err := r.db.Exec(ctx, query,
		policy.ID, policy.PolicyVersion, policy.FeeType, policy.PercentageFee, policy.FixedFee,
		policy.Currency, policy.EffectiveFrom, policy.EffectiveUntil,
		policy.Description, policy.CreatedBy, policy.CreatedAt,
	)

	return err
}

func (r *DBPlatformFeePolicyRepository) GetByID(ctx context.Context, id uuid.UUID) (model.PlatformFeePolicy, error) {
	query := `
		SELECT id, policy_version, fee_type, percentage_fee, fixed_fee,
			currency, effective_from, effective_until,
			description, created_by, created_at
		FROM platform_fee_policies
		WHERE id = $1
	`

	var policy model.PlatformFeePolicy
	err := r.db.QueryRow(ctx, query, id).Scan(
		&policy.ID, &policy.PolicyVersion, &policy.FeeType, &policy.PercentageFee, &policy.FixedFee,
		&policy.Currency, &policy.EffectiveFrom, &policy.EffectiveUntil,
		&policy.Description, &policy.CreatedBy, &policy.CreatedAt,
	)

	if err == pgx.ErrNoRows {
		return model.PlatformFeePolicy{}, ErrPlatformFeePolicyNotFound
	}

	return policy, err
}

func (r *DBPlatformFeePolicyRepository) GetByVersion(ctx context.Context, version string) (model.PlatformFeePolicy, error) {
	query := `
		SELECT id, policy_version, fee_type, percentage_fee, fixed_fee,
			currency, effective_from, effective_until,
			description, created_by, created_at
		FROM platform_fee_policies
		WHERE policy_version = $1
	`

	var policy model.PlatformFeePolicy
	err := r.db.QueryRow(ctx, query, version).Scan(
		&policy.ID, &policy.PolicyVersion, &policy.FeeType, &policy.PercentageFee, &policy.FixedFee,
		&policy.Currency, &policy.EffectiveFrom, &policy.EffectiveUntil,
		&policy.Description, &policy.CreatedBy, &policy.CreatedAt,
	)

	if err == pgx.ErrNoRows {
		return model.PlatformFeePolicy{}, ErrPlatformFeePolicyNotFound
	}

	return policy, err
}

func (r *DBPlatformFeePolicyRepository) GetActiveByCurrency(ctx context.Context, currency string) (model.PlatformFeePolicy, error) {
	query := `
		SELECT id, policy_version, fee_type, percentage_fee, fixed_fee,
			currency, effective_from, effective_until,
			description, created_by, created_at
		FROM platform_fee_policies
		WHERE currency = $1
		  AND effective_from <= current_timestamp
		  AND (effective_until IS NULL OR effective_until > current_timestamp)
		ORDER BY effective_from DESC
		LIMIT 1
	`

	var policy model.PlatformFeePolicy
	err := r.db.QueryRow(ctx, query, currency).Scan(
		&policy.ID, &policy.PolicyVersion, &policy.FeeType, &policy.PercentageFee, &policy.FixedFee,
		&policy.Currency, &policy.EffectiveFrom, &policy.EffectiveUntil,
		&policy.Description, &policy.CreatedBy, &policy.CreatedAt,
	)

	if err == pgx.ErrNoRows {
		return model.PlatformFeePolicy{}, ErrPlatformFeePolicyNotFound
	}

	return policy, err
}

func (r *DBPlatformFeePolicyRepository) List(ctx context.Context) ([]model.PlatformFeePolicy, error) {
	query := `
		SELECT id, policy_version, fee_type, percentage_fee, fixed_fee,
			currency, effective_from, effective_until,
			description, created_by, created_at
		FROM platform_fee_policies
		ORDER BY effective_from DESC
	`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var policies []model.PlatformFeePolicy
	for rows.Next() {
		var policy model.PlatformFeePolicy
		err := rows.Scan(
			&policy.ID, &policy.PolicyVersion, &policy.FeeType, &policy.PercentageFee, &policy.FixedFee,
			&policy.Currency, &policy.EffectiveFrom, &policy.EffectiveUntil,
			&policy.Description, &policy.CreatedBy, &policy.CreatedAt,
		)
		if err != nil {
			return nil, err
		}
		policies = append(policies, policy)
	}

	return policies, nil
}

func (r *DBPlatformFeePolicyRepository) Update(ctx context.Context, policy model.PlatformFeePolicy) error {
	query := `
		UPDATE platform_fee_policies
		SET effective_until = $2
		WHERE id = $1
	`

	result, err := r.db.Exec(ctx, query, policy.ID, policy.EffectiveUntil)
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrPlatformFeePolicyNotFound
	}

	return nil
}
