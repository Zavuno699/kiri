package persistence

import "context"

type MigrationLock struct {
	Database *Database
}

func NewMigrationLock(
	database *Database,
) *MigrationLock {
	return &MigrationLock{
		Database: database,
	}
}

func (l *MigrationLock) Acquire(
	ctx context.Context,
) error {
	if l == nil || l.Database == nil || l.Database.DB == nil {
		return nil
	}

	_, err := l.Database.DB.ExecContext(
		ctx,
		`SELECT pg_advisory_lock(91427631)`,
	)

	return err
}

func (l *MigrationLock) Release(
	ctx context.Context,
) error {
	if l == nil || l.Database == nil || l.Database.DB == nil {
		return nil
	}

	_, err := l.Database.DB.ExecContext(
		ctx,
		`SELECT pg_advisory_unlock(91427631)`,
	)

	return err
}
