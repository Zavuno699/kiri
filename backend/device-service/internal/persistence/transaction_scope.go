package persistence

import (
	"context"
	"database/sql"
)

type TransactionScope struct {
	Tx        *sql.Tx
	Lifecycle *TransactionLifecycle
}

func NewTransactionScope(
	tx *sql.Tx,
) *TransactionScope {
	scope := &TransactionScope{
		Tx:        tx,
		Lifecycle: NewTransactionLifecycle(),
	}

	scope.Lifecycle.Activate()

	return scope
}

func (s *TransactionScope) Commit() error {
	if s == nil || s.Tx == nil {
		return nil
	}

	err := s.Tx.Commit()

	if err != nil {
		s.Lifecycle.Rollback()
		return err
	}

	s.Lifecycle.Commit()

	return nil
}

func (s *TransactionScope) Rollback(
	ctx context.Context,
) error {
	_ = ctx

	if s == nil || s.Tx == nil {
		return nil
	}

	err := s.Tx.Rollback()

	s.Lifecycle.Rollback()

	return err
}

func (s *TransactionScope) State() TransactionState {
	if s == nil {
		return TransactionStateCreated
	}

	return s.Lifecycle.State()
}
