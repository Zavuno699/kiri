package repository

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

type SessionRepository interface {
	Create(context.Context, Session) error
	GetBySessionID(context.Context, string) (Session, error)
	GetByRevocationID(context.Context, string) (Session, error)
	Revoke(context.Context, string, time.Time) error
	RevokeBySubjectID(context.Context, string, time.Time) error
}

type Session struct {
	ID           string
	SubjectID    string
	CredentialID string
	SessionID    string
	RevocationID string
	IssuedAt     time.Time
	ExpiresAt    time.Time
}

type DBSessionRepository struct {
	db DB
}

func NewDBSessionRepository(db DB) (*DBSessionRepository, error) {
	if db == nil {
		return nil, errors.New("database is required")
	}

	return &DBSessionRepository{db: db}, nil
}

func (r *DBSessionRepository) Create(
	ctx context.Context,
	session Session,
) error {
	if session.ID == "" {
		return errors.New("id is required")
	}
	if session.SubjectID == "" {
		return errors.New("subject_id is required")
	}
	if session.SessionID == "" {
		return errors.New("session_id is required")
	}
	if session.RevocationID == "" {
		return errors.New("revocation_id is required")
	}

	_, err := r.db.Exec(ctx, `
		INSERT INTO identity_sessions (
			id,
			subject_id,
			credential_id,
			session_id,
			revocation_id,
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
		uuid.MustParse(session.ID),
		uuid.MustParse(session.SubjectID),
		uuid.MustParse(session.CredentialID),
		session.SessionID,
		session.RevocationID,
		session.IssuedAt,
		session.ExpiresAt,
		time.Now().UTC(),
		time.Now().UTC(),
		1,
	)

	return err
}

func (r *DBSessionRepository) GetBySessionID(
	ctx context.Context,
	sessionID string,
) (Session, error) {
	if sessionID == "" {
		return Session{}, errors.New("session_id is required")
	}

	var s Session
	var id, subjectID, credentialID uuid.UUID
	var issuedAt, expiresAt time.Time

	err := r.db.QueryRow(ctx, `
		SELECT
			id,
			subject_id,
			credential_id,
			session_id,
			revocation_id,
			issued_at,
			expires_at
		FROM identity_sessions
		WHERE session_id = $1
	`, sessionID).Scan(
		&id,
		&subjectID,
		&credentialID,
		&s.SessionID,
		&s.RevocationID,
		&issuedAt,
		&expiresAt,
	)

	if errors.Is(err, pgx.ErrNoRows) {
		return Session{}, errors.New("session not found")
	}
	if err != nil {
		return Session{}, err
	}

	s.ID = id.String()
	s.SubjectID = subjectID.String()
	s.CredentialID = credentialID.String()
	s.IssuedAt = issuedAt
	s.ExpiresAt = expiresAt

	return s, nil
}

func (r *DBSessionRepository) GetByRevocationID(
	ctx context.Context,
	revocationID string,
) (Session, error) {
	if revocationID == "" {
		return Session{}, errors.New("revocation_id is required")
	}

	var s Session
	var id, subjectID, credentialID uuid.UUID
	var issuedAt, expiresAt time.Time

	err := r.db.QueryRow(ctx, `
		SELECT
			id,
			subject_id,
			credential_id,
			session_id,
			revocation_id,
			issued_at,
			expires_at
		FROM identity_sessions
		WHERE revocation_id = $1
	`, revocationID).Scan(
		&id,
		&subjectID,
		&credentialID,
		&s.SessionID,
		&s.RevocationID,
		&issuedAt,
		&expiresAt,
	)

	if errors.Is(err, pgx.ErrNoRows) {
		return Session{}, errors.New("session not found")
	}
	if err != nil {
		return Session{}, err
	}

	s.ID = id.String()
	s.SubjectID = subjectID.String()
	s.CredentialID = credentialID.String()
	s.IssuedAt = issuedAt
	s.ExpiresAt = expiresAt

	return s, nil
}

func (r *DBSessionRepository) Revoke(
	ctx context.Context,
	sessionID string,
	revokedAt time.Time,
) error {
	if sessionID == "" {
		return errors.New("session_id is required")
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
		SELECT
			$1,
			subject_id,
			credential_id,
			'session_revoked',
			$2,
			current_timestamp,
			current_timestamp,
			1
		FROM identity_sessions
\tWHERE session_id = $3
	`,
		uuid.New(),
		revokedAt,
		sessionID,
	)

	return err
}

func (r *DBSessionRepository) RevokeBySubjectID(
	ctx context.Context,
	subjectID string,
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
		SELECT
			uuid_generate_v4(),
			subject_id,
			credential_id,
			'subject_revoked',
			$1,
			current_timestamp,
			current_timestamp,
			1
		FROM identity_sessions
		WHERE subject_id = $2
	`,
		revokedAt,
		subjectID,
	)

	return err
}
