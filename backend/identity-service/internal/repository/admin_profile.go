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
	ErrAdminProfileNotFound = errors.New("admin profile not found")
)

type AdminProfileRepository interface {
	Create(ctx context.Context, profile model.AdminProfile) error
	GetByID(ctx context.Context, id uuid.UUID) (model.AdminProfile, error)
	GetBySubjectID(ctx context.Context, subjectID uuid.UUID) (model.AdminProfile, error)
	Update(ctx context.Context, profile model.AdminProfile) error
	ListByStatus(ctx context.Context, status model.AdminProfileStatus) ([]model.AdminProfile, error)
	ListByRole(ctx context.Context, role string) ([]model.AdminProfile, error)
	ListAll(ctx context.Context) ([]model.AdminProfile, error)
}

type DBAdminProfileRepository struct {
	db DB
}

func NewDBAdminProfileRepository(db DB) (*DBAdminProfileRepository, error) {
	if db == nil {
		return nil, errors.New("database is required")
	}
	return &DBAdminProfileRepository{db: db}, nil
}

func (r *DBAdminProfileRepository) Create(ctx context.Context, profile model.AdminProfile) error {
	const query = `
		INSERT INTO admin_profiles (
			id, subject_id, role, status, department, justification, vetting_notes,
			approved_by_subject_id, approved_at, rejected_by_subject_id, rejected_at, rejection_reason,
			suspended_by_subject_id, suspended_at, suspension_reason,
			reactivated_by_subject_id, reactivated_at,
			effective_from, effective_until, created_at, updated_at, version
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
	`

	_, err := r.db.Exec(ctx, query,
		profile.ID,
		profile.SubjectID,
		profile.Role,
		profile.Status,
		profile.Department,
		profile.Justification,
		profile.VettingNotes,
		profile.ApprovedBySubjectID,
		profile.ApprovedAt,
		profile.RejectedBySubjectID,
		profile.RejectedAt,
		profile.RejectionReason,
		profile.SuspendedBySubjectID,
		profile.SuspendedAt,
		profile.SuspensionReason,
		profile.ReactivatedBySubjectID,
		profile.ReactivatedAt,
		profile.EffectiveFrom,
		profile.EffectiveUntil,
		profile.CreatedAt,
		profile.UpdatedAt,
		profile.Version,
	)
	return err
}

func (r *DBAdminProfileRepository) GetByID(ctx context.Context, id uuid.UUID) (model.AdminProfile, error) {
	const query = `
		SELECT id, subject_id, role, status, department, justification, vetting_notes,
		       approved_by_subject_id, approved_at, rejected_by_subject_id, rejected_at, rejection_reason,
		       suspended_by_subject_id, suspended_at, suspension_reason,
		       reactivated_by_subject_id, reactivated_at,
		       effective_from, effective_until, created_at, updated_at, version
		FROM admin_profiles
		WHERE id = $1
	`

	var profile model.AdminProfile
	err := r.db.QueryRow(ctx, query, id).Scan(
		&profile.ID,
		&profile.SubjectID,
		&profile.Role,
		&profile.Status,
		&profile.Department,
		&profile.Justification,
		&profile.VettingNotes,
		&profile.ApprovedBySubjectID,
		&profile.ApprovedAt,
		&profile.RejectedBySubjectID,
		&profile.RejectedAt,
		&profile.RejectionReason,
		&profile.SuspendedBySubjectID,
		&profile.SuspendedAt,
		&profile.SuspensionReason,
		&profile.ReactivatedBySubjectID,
		&profile.ReactivatedAt,
		&profile.EffectiveFrom,
		&profile.EffectiveUntil,
		&profile.CreatedAt,
		&profile.UpdatedAt,
		&profile.Version,
	)

	if err != nil {
		return model.AdminProfile{}, ErrAdminProfileNotFound
	}
	return profile, nil
}

func (r *DBAdminProfileRepository) GetBySubjectID(ctx context.Context, subjectID uuid.UUID) (model.AdminProfile, error) {
	const query = `
		SELECT id, subject_id, role, status, department, justification, vetting_notes,
		       approved_by_subject_id, approved_at, rejected_by_subject_id, rejected_at, rejection_reason,
		       suspended_by_subject_id, suspended_at, suspension_reason,
		       reactivated_by_subject_id, reactivated_at,
		       effective_from, effective_until, created_at, updated_at, version
		FROM admin_profiles
		WHERE subject_id = $1
		ORDER BY created_at DESC
		LIMIT 1
	`

	var profile model.AdminProfile
	err := r.db.QueryRow(ctx, query, subjectID).Scan(
		&profile.ID,
		&profile.SubjectID,
		&profile.Role,
		&profile.Status,
		&profile.Department,
		&profile.Justification,
		&profile.VettingNotes,
		&profile.ApprovedBySubjectID,
		&profile.ApprovedAt,
		&profile.RejectedBySubjectID,
		&profile.RejectedAt,
		&profile.RejectionReason,
		&profile.SuspendedBySubjectID,
		&profile.SuspendedAt,
		&profile.SuspensionReason,
		&profile.ReactivatedBySubjectID,
		&profile.ReactivatedAt,
		&profile.EffectiveFrom,
		&profile.EffectiveUntil,
		&profile.CreatedAt,
		&profile.UpdatedAt,
		&profile.Version,
	)

	if err != nil {
		return model.AdminProfile{}, ErrAdminProfileNotFound
	}
	return profile, nil
}

