package repository

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"

	security "github.com/kirilock/backend/security-service/internal/security"
)

type SubjectRepository interface {
	GetBySubjectID(context.Context, string) (security.Subject, error)
}

type DBSubjectRepository struct {
	db DB
}

func NewDBSubjectRepository(db DB) (*DBSubjectRepository, error) {
	if db == nil {
		return nil, errors.New("database is required")
	}

	return &DBSubjectRepository{db: db}, nil
}

func (r *DBSubjectRepository) GetBySubjectID(
	ctx context.Context,
	subjectID string,
) (security.Subject, error) {
	if subjectID == "" {
		return security.Subject{}, errors.New("subject_id is required")
	}

	var s security.Subject
	var id uuid.UUID

	err := r.db.QueryRow(ctx, `
		SELECT
			id,
			subject_id,
			email,
			roles,
			is_admin,
			is_super_admin
		FROM identity_subjects
		WHERE subject_id = $1
	`, subjectID).Scan(
		&id,
		&s.SubjectID,
		&s.Email,
		&s.Roles,
		&s.IsAdmin,
		&s.IsSuperAdmin,
	)

	if errors.Is(err, pgx.ErrNoRows) {
		return security.Subject{}, errors.New("subject not found")
	}
	if err != nil {
		return security.Subject{}, err
	}

	s.ID = id.String()

	return s, nil
}
