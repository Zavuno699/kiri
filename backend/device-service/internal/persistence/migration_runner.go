package persistence

import "context"

type MigrationRunner struct {
	Database *Database
}

func NewMigrationRunner(
	database *Database,
) *MigrationRunner {
	return &MigrationRunner{
		Database: database,
	}
}

func (r *MigrationRunner) Run(
	ctx context.Context,
) error {
	return ApplySchema(
		ctx,
		r.Database,
	)
}
