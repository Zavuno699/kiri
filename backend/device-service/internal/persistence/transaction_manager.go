package persistence

import (
	"context"
	"database/sql"
)

type TransactionManager struct {
	DB *Database
}

func NewTransactionManager(
	db *Database,
) *TransactionManager {
	return &TransactionManager{
		DB: db,
	}
}

func (m *TransactionManager) Begin(
	ctx context.Context,
) (*RepositoryTransaction, error) {
	tx, err := m.DB.DB.BeginTx(
		ctx,
		nil,
	)
	if err != nil {
		return nil, err
	}

	return NewRepositoryTransaction(tx), nil
}

func (m *TransactionManager) Exec(
	ctx context.Context,
	fn func(*RepositoryTransaction) error,
) error {
	tx, err := m.Begin(ctx)
	if err != nil {
		return err
	}

	if err := fn(tx); err != nil {
		_ = tx.Rollback()
		return err
	}

	return tx.Commit()
}

func (m *TransactionManager) RawDB() *sql.DB {
	return m.DB.DB
}
