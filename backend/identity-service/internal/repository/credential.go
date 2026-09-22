package repository

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

type CredentialRepository interface {
	Create(context.Context, Credential) error
	GetByFingerprint(context.Context, string) (Credential, error)
	Revoke(context.Context, string, string, time.Time) error
	// Transactional method
	CreateTx(pgx.Tx, Credential) error
}

type Credential struct {
	ID          string
	SubjectID   string
	Type        string
	Fingerprint string
	State       string
	IssuedAt    time.Time
	ExpiresAt   time.Time
}

type DBCredentialRepository struct {
	db DB
}

func NewDBCredentialRepository(db DB) (*DBCredentialRepository, error) {
	if db == nil {
		return nil, errors.New("database is required")
	}

	return &DBCredentialRepository{db: db}, nil
}

func (r *DBCredentialRepository) Begin(ctx context.Context) (pgx.Tx, error) {
	txdb, ok := r.db.(TxDB)
	if !ok {
		return nil, errors.New("database does not support transactions")
	}

	return txdb.Begin(ctx)
}

func (r *DBCredentialRepository) Create(
	ctx context.Context,
	credential Credential,
) error {
	if credential.ID == "" {
		return errors.New("id is required")
	}
	if credential.SubjectID == "" {
		return errors.New("subject_id is required")
	}
	if credential.Fingerprint == "" {
		return errors.New("fingerprint is required")
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
	`,
		uuid.MustParse(credential.ID),
		uuid.MustParse(credential.SubjectID),
		credential.Type,
		credential.Fingerprint,
		credential.State,
		credential.IssuedAt,
		credential.ExpiresAt,
		time.Now().UTC(),
		time.Now().UTC(),
		1,
	)

	return err
}

func (r *DBCredentialRepository) CreateTx(
	tx pgx.Tx,
	credential Credential,
) error {
	if credential.ID == "" {
		return errors.New("id is required")
	}
	if credential.SubjectID == "" {
		return errors.New("subject_id is required")
	}
	if credential.Fingerprint == "" {
		return errors.New("fingerprint is required")
	}

	_, err := tx.Exec(context.Background(), `
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
	`,
		uuid.MustParse(credential.ID),
		uuid.MustParse(credential.SubjectID),
		credential.Type,
		credential.Fingerprint,
		credential.State,
		credential.IssuedAt,
		credential.ExpiresAt,
		time.Now().UTC(),
		time.Now().UTC(),
		1,
	)

	return err
}

func (r *DBCredentialRepository) GetByFingerprint(
	ctx context.Context,
	fingerprint string,
) (Credential, error) {
	if fingerprint == "" {
		return Credential{}, errors.New("fingerprint is required")
	}

	var c Credential
	var id, subjectID uuid.UUID
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
		&subjectID,
		&credType,
		&c.Fingerprint,
		&state,
		&issuedAt,
		&expiresAt,
	)

	if errors.Is(err, pgx.ErrNoRows) {
		return Credential{}, errors.New("credential not found")
	}
	if err != nil {
		return Credential{}, err
	}

	c.ID = id.String()
	c.SubjectID = subjectID.String()
	c.Type = credType
	c.State = state
	c.IssuedAt = issuedAt
	c.ExpiresAt = expiresAt

	return c, nil
}

func (r *DBCredentialRepository) Revoke(
	ctx context.Context,
	subjectID string,
	credentialID string,
	revokedAt time.Time,
) error {
	if subjectID == "" {
		return errors.New("subject_id is required")
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
	`,
		uuid.New(),
		subjectID,
		nil,
		"revoked",
		revokedAt,
		time.Now().UTC(),
		time.Now().UTC(),
		1,
	)

	return err
}
