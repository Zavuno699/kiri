package persistence

import (
	"context"
	"database/sql"
)

type TransactionScopeFactory struct {
	Database *Database
}

func NewTransactionScopeFactory(
	database *Database,
) *TransactionScopeFactory {
	return &TransactionScopeFactory{
		Database: database,
	}
}

func (f *TransactionScopeFactory) Begin(
	ctx context.Context,
) (*TransactionScope, error) {
	if f == nil || f.Database == nil || f.Database.DB == nil {
		return nil, sql.ErrConnDone
	}

	tx, err := f.Database.DB.BeginTx(
		ctx,
		&sql.TxOptions{
			Isolation: sql.LevelSerializable,
		},
	)
	if err != nil {
		return nil, err
	}

	return NewTransactionScope(tx), nil
}
