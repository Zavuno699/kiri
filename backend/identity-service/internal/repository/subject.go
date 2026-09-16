package repository

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"

	"github.com/kirilock/backend/identity-service/internal/model"
)

var (
	ErrSubjectNotFound = errors.New("subject not found")
	ErrSubjectExists   = errors.New("subject already exists")
)

type SubjectRepository interface {
	Create(context.Context, model.Subject) error
	GetByID(context.Context, uuid.UUID) (model.Subject, error)
	GetBySubjectID(context.Context, string) (model.Subject, error)
	GetByEmail(context.Context, string) (model.Subject, error)
	Update(context.Context, model.Subject) error
	UpdateRoles(context.Context, uuid.UUID, []string) error
	SetAdmin(context.Context, uuid.UUID, bool) error
	SetSuperAdmin(context.Context, uuid.UUID, bool) error
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

func (r *DBSubjectRepository) Begin(ctx context.Context) (pgx.Tx, error) {
	txdb, ok := r.db.(TxDB)
	if !ok {
		return nil, errors.New("database does not support transactions")
	}

	return txdb.Begin(ctx)
}

func (r *DBSubjectRepository) Create(
	ctx context.Context,
	subject model.Subject,
) error {
	if err := subject.Validate(); err != nil {
		return err
	}

	_, err := r.db.Exec(ctx, `
		INSERT INTO identity_subjects (
			id,
			subject_id,
			email,
			password_hash,
			roles,
			is_admin,
			is_super_admin,
			created_at,
			updated_at,
			version
		)
		VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, $9, $10
		)
	`,
		subject.ID,
		subject.SubjectID,
		subject.Email,
		subject.PasswordHash,
		subject.Roles,
		subject.IsAdmin,
		subject.IsSuperAdmin,
		subject.CreatedAt,
		subject.UpdatedAt,
		subject.Version,
	)

	if err != nil {
		if pgErr, ok := err.(*pgconn.PgError); ok {
			if pgErr.Code == "23505" {
				return ErrSubjectExists
			}
		}
		return err
	}

	return nil
}

func (r *DBSubjectRepository) Update(
	ctx context.Context,
	subject model.Subject,
) error {
	if err := subject.Validate(); err != nil {
		return err
	}

	result, err := r.db.Exec(ctx, `
		UPDATE identity_subjects
		SET
			email = $2,
			password_hash = $3,
			roles = $4,
			is_admin = $5,
			is_super_admin = $6,
			updated_at = $7,
			version = version + 1
		WHERE id = $1 AND version = $8
	`,
		subject.ID,
		subject.Email,
		subject.PasswordHash,
		subject.Roles,
		subject.IsAdmin,
		subject.IsSuperAdmin,
		subject.UpdatedAt,
		subject.Version,
	)

	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrSubjectNotFound
	}

	return nil
}

func (r *DBSubjectRepository) GetByID(
	ctx context.Context,
	id uuid.UUID,
) (model.Subject, error) {
	if id == uuid.Nil {
		return model.Subject{}, ErrSubjectNotFound
	}

	var s model.Subject

	err := r.db.QueryRow(ctx, `
		SELECT
			id,
			subject_id,
			email,
			password_hash,
			roles,
			is_admin,
			is_super_admin,
			created_at,
			updated_at,
			version
		FROM identity_subjects
		WHERE id = $1
	`, id).Scan(
		&s.ID,
		&s.SubjectID,
		&s.Email,
		&s.PasswordHash,
		&s.Roles,
		&s.IsAdmin,
		&s.IsSuperAdmin,
		&s.CreatedAt,
		&s.UpdatedAt,
		&s.Version,
	)

	if errors.Is(err, pgx.ErrNoRows) {
		return model.Subject{}, ErrSubjectNotFound
	}
	if err != nil {
		return model.Subject{}, err
	}

	if err := s.Validate(); err != nil {
		return model.Subject{}, err
	}

	return s, nil
}

func (r *DBSubjectRepository) GetBySubjectID(
	ctx context.Context,
	subjectID string,
) (model.Subject, error) {
	if subjectID == "" {
		return model.Subject{}, ErrSubjectNotFound
	}

	var s model.Subject

	err := r.db.QueryRow(ctx, `
		SELECT
			id,
			subject_id,
			email,
			password_hash,
			roles,
			is_admin,
			is_super_admin,
			created_at,
			updated_at,
			version
		FROM identity_subjects
		WHERE subject_id = $1
	`, subjectID).Scan(
		&s.ID,
		&s.SubjectID,
		&s.Email,
		&s.PasswordHash,
		&s.Roles,
		&s.IsAdmin,
		&s.IsSuperAdmin,
		&s.CreatedAt,
		&s.UpdatedAt,
		&s.Version,
	)

	if errors.Is(err, pgx.ErrNoRows) {
		return model.Subject{}, ErrSubjectNotFound
	}
	if err != nil {
		return model.Subject{}, err
	}

	if err := s.Validate(); err != nil {
		return model.Subject{}, err
	}

	return s, nil
}

func (r *DBSubjectRepository) GetByEmail(
	ctx context.Context,
	email string,
) (model.Subject, error) {
	if email == "" {
		return model.Subject{}, ErrSubjectNotFound
	}

	var s model.Subject

	err := r.db.QueryRow(ctx, `
		SELECT
			id,
			subject_id,
			email,
			password_hash,
			roles,
			is_admin,
			is_super_admin,
			created_at,
			updated_at,
			version
		FROM identity_subjects
		WHERE email = $1
	`, email).Scan(
		&s.ID,
		&s.SubjectID,
		&s.Email,
		&s.PasswordHash,
		&s.Roles,
		&s.IsAdmin,
		&s.IsSuperAdmin,
		&s.CreatedAt,
		&s.UpdatedAt,
		&s.Version,
	)

	if errors.Is(err, pgx.ErrNoRows) {
		return model.Subject{}, ErrSubjectNotFound
	}
	if err != nil {
		return model.Subject{}, err
	}

	if err := s.Validate(); err != nil {
		return model.Subject{}, err
	}

	return s, nil
}

func (r *DBSubjectRepository) UpdateRoles(
	ctx context.Context,
	id uuid.UUID,
	roles []string,
) error {
	if id == uuid.Nil {
		return ErrSubjectNotFound
	}

	result, err := r.db.Exec(ctx, `
		UPDATE identity_subjects
		SET
			roles = $1,
			updated_at = current_timestamp,
			version = version + 1
		WHERE id = $2
	`, roles, id)

	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrSubjectNotFound
	}

	return nil
}

func (r *DBSubjectRepository) SetAdmin(
	ctx context.Context,
	id uuid.UUID,
	isAdmin bool,
) error {
	if id == uuid.Nil {
		return ErrSubjectNotFound
	}

	result, err := r.db.Exec(ctx, `
		UPDATE identity_subjects
		SET
			is_admin = $1,
			updated_at = current_timestamp,
			version = version + 1
		WHERE id = $2
	`, isAdmin, id)

	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrSubjectNotFound
	}

	return nil
}

func (r *DBSubjectRepository) SetSuperAdmin(
	ctx context.Context,
	id uuid.UUID,
	isSuperAdmin bool,
) error {
	if id == uuid.Nil {
		return ErrSubjectNotFound
	}

	result, err := r.db.Exec(ctx, `
		UPDATE identity_subjects
		SET
			is_super_admin = $1,
			updated_at = current_timestamp,
			version = version + 1
		WHERE id = $2
	`, isSuperAdmin, id)

	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return ErrSubjectNotFound
	}

	return nil
}
