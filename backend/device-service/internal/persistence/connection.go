package persistence

import (
	"context"
	"database/sql"
	"errors"
)

type ConnectionFactory struct{}

func NewConnectionFactory() *ConnectionFactory {
	return &ConnectionFactory{}
}

func (f *ConnectionFactory) Open(
	config DatabaseConfig,
) (*Database, error) {
	if config.Driver == "" {
		return nil, errors.New("database driver is required")
	}

	if config.DSN == "" {
		return nil, errors.New("database DSN is required")
	}

	db, err := sql.Open(
		config.Driver,
		config.DSN,
	)
	if err != nil {
		return nil, err
	}

	return NewDatabase(db), nil
}

func (f *ConnectionFactory) OpenAndPing(
	ctx context.Context,
	config DatabaseConfig,
) (*Database, error) {
	db, err := f.Open(config)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(ctx); err != nil {
		_ = db.Close(ctx)
		return nil, err
	}

	return db, nil
}
