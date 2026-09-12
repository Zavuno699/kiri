package persistence

import (
	"context"
	"time"
)

type PoolConfig struct {
	MaxOpenConns    int
	MaxIdleConns    int
	ConnMaxLifetime time.Duration
	ConnMaxIdleTime time.Duration
}

func DefaultPoolConfig() PoolConfig {
	return PoolConfig{
		MaxOpenConns:    25,
		MaxIdleConns:    10,
		ConnMaxLifetime: 30 * time.Minute,
		ConnMaxIdleTime: 5 * time.Minute,
	}
}

func ConfigurePool(
	database *Database,
	config PoolConfig,
) error {
	if database == nil || database.DB == nil {
		return nil
	}

	if config.MaxOpenConns > 0 {
		database.DB.SetMaxOpenConns(config.MaxOpenConns)
	}

	if config.MaxIdleConns >= 0 {
		database.DB.SetMaxIdleConns(config.MaxIdleConns)
	}

	if config.ConnMaxLifetime > 0 {
		database.DB.SetConnMaxLifetime(config.ConnMaxLifetime)
	}

	if config.ConnMaxIdleTime > 0 {
		database.DB.SetConnMaxIdleTime(config.ConnMaxIdleTime)
	}

	return database.Ping(context.Background())
}
