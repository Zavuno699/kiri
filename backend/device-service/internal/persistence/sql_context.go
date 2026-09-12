package persistence

import (
	"context"
	"database/sql"
)

func ExecContextSQL(
	ctx context.Context,
	db *sql.DB,
	query string,
	args ...any,
) (sql.Result, error) {
	if db == nil {
		return nil, sql.ErrConnDone
	}

	return db.ExecContext(
		ctx,
		RebindQuestionPlaceholders(query),
		args...,
	)
}

func QueryRowContextSQL(
	ctx context.Context,
	db *sql.DB,
	query string,
	args ...any,
) *sql.Row {
	if db == nil {
		return nil
	}

	return db.QueryRowContext(
		ctx,
		RebindQuestionPlaceholders(query),
		args...,
	)
}
