package persistence

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
)

var ErrMigrationMismatch = errors.New("migration checksum mismatch")

type MigrationState struct {
	Database *Database
}

func NewMigrationState(
	database *Database,
) *MigrationState {
	return &MigrationState{
		Database: database,
	}
}

func (s *MigrationState) EnsureTable(
	ctx context.Context,
) error {
	if s == nil || s.Database == nil || s.Database.DB == nil {
		return nil
	}

	_, err := s.Database.DB.ExecContext(
		ctx,
		`
CREATE TABLE IF NOT EXISTS kiri_schema_migrations (
    version TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    checksum TEXT NOT NULL,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
`,
	)

	return err
}

func (s *MigrationState) IsApplied(
	ctx context.Context,
	version string,
	checksum string,
) (bool, error) {
	if s == nil || s.Database == nil || s.Database.DB == nil {
		return false, nil
	}

	var stored string

	err := s.Database.DB.QueryRowContext(
		ctx,
		`SELECT checksum
		 FROM kiri_schema_migrations
		 WHERE version = $1`,
		version,
	).Scan(&stored)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return false, nil
		}

		return false, err
	}

	if stored != checksum {
		return false, fmt.Errorf(
			"%w: version=%s",
			ErrMigrationMismatch,
			version,
		)
	}

	return true, nil
}

func (s *MigrationState) Record(
	ctx context.Context,
	metadata MigrationMetadata,
) error {
	if s == nil || s.Database == nil || s.Database.DB == nil {
		return nil
	}

	_, err := s.Database.DB.ExecContext(
		ctx,
		`INSERT INTO kiri_schema_migrations
		 (version, description, checksum, applied_at)
		 VALUES ($1, $2, $3, now())`,
		metadata.Version,
		metadata.Description,
		metadata.Checksum,
	)

	return err
}
