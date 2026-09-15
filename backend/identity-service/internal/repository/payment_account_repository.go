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
	ErrPaymentAccountNotFound = errors.New("payment account not found")
)

type PaymentAccountRepository interface {
	Create(ctx context.Context, account model.PaymentAccount) error
	GetByID(ctx context.Context, id uuid.UUID) (model.PaymentAccount, error)
	GetByLandlordProfileID(ctx context.Context, landlordProfileID uuid.UUID) ([]model.PaymentAccount, error)
	Update(ctx context.Context, account model.PaymentAccount) error
	UpdateStatus(ctx context.Context, id uuid.UUID, status model.PaymentAccountStatus) error
}

type DBPaymentAccountRepository struct {
	db *pgxpool.Pool
}

func NewPaymentAccountRepository(db *pgxpool.Pool) PaymentAccountRepository {
	return &DBPaymentAccountRepository{db: db}
}

func (r *DBPaymentAccountRepository) Create(ctx context.Context, account model.PaymentAccount) error {
	query := `
		INSERT INTO payment_accounts (
			id, landlord_profile_id, account_name, provider,
			provider_account_id, provider_customer_id,
			status, currency, notes,
			created_at, updated_at, version
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
	`

	_, err := r.db.Exec(ctx, query,
		account.ID, account.LandlordProfileID, account.AccountName, account.Provider,
		account.ProviderAccountID, account.ProviderCustomerID,
		account.Status, account.Currency, account.Notes,
		account.CreatedAt, account.UpdatedAt, account.Version,
	)

	return err
}

func (r *DBPaymentAccountRepository) GetByID(ctx context.Context, id uuid.UUID) (model.PaymentAccount, error) {
	query := `
		SELECT id, landlord_profile_id, account_name, provider,
			provider_account_id, provider_customer_id,
			status, currency, notes,
			created_at, updated_at, version
		FROM payment_accounts
		WHERE id = $1
	`

	var account model.PaymentAccount
	err := r.db.QueryRow(ctx, query, id).Scan(
		&account.ID, &account.LandlordProfileID, &account.AccountName, &account.Provider,
		&account.ProviderAccountID, &account.ProviderCustomerID,
		&account.Status, &account.Currency, &account.Notes,
		&account.CreatedAt, &account.UpdatedAt, &account.Version,
	)

	if err == pgx.ErrNoRows {
		return model.PaymentAccount{}, ErrPaymentAccountNotFound
	}

	return account, err
}

func (r *DBPaymentAccountRepository) GetByLandlordProfileID(ctx context.Context, landlordProfileID uuid.UUID) ([]model.PaymentAccount, error) {
	query := `
		SELECT id, landlord_profile_id, account_name, provider,
			provider_account_id, provider_customer_id,
			status, currency, notes,
			created_at, updated_at, version
		FROM payment_accounts
		WHERE landlord_profile_id = $1
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query, landlordProfileID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var accounts []model.PaymentAccount
	for rows.Next() {
		var account model.PaymentAccount
		err := rows.Scan(
			&account.ID, &account.LandlordProfileID, &account.AccountName, &account.Provider,
			&account.ProviderAccountID, &account.ProviderCustomerID,
			&account.Status, &account.Currency, &account.Notes,
			&account.CreatedAt, &account.UpdatedAt, &account.Version,
		)
		if err != nil {
			return nil, err
		}
		accounts = append(accounts, account)
	}

	return accounts, nil
}

func (r *DBPaymentAccountRepository) Update(ctx context.Context, account model.PaymentAccount) error {
	query := `
		UPDATE payment_accounts
		SET account_name = $2, provider = $3,
			provider_account_id = $4, provider_customer_id = $5,
			status = $6, currency = $7, notes = $8,
			updated_at = $9, version = version + 1
		WHERE id = $1 AND version = $10
	`

	result, err := r.db.Exec(ctx, query,
		account.ID, account.AccountName, account.Provider,
		account.ProviderAccountID, account.ProviderCustomerID,
		account.Status, account.Currency, account.Notes,
		account.UpdatedAt, account.Version,
	)

	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrPaymentAccountNotFound
	}

	return nil
}

func (r *DBPaymentAccountRepository) UpdateStatus(ctx context.Context, id uuid.UUID, status model.PaymentAccountStatus) error {
	query := `
		UPDATE payment_accounts
		SET status = $2, updated_at = current_timestamp
		WHERE id = $1
	`

	result, err := r.db.Exec(ctx, query, id, status)
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrPaymentAccountNotFound
	}

	return nil
}
