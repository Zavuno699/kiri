package persistence

import (
	"database/sql"

	_ "github.com/jackc/pgx/v5/stdlib"
)

const DefaultDatabaseDriver = "pgx"

func OpenSQLDatabase(
	driver string,
	dsn string,
) (*sql.DB, error) {
	if driver == "" {
		driver = DefaultDatabaseDriver
	}

	return sql.Open(driver, dsn)
}
