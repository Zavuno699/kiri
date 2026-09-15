package repository

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

type RevocationRepository interface {
	Revoke(context.Context, string, time.Time) error
	IsRevoked(context.Context, string, time.Time) bool
}

type DBRevocationRepository struct {
	db DB
}

func NewDBRevocationRepository(db DB) (*DBRevocationRepository, error) {
	if db == nil {
		return nil, errors.New("database is required")
	}

	return &DBRevocationRepository{db: db}, nil
}

func (r *DBRevocationRepository) Revoke(
	ctx context.Context,
	id string,
	revokedAt time.Time,
) error {
	if id == "" {
		return errors.New("id is required")
	}

	_, err := r.db.Exec(ctx, `
		INSERT INTO identity_credential_revocations (
			id,
			subject_id,
			credential_id,
			reason,
			revoked_at,
			created_at,
			updated_at,
			version
		)
		VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8
		)
		ON CONFLICT (id) DO UPDATE SET
			revoked_at = EXCLUDED.revoked_at,
			updated_at = EXCLUDED.updated_at,
			version = EXCLUDED.version + 1
	`,
		uuid.New(),
		id,
		nil,
		"revoked",
		revokedAt,
		time.Now().UTC(),
		time.Now().UTC(),
		1,
	)

	return err
}

func (r *DBRevocationRepository) IsRevoked(
	ctx context.Context,
	id string,
	now time.Time,
) bool {
	if id == "" {
		return false
	}

	var revokedAt time.Time
	var expiresAt *time.Time

	err := r.db.QueryRow(ctx, `
		SELECT revoked_at, expires_at
		FROM identity_credential_revocations
		WHERE subject_id = $1
		ORDER BY revoked_at DESC
		LIMIT 1
	`, id).Scan(
		&revokedAt,
		&expiresAt,
	)

	if errors.Is(err, pgx.ErrNoRows) {
		return false
	}
	if err != nil {
		return false
	}

	if expiresAt != nil && now.After(*expiresAt) {
		return false
	}

	return now.After(revokedAt) || now.Equal(revokedAt)
}
