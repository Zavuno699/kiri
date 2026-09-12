package persistence

import "database/sql"

func ExecSQL(
	db *sql.DB,
	query string,
	args ...any,
) (sql.Result, error) {
	return db.Exec(
		RebindQuestionPlaceholders(query),
		args...,
	)
}

func QueryRowSQL(
	db *sql.DB,
	query string,
	args ...any,
) *sql.Row {
	return db.QueryRow(
		RebindQuestionPlaceholders(query),
		args...,
	)
}
