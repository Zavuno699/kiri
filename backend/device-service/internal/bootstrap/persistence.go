package bootstrap

import (
	"context"
	"time"

	"github.com/kirilock/backend/device-service/internal/persistence"
)

type PersistenceRuntime struct {
	Runtime *persistence.Runtime
}

func NewPersistenceRuntime(ctx context.Context, cfg Config) (*PersistenceRuntime, error) {
	if !cfg.DatabaseEnabled {
		return nil, nil
	}

	databaseConfig := persistence.NewDatabaseConfig(
		cfg.DatabaseDriver,
		cfg.DatabaseDSN,
	)

	connectionFactory := persistence.NewConnectionFactory()

	db, err := connectionFactory.Open(databaseConfig)
	if err != nil {
		return nil, err
	}

	if db == nil {
		return nil, context.Canceled
	}

	database := db

	productionDatabase := persistence.NewProductionDatabase(database)

	poolConfig := persistence.PoolConfig{
		MaxOpenConns:    cfg.DatabaseMaxOpen,
		MaxIdleConns:    cfg.DatabaseMaxIdle,
		ConnMaxLifetime: time.Duration(cfg.DatabaseMaxLifetime) * time.Minute,
		ConnMaxIdleTime: time.Duration(cfg.DatabaseMaxIdleTime) * time.Minute,
	}

	if err := persistence.ConfigurePool(database, poolConfig); err != nil {
		_ = productionDatabase.Stop(ctx)
		return nil, err
	}

	migrationRunner := persistence.NewMigrationRunner(database)

	runtime := persistence.NewRuntime(
		databaseConfig,
		database,
		migrationRunner,
	)

	if err := runtime.Start(ctx); err != nil {
		_ = productionDatabase.Stop(ctx)
		return nil, err
	}

	return &PersistenceRuntime{
		Runtime: runtime,
	}, nil
}

func (p *PersistenceRuntime) Close(ctx context.Context) error {
	if p == nil || p.Runtime == nil {
		return nil
	}

	return p.Runtime.Stop(ctx)
}
