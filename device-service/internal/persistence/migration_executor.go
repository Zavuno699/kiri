package persistence

import (
	"context"
	"database/sql"
)

type MigrationExecutor struct {
	Database *Database
	State    *MigrationState
}

func NewMigrationExecutor(
	database *Database,
	state *MigrationState,
) *MigrationExecutor {
	return &MigrationExecutor{
		Database: database,
		State:    state,
	}
}

func (e *MigrationExecutor) Apply(
	ctx context.Context,
	migration ParsedMigration,
) error {
	if e == nil || e.Database == nil || e.Database.DB == nil {
		return nil
	}

	metadata := NewMigrationMetadata(
		migration.Version,
		migration.Description,
		migration.SQL,
	)

	applied, err := e.State.IsApplied(
		ctx,
		metadata.Version,
		metadata.Checksum,
	)
	if err != nil {
		return err
	}

	if applied {
		return nil
	}

	tx, err := e.Database.DB.BeginTx(
		ctx,
		&sql.TxOptions{},
	)
	if err != nil {
		return err
	}

	defer func() {
		_ = tx.Rollback()
	}()

	if _, err := tx.ExecContext(
		ctx,
		migration.SQL,
	); err != nil {
		return err
	}

	if _, err := tx.ExecContext(
		ctx,
		`INSERT INTO kiri_schema_migrations
		 (version, description, checksum, applied_at)
		 VALUES ($1, $2, $3, now())`,
		metadata.Version,
		metadata.Description,
		metadata.Checksum,
	); err != nil {
		return err
	}

	return tx.Commit()
}
