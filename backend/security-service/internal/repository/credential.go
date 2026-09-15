package repository

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"

	security "github.com/kirilock/backend/security-service/internal/security"
)

type CredentialRepository interface {
	Add(context.Context, security.Credential) error
	Get(context.Context, string) (security.Credential, bool)
	Remove(context.Context, string)
}

type DBCredentialRepository struct {
	db DB
}

type DB interface {
	Exec(context.Context, string, ...any) (pgconn.CommandTag, error)
	QueryRow(context.Context, string, ...any) pgx.Row
}

func NewDBCredentialRepository(db DB) (*DBCredentialRepository, error) {
	if db == nil {
		return nil, errors.New("database is required")
	}

	return &DBCredentialRepository{db: db}, nil
}

func (r *DBCredentialRepository) Add(
	ctx context.Context,
	credential security.Credential,
) error {
	if err := credential.Validate(); err != nil {
		return err
	}

	_, err := r.db.Exec(ctx, `
		INSERT INTO identity_credentials (
			id,
			subject_id,
			credential_type,
			fingerprint,
			state,
			issued_at,
			expires_at,
			created_at,
			updated_at,
			version
		)
		VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, $9, $10
		)
		ON CONFLICT (fingerprint) DO UPDATE SET
			state = EXCLUDED.state,
			expires_at = EXCLUDED.expires_at,
			updated_at = EXCLUDED.updated_at,
			version = EXCLUDED.version + 1
	`,
		uuid.MustParse(credential.ID),
		uuid.MustParse(credential.IdentityID),
		string(credential.Type),
		credential.Fingerprint,
		string(credential.State),
		credential.IssuedAt,
		credential.ExpiresAt,
		time.Now().UTC(),
		time.Now().UTC(),
		1,
	)

	return err
}

func (r *DBCredentialRepository) Get(
	ctx context.Context,
	fingerprint string,
) (security.Credential, bool) {
	var c security.Credential
	var id, identityID uuid.UUID
	var credType, state string
	var issuedAt, expiresAt time.Time

	err := r.db.QueryRow(ctx, `
		SELECT
			id,
			subject_id,
			credential_type,
			fingerprint,
			state,
			issued_at,
			expires_at
		FROM identity_credentials
		WHERE fingerprint = $1
		AND state = 'active'
	`, fingerprint).Scan(
		&id,
		&identityID,
		&credType,
		&c.Fingerprint,
		&state,
		&issuedAt,
		&expiresAt,
	)

	if errors.Is(err, pgx.ErrNoRows) {
		return security.Credential{}, false
	}
	if err != nil {
		return security.Credential{}, false
	}

	c.ID = id.String()
	c.IdentityID = identityID.String()
	c.Type = security.CredentialType(credType)
	c.State = security.CredentialState(state)
	c.IssuedAt = issuedAt
	c.ExpiresAt = expiresAt

	return c, true
}

func (r *DBCredentialRepository) Remove(
	ctx context.Context,
	fingerprint string,
) {
	_, _ = r.db.Exec(ctx, `
		UPDATE identity_credentials
		SET state = 'revoked',
		    updated_at = current_timestamp
		WHERE fingerprint = $1
	`, fingerprint)
}
