package persistence

import "context"

type Runtime struct {
	Config     DatabaseConfig
	Database   *Database
	Migrations *MigrationRunner
}

func NewRuntime(
	config DatabaseConfig,
	database *Database,
	migrations *MigrationRunner,
) *Runtime {
	return &Runtime{
		Config:     config,
		Database:   database,
		Migrations: migrations,
	}
}

func (r *Runtime) Start(
	ctx context.Context,
) error {
	if err := r.Database.Ping(ctx); err != nil {
		return err
	}

	return r.Migrations.Run(ctx)
}

func (r *Runtime) Stop(
	ctx context.Context,
) error {
	return r.Database.Close(ctx)
}
