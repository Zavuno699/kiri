package repository

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"

	"github.com/kirilock/backend/identity-service/internal/model"
)

var (
	ErrAdminInvitationNotFound = errors.New("admin invitation not found")
	ErrAdminInvitationExists   = errors.New("admin invitation already exists")
)

type AdminInvitationRepository interface {
	Create(ctx context.Context, invitation model.AdminInvitation) error
	GetByID(ctx context.Context, id uuid.UUID) (model.AdminInvitation, error)
	GetBySubjectID(ctx context.Context, subjectID uuid.UUID) (model.AdminInvitation, error)
	GetByTokenHash(ctx context.Context, tokenHash string) (model.AdminInvitation, error)
	Update(ctx context.Context, invitation model.AdminInvitation) error
	ListByStatus(ctx context.Context, status model.AdminInvitationStatus) ([]model.AdminInvitation, error)
	ListByInvitedBy(ctx context.Context, invitedBySubjectID uuid.UUID) ([]model.AdminInvitation, error)
	CountSuperAdmins(ctx context.Context) (int, error)
}

type DBAdminInvitationRepository struct {
	db DB
}

func NewDBAdminInvitationRepository(db DB) (*DBAdminInvitationRepository, error) {
	if db == nil {
		return nil, errors.New("database is required")
	}
	return &DBAdminInvitationRepository{db: db}, nil
}

func (r *DBAdminInvitationRepository) Create(ctx context.Context, invitation model.AdminInvitation) error {
	const query = `
		INSERT INTO admin_invitations (
			id, subject_id, invited_by_subject_id, intended_role, reason, department,
			invitation_token_hash, invitation_expires_at, status, single_use,
			created_at, updated_at, version
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
	`

	_, err := r.db.Exec(ctx, query,
		invitation.ID,
		invitation.SubjectID,
		invitation.InvitedBySubjectID,
		invitation.IntendedRole,
		invitation.Reason,
		invitation.Department,
		invitation.InvitationTokenHash,
		invitation.InvitationExpiresAt,
		invitation.Status,
		invitation.SingleUse,
		invitation.CreatedAt,
		invitation.UpdatedAt,
		invitation.Version,
	)
	return err
}

func (r *DBAdminInvitationRepository) GetByID(ctx context.Context, id uuid.UUID) (model.AdminInvitation, error) {
	const query = `
		SELECT id, subject_id, invited_by_subject_id, intended_role, reason, department,
		       invitation_token_hash, invitation_expires_at, status, single_use,
		       accepted_at, revoked_at, created_at, updated_at, version
		FROM admin_invitations
		WHERE id = $1
	`

	var invitation model.AdminInvitation
	err := r.db.QueryRow(ctx, query, id).Scan(
		&invitation.ID,
		&invitation.SubjectID,
		&invitation.InvitedBySubjectID,
		&invitation.IntendedRole,
		&invitation.Reason,
		&invitation.Department,
		&invitation.InvitationTokenHash,
		&invitation.InvitationExpiresAt,
		&invitation.Status,
		&invitation.SingleUse,
		&invitation.AcceptedAt,
		&invitation.RevokedAt,
		&invitation.CreatedAt,
		&invitation.UpdatedAt,
		&invitation.Version,
	)

	if err != nil {
		return model.AdminInvitation{}, ErrAdminInvitationNotFound
	}
	return invitation, nil
}

func (r *DBAdminInvitationRepository) GetBySubjectID(ctx context.Context, subjectID uuid.UUID) (model.AdminInvitation, error) {
	const query = `
		SELECT id, subject_id, invited_by_subject_id, intended_role, reason, department,
		       invitation_token_hash, invitation_expires_at, status, single_use,
		       accepted_at, revoked_at, created_at, updated_at, version
		FROM admin_invitations
		WHERE subject_id = $1
		ORDER BY created_at DESC
		LIMIT 1
	`

	var invitation model.AdminInvitation
	err := r.db.QueryRow(ctx, query, subjectID).Scan(
		&invitation.ID,
		&invitation.SubjectID,
		&invitation.InvitedBySubjectID,
		&invitation.IntendedRole,
		&invitation.Reason,
		&invitation.Department,
		&invitation.InvitationTokenHash,
		&invitation.InvitationExpiresAt,
		&invitation.Status,
		&invitation.SingleUse,
		&invitation.AcceptedAt,
		&invitation.RevokedAt,
		&invitation.CreatedAt,
		&invitation.UpdatedAt,
		&invitation.Version,
	)

	if err != nil {
		return model.AdminInvitation{}, ErrAdminInvitationNotFound
	}
	return invitation, nil
}

