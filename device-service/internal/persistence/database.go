package persistence

import (
	"context"
	"database/sql"
)

type Database struct {
	DB *sql.DB
}

func NewDatabase(
	db *sql.DB,
) *Database {
	return &Database{
		DB: db,
	}
}

func (d *Database) Ping(
	ctx context.Context,
) error {
	return d.DB.PingContext(ctx)
}

func (d *Database) Close(
	context.Context,
) error {
	return d.DB.Close()
}