func (r *DBAdminProfileRepository) Update(ctx context.Context, profile model.AdminProfile) error {
	const query = `
		UPDATE admin_profiles
		SET status = $2, vetting_notes = $3,
		    approved_by_subject_id = $4, approved_at = $5,
		    rejected_by_subject_id = $6, rejected_at = $7, rejection_reason = $8,
		    suspended_by_subject_id = $9, suspended_at = $10, suspension_reason = $11,
		    reactivated_by_subject_id = $12, reactivated_at = $13,
		    effective_until = $14, updated_at = $15, version = version + 1
		WHERE id = $1
	`

	result, err := r.db.Exec(ctx, query,
		profile.ID,
		profile.Status,
		profile.VettingNotes,
		profile.ApprovedBySubjectID,
		profile.ApprovedAt,
		profile.RejectedBySubjectID,
		profile.RejectedAt,
		profile.RejectionReason,
		profile.SuspendedBySubjectID,
		profile.SuspendedAt,
		profile.SuspensionReason,
		profile.ReactivatedBySubjectID,
		profile.ReactivatedAt,
		profile.EffectiveUntil,
		profile.UpdatedAt,
	)

	if err != nil {
		return err
	}

	rowsAffected := result.RowsAffected()
	if rowsAffected == 0 {
		return ErrAdminProfileNotFound
	}

	return nil
}

func (r *DBAdminProfileRepository) ListByStatus(ctx context.Context, status model.AdminProfileStatus) ([]model.AdminProfile, error) {
	const query = `
		SELECT id, subject_id, role, status, department, justification, vetting_notes,
		       approved_by_subject_id, approved_at, rejected_by_subject_id, rejected_at, rejection_reason,
		       suspended_by_subject_id, suspended_at, suspension_reason,
		       reactivated_by_subject_id, reactivated_at,
		       effective_from, effective_until, created_at, updated_at, version
		FROM admin_profiles
		WHERE status = $1
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query, status)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var profiles []model.AdminProfile
	for rows.Next() {
		var profile model.AdminProfile
		err := rows.Scan(
			&profile.ID,
			&profile.SubjectID,
			&profile.Role,
			&profile.Status,
			&profile.Department,
			&profile.Justification,
			&profile.VettingNotes,
			&profile.ApprovedBySubjectID,
			&profile.ApprovedAt,
			&profile.RejectedBySubjectID,
			&profile.RejectedAt,
			&profile.RejectionReason,
			&profile.SuspendedBySubjectID,
			&profile.SuspendedAt,
			&profile.SuspensionReason,
			&profile.ReactivatedBySubjectID,
			&profile.ReactivatedAt,
			&profile.EffectiveFrom,
			&profile.EffectiveUntil,
			&profile.CreatedAt,
			&profile.UpdatedAt,
			&profile.Version,
		)
		if err != nil {
			return nil, err
		}
		profiles = append(profiles, profile)
	}

	return profiles, nil
}

func (r *DBAdminProfileRepository) ListByRole(ctx context.Context, role string) ([]model.AdminProfile, error) {
	const query = `
		SELECT id, subject_id, role, status, department, justification, vetting_notes,
		       approved_by_subject_id, approved_at, rejected_by_subject_id, rejected_at, rejection_reason,
		       suspended_by_subject_id, suspended_at, suspension_reason,
		       reactivated_by_subject_id, reactivated_at,
		       effective_from, effective_until, created_at, updated_at, version
		FROM admin_profiles
		WHERE role = $1
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query, role)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var profiles []model.AdminProfile
	for rows.Next() {
		var profile model.AdminProfile
		err := rows.Scan(
			&profile.ID,
			&profile.SubjectID,
			&profile.Role,
			&profile.Status,
			&profile.Department,
			&profile.Justification,
			&profile.VettingNotes,
			&profile.ApprovedBySubjectID,
			&profile.ApprovedAt,
			&profile.RejectedBySubjectID,
			&profile.RejectedAt,
			&profile.RejectionReason,
			&profile.SuspendedBySubjectID,
			&profile.SuspendedAt,
			&profile.SuspensionReason,
			&profile.ReactivatedBySubjectID,
			&profile.ReactivatedAt,
			&profile.EffectiveFrom,
			&profile.EffectiveUntil,
			&profile.CreatedAt,
			&profile.UpdatedAt,
			&profile.Version,
		)
		if err != nil {
			return nil, err
		}
		profiles = append(profiles, profile)
	}

	return profiles, nil
}

func (r *DBAdminProfileRepository) ListAll(ctx context.Context) ([]model.AdminProfile, error) {
	const query = `
		SELECT id, subject_id, role, status, department, justification, vetting_notes,
		       approved_by_subject_id, approved_at, rejected_by_subject_id, rejected_at, rejection_reason,
		       suspended_by_subject_id, suspended_at, suspension_reason,
		       reactivated_by_subject_id, reactivated_at,
		       effective_from, effective_until, created_at, updated_at, version
		FROM admin_profiles
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var profiles []model.AdminProfile
	for rows.Next() {
		var profile model.AdminProfile
		err := rows.Scan(
			&profile.ID,
			&profile.SubjectID,
			&profile.Role,
			&profile.Status,
			&profile.Department,
			&profile.Justification,
			&profile.VettingNotes,
			&profile.ApprovedBySubjectID,
			&profile.ApprovedAt,
			&profile.RejectedBySubjectID,
			&profile.RejectedAt,
			&profile.RejectionReason,
			&profile.SuspendedBySubjectID,
			&profile.SuspendedAt,
			&profile.SuspensionReason,
			&profile.ReactivatedBySubjectID,
			&profile.ReactivatedAt,
			&profile.EffectiveFrom,
			&profile.EffectiveUntil,
			&profile.CreatedAt,
			&profile.UpdatedAt,
			&profile.Version,
		)
		if err != nil {
			return nil, err
		}
		profiles = append(profiles, profile)
	}

	return profiles, nil
}