func (r *DBAdminInvitationRepository) GetByTokenHash(ctx context.Context, tokenHash string) (model.AdminInvitation, error) {
	const query = `
		SELECT id, subject_id, invited_by_subject_id, intended_role, reason, department,
		       invitation_token_hash, invitation_expires_at, status, single_use,
		       accepted_at, revoked_at, created_at, updated_at, version
		FROM admin_invitations
		WHERE invitation_token_hash = $1
		ORDER BY created_at DESC
		LIMIT 1
	`

	var invitation model.AdminInvitation
	err := r.db.QueryRow(ctx, query, tokenHash).Scan(
		&invitation.ID,
		&invitation.SubjectID,
		&invitation.InvitedBySubjectID,
		&invitation.IntendedRole,
		&invitation.Reason,
		&invitation.Department,
		&invitation.InvitationTokenHash,
		&invitation.InvitationExpiresAt,
		&invitation.Status,
		&invitation.SingleUse,
		&invitation.AcceptedAt,
		&invitation.RevokedAt,
		&invitation.CreatedAt,
		&invitation.UpdatedAt,
		&invitation.Version,
	)

	if err != nil {
		return model.AdminInvitation{}, ErrAdminInvitationNotFound
	}
	return invitation, nil
}

func (r *DBAdminInvitationRepository) Update(ctx context.Context, invitation model.AdminInvitation) error {
	const query = `
		UPDATE admin_invitations
		SET status = $2, accepted_at = $3, revoked_at = $4, updated_at = $5, version = version + 1
		WHERE id = $1
	`

	result, err := r.db.Exec(ctx, query,
		invitation.ID,
		invitation.Status,
		invitation.AcceptedAt,
		invitation.RevokedAt,
		invitation.UpdatedAt,
	)

	if err != nil {
		return err
	}

	rowsAffected := result.RowsAffected()
	if rowsAffected == 0 {
		return ErrAdminInvitationNotFound
	}

	return nil
}

func (r *DBAdminInvitationRepository) ListByStatus(ctx context.Context, status model.AdminInvitationStatus) ([]model.AdminInvitation, error) {
	const query = `
		SELECT id, subject_id, invited_by_subject_id, intended_role, reason, department,
		       invitation_token_hash, invitation_expires_at, status, single_use,
		       accepted_at, revoked_at, created_at, updated_at, version
		FROM admin_invitations
		WHERE status = $1
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query, status)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var invitations []model.AdminInvitation
	for rows.Next() {
		var invitation model.AdminInvitation
		err := rows.Scan(
			&invitation.ID,
			&invitation.SubjectID,
			&invitation.InvitedBySubjectID,
			&invitation.IntendedRole,
			&invitation.Reason,
			&invitation.Department,
			&invitation.InvitationTokenHash,
			&invitation.InvitationExpiresAt,
			&invitation.Status,
			&invitation.SingleUse,
			&invitation.AcceptedAt,
			&invitation.RevokedAt,
			&invitation.CreatedAt,
			&invitation.UpdatedAt,
			&invitation.Version,
		)
		if err != nil {
			return nil, err
		}
		invitations = append(invitations, invitation)
	}

	return invitations, nil
}

func (r *DBAdminInvitationRepository) ListByInvitedBy(ctx context.Context, invitedBySubjectID uuid.UUID) ([]model.AdminInvitation, error) {
	const query = `
		SELECT id, subject_id, invited_by_subject_id, intended_role, reason, department,
		       invitation_token_hash, invitation_expires_at, status, single_use,
		       accepted_at, revoked_at, created_at, updated_at, version
		FROM admin_invitations
		WHERE invited_by_subject_id = $1
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query, invitedBySubjectID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var invitations []model.AdminInvitation
	for rows.Next() {
		var invitation model.AdminInvitation
		err := rows.Scan(
			&invitation.ID,
			&invitation.SubjectID,
			&invitation.InvitedBySubjectID,
			&invitation.IntendedRole,
			&invitation.Reason,
			&invitation.Department,
			&invitation.InvitationTokenHash,
			&invitation.InvitationExpiresAt,
			&invitation.Status,
			&invitation.SingleUse,
			&invitation.AcceptedAt,
			&invitation.RevokedAt,
			&invitation.CreatedAt,
			&invitation.UpdatedAt,
			&invitation.Version,
		)
		if err != nil {
			return nil, err
		}
		invitations = append(invitations, invitation)
	}

	return invitations, nil
}

func (r *DBAdminInvitationRepository) CountSuperAdmins(ctx context.Context) (int, error) {
	const query = `SELECT COUNT(*) FROM identity_subjects WHERE is_super_admin = true`

	var count int
	err := r.db.QueryRow(ctx, query).Scan(&count)
	return count, err
}
