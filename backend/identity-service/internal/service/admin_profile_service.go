package service

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/identity-service/internal/model"
	"github.com/kirilock/backend/identity-service/internal/repository"
)

var (
	ErrAdminProfileInvalidTransition = errors.New("invalid admin profile status transition")
	ErrUnauthorizedAdminAction       = errors.New("only super admin can perform this action")
	ErrAuditAdminPrivilegeRequired   = errors.New("audit_admin privilege required")
)

type AdminProfileService struct {
	profileRepo repository.AdminProfileRepository
	subjectRepo repository.SubjectRepository
	sessionRepo repository.SessionRepository
	auditRepo   repository.AuditRepository
	txDB        repository.TxDB
}

func NewAdminProfileService(
	profileRepo repository.AdminProfileRepository,
	subjectRepo repository.SubjectRepository,
	sessionRepo repository.SessionRepository,
	auditRepo repository.AuditRepository,
	txDB repository.TxDB,
) (*AdminProfileService, error) {
	if profileRepo == nil {
		return nil, errors.New("profile repository is required")
	}
	if subjectRepo == nil {
		return nil, errors.New("subject repository is required")
	}
	if sessionRepo == nil {
		return nil, errors.New("session repository is required")
	}
	if auditRepo == nil {
		return nil, errors.New("audit repository is required")
	}
	if txDB == nil {
		return nil, errors.New("transaction database is required")
	}

	return &AdminProfileService{
		profileRepo: profileRepo,
		subjectRepo: subjectRepo,
		sessionRepo: sessionRepo,
		auditRepo:   auditRepo,
		txDB:        txDB,
	}, nil
}

func (s *AdminProfileService) ListAll(ctx context.Context) ([]model.AdminProfile, error) {
	return s.profileRepo.ListAll(ctx)
}

func (s *AdminProfileService) validateStatusTransition(current, target model.AdminProfileStatus) error {
	validTransitions := map[model.AdminProfileStatus][]model.AdminProfileStatus{
		model.AdminProfileProfileCompleted: {model.AdminProfileVettingPending},
		model.AdminProfileVettingPending:   {model.AdminProfileUnderReview, model.AdminProfileRejected},
		model.AdminProfileUnderReview:      {model.AdminProfileApproved, model.AdminProfileRejected},
		model.AdminProfileApproved:         {model.AdminProfileActive},
		model.AdminProfileActive:           {model.AdminProfileSuspended, model.AdminProfileRevoked},
		model.AdminProfileSuspended:        {model.AdminProfileActive, model.AdminProfileRevoked},
		model.AdminProfileRejected:         {}, // Terminal state
		model.AdminProfileRevoked:          {}, // Terminal state
	}

	allowed, ok := validTransitions[current]
	if !ok {
		return fmt.Errorf("invalid current status: %s", current)
	}

	for _, valid := range allowed {
		if valid == target {
			return nil
		}
	}

	return ErrAdminProfileInvalidTransition
}

func (s *AdminProfileService) CreateProfile(
	ctx context.Context,
	subjectID uuid.UUID,
	role string,
	department string,
	justification string,
) (model.AdminProfile, error) {
	// Create profile in transaction
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return model.AdminProfile{}, fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback(ctx)

	profile := model.AdminProfile{
		ID:            uuid.New(),
		SubjectID:     subjectID,
		Role:          role,
		Status:        model.AdminProfileProfileCompleted,
		Department:    department,
		Justification: justification,
		EffectiveFrom: time.Now().UTC(),
		CreatedAt:     time.Now().UTC(),
		UpdatedAt:     time.Now().UTC(),
		Version:       1,
	}

	if err := s.profileRepo.Create(ctx, profile); err != nil {
		return model.AdminProfile{}, fmt.Errorf("failed to create profile: %w", err)
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"action":  "admin_profile_created",
		"subject": subjectID.String(),
		"role":    role,
		"result":  "success",
	}
	if err := s.auditRepo.LogAdminAction(ctx, "admin_profile_created", "profile", &profile.ID, subjectID, auditEvent); err != nil {
		fmt.Printf("WARNING: failed to log audit event: %v\n", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return model.AdminProfile{}, fmt.Errorf("failed to commit transaction: %w", err)
	}

	return profile, nil
}

func (s *AdminProfileService) SubmitForVetting(
	ctx context.Context,
	actorID uuid.UUID,
	subjectID uuid.UUID,
) error {
	// Verify actor is super admin
	actor, err := s.subjectRepo.GetByID(ctx, actorID)
	if err != nil {
		return fmt.Errorf("failed to get actor: %w", err)
	}
	if !actor.IsSuperAdmin {
		return ErrUnauthorizedAdminAction
	}

	// Get current profile
	profile, err := s.profileRepo.GetBySubjectID(ctx, subjectID)
	if err != nil {
		return fmt.Errorf("failed to get profile: %w", err)
	}

	// Validate transition
	if err := s.validateStatusTransition(profile.Status, model.AdminProfileVettingPending); err != nil {
		return err
	}

	// Update in transaction
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback(ctx)

	profile.Status = model.AdminProfileVettingPending
	profile.UpdatedAt = time.Now().UTC()

	if err := s.profileRepo.Update(ctx, profile); err != nil {
		return fmt.Errorf("failed to update profile: %w", err)
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id": actorID.String(),
		"action":   "admin_profile_submitted_for_vetting",
		"subject":  subjectID.String(),
		"result":   "success",
	}
	if err := s.auditRepo.LogAdminAction(ctx, "admin_profile_submitted_for_vetting", "profile", &profile.ID, actorID, auditEvent); err != nil {
		fmt.Printf("WARNING: failed to log audit event: %v\n", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	return nil
}

func (s *AdminProfileService) Approve(
	ctx context.Context,
	actorID uuid.UUID,
	subjectID uuid.UUID,
	vettingNotes string,
) error {
	// Verify actor is super admin
	actor, err := s.subjectRepo.GetByID(ctx, actorID)
	if err != nil {
		return fmt.Errorf("failed to get actor: %w", err)
	}
	if !actor.IsSuperAdmin {
		return ErrUnauthorizedAdminAction
	}

	// Get current profile
	profile, err := s.profileRepo.GetBySubjectID(ctx, subjectID)
	if err != nil {
		return fmt.Errorf("failed to get profile: %w", err)
	}

	// Validate transition
	if err := s.validateStatusTransition(profile.Status, model.AdminProfileApproved); err != nil {
		return err
	}

	// Update in transaction
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback(ctx)

	now := time.Now().UTC()
	profile.Status = model.AdminProfileApproved
	profile.VettingNotes = vettingNotes
	profile.ApprovedBySubjectID = &actorID
	profile.ApprovedAt = &now
	profile.UpdatedAt = now

	if err := s.profileRepo.Update(ctx, profile); err != nil {
		return fmt.Errorf("failed to update profile: %w", err)
	}

	// Grant role to subject
	if err := s.subjectRepo.UpdateRoles(ctx, subjectID, []string{profile.Role}); err != nil {
		return fmt.Errorf("failed to update subject roles: %w", err)
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":      actorID.String(),
		"action":        "admin_profile_approved",
		"subject":       subjectID.String(),
		"role":          profile.Role,
		"vetting_notes": vettingNotes,
		"result":        "success",
	}
	if err := s.auditRepo.LogAdminAction(ctx, "admin_profile_approved", "profile", &profile.ID, actorID, auditEvent); err != nil {
		fmt.Printf("WARNING: failed to log audit event: %v\n", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	return nil
}

func (s *AdminProfileService) Activate(
	ctx context.Context,
	actorID uuid.UUID,
	subjectID uuid.UUID,
) error {
	// Verify actor is super admin
	actor, err := s.subjectRepo.GetByID(ctx, actorID)
	if err != nil {
		return fmt.Errorf("failed to get actor: %w", err)
	}
	if !actor.IsSuperAdmin {
		return ErrUnauthorizedAdminAction
	}

	// Get current profile
	profile, err := s.profileRepo.GetBySubjectID(ctx, subjectID)
	if err != nil {
		return fmt.Errorf("failed to get profile: %w", err)
	}

	// Validate transition
	if err := s.validateStatusTransition(profile.Status, model.AdminProfileActive); err != nil {
		return err
	}

	// Update in transaction
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback(ctx)

	profile.Status = model.AdminProfileActive
	profile.UpdatedAt = time.Now().UTC()

	if err := s.profileRepo.Update(ctx, profile); err != nil {
		return fmt.Errorf("failed to update profile: %w", err)
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id": actorID.String(),
		"action":   "admin_profile_activated",
		"subject":  subjectID.String(),
		"role":     profile.Role,
		"result":   "success",
	}
	if err := s.auditRepo.LogAdminAction(ctx, "admin_profile_activated", "profile", &profile.ID, actorID, auditEvent); err != nil {
		fmt.Printf("WARNING: failed to log audit event: %v\n", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	return nil
}

func (s *AdminProfileService) Reject(
	ctx context.Context,
	actorID uuid.UUID,
	subjectID uuid.UUID,
	reason string,
) error {
	// Verify actor is super admin
	actor, err := s.subjectRepo.GetByID(ctx, actorID)
	if err != nil {
		return fmt.Errorf("failed to get actor: %w", err)
	}
	if !actor.IsSuperAdmin {
		return ErrUnauthorizedAdminAction
	}

	// Get current profile
	profile, err := s.profileRepo.GetBySubjectID(ctx, subjectID)
	if err != nil {
		return fmt.Errorf("failed to get profile: %w", err)
	}

	// Validate transition (can reject from VETTING_PENDING or UNDER_REVIEW)
	if profile.Status != model.AdminProfileVettingPending && profile.Status != model.AdminProfileUnderReview {
		return ErrAdminProfileInvalidTransition
	}

	// Update in transaction
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback(ctx)

	now := time.Now().UTC()
	profile.Status = model.AdminProfileRejected
	profile.RejectionReason = reason
	profile.RejectedBySubjectID = &actorID
	profile.RejectedAt = &now
	profile.UpdatedAt = now

	if err := s.profileRepo.Update(ctx, profile); err != nil {
		return fmt.Errorf("failed to update profile: %w", err)
	}

	// Revoke subject roles
	if err := s.subjectRepo.UpdateRoles(ctx, subjectID, []string{}); err != nil {
		return fmt.Errorf("failed to revoke subject roles: %w", err)
	}

	// Revoke sessions
	if err := s.sessionRepo.RevokeBySubjectID(ctx, subjectID.String(), time.Now().UTC()); err != nil {
		fmt.Printf("WARNING: failed to revoke sessions: %v\n", err)
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":         actorID.String(),
		"action":           "admin_profile_rejected",
		"subject":          subjectID.String(),
		"rejection_reason": reason,
		"result":           "success",
	}
	if err := s.auditRepo.LogAdminAction(ctx, "admin_profile_rejected", "profile", &profile.ID, actorID, auditEvent); err != nil {
		fmt.Printf("WARNING: failed to log audit event: %v\n", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	return nil
}

func (s *AdminProfileService) Suspend(
	ctx context.Context,
	actorID uuid.UUID,
	subjectID uuid.UUID,
	reason string,
) error {
	// Verify actor is super admin
	actor, err := s.subjectRepo.GetByID(ctx, actorID)
	if err != nil {
		return fmt.Errorf("failed to get actor: %w", err)
	}
	if !actor.IsSuperAdmin {
		return ErrUnauthorizedAdminAction
	}

	// Get current profile
	profile, err := s.profileRepo.GetBySubjectID(ctx, subjectID)
	if err != nil {
		return fmt.Errorf("failed to get profile: %w", err)
	}

	// Must be active to suspend
	if !profile.IsActive() {
		return errors.New("can only suspend active admin profiles")
	}

	// Update in transaction
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback(ctx)

	now := time.Now().UTC()
	profile.Status = model.AdminProfileSuspended
	profile.SuspensionReason = reason
	profile.SuspendedBySubjectID = &actorID
	profile.SuspendedAt = &now
	profile.UpdatedAt = now

	if err := s.profileRepo.Update(ctx, profile); err != nil {
		return fmt.Errorf("failed to update profile: %w", err)
	}

	// Revoke sessions
	if err := s.sessionRepo.RevokeBySubjectID(ctx, subjectID.String(), time.Now().UTC()); err != nil {
		fmt.Printf("WARNING: failed to revoke sessions: %v\n", err)
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":          actorID.String(),
		"action":            "admin_profile_suspended",
		"subject":           subjectID.String(),
		"suspension_reason": reason,
		"result":            "success",
	}
	if err := s.auditRepo.LogAdminAction(ctx, "admin_profile_suspended", "profile", &profile.ID, actorID, auditEvent); err != nil {
		fmt.Printf("WARNING: failed to log audit event: %v\n", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	return nil
}

func (s *AdminProfileService) Reactivate(
	ctx context.Context,
	actorID uuid.UUID,
	subjectID uuid.UUID,
) error {
	// Verify actor is super admin
	actor, err := s.subjectRepo.GetByID(ctx, actorID)
	if err != nil {
		return fmt.Errorf("failed to get actor: %w", err)
	}
	if !actor.IsSuperAdmin {
		return ErrUnauthorizedAdminAction
	}

	// Get current profile
	profile, err := s.profileRepo.GetBySubjectID(ctx, subjectID)
	if err != nil {
		return fmt.Errorf("failed to get profile: %w", err)
	}

	// Must be suspended to reactivate
	if !profile.IsSuspended() {
		return errors.New("can only reactivate suspended admin profiles")
	}

	// Update in transaction
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback(ctx)

	now := time.Now().UTC()
	profile.Status = model.AdminProfileActive
	profile.ReactivatedBySubjectID = &actorID
	profile.ReactivatedAt = &now
	profile.UpdatedAt = now

	if err := s.profileRepo.Update(ctx, profile); err != nil {
		return fmt.Errorf("failed to update profile: %w", err)
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id": actorID.String(),
		"action":   "admin_profile_reactivated",
		"subject":  subjectID.String(),
		"result":   "success",
	}
	if err := s.auditRepo.LogAdminAction(ctx, "admin_profile_reactivated", "profile", &profile.ID, actorID, auditEvent); err != nil {
		fmt.Printf("WARNING: failed to log audit event: %v\n", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	return nil
}

func (s *AdminProfileService) Revoke(
	ctx context.Context,
	actorID uuid.UUID,
	subjectID uuid.UUID,
) error {
	// Verify actor is super admin
	actor, err := s.subjectRepo.GetByID(ctx, actorID)
	if err != nil {
		return fmt.Errorf("failed to get actor: %w", err)
	}
	if !actor.IsSuperAdmin {
		return ErrUnauthorizedAdminAction
	}

	// Get current profile
	profile, err := s.profileRepo.GetBySubjectID(ctx, subjectID)
	if err != nil {
		return fmt.Errorf("failed to get profile: %w", err)
	}

	// Update in transaction
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback(ctx)

	now := time.Now().UTC()
	profile.Status = model.AdminProfileRevoked
	profile.EffectiveUntil = &now
	profile.UpdatedAt = now

	if err := s.profileRepo.Update(ctx, profile); err != nil {
		return fmt.Errorf("failed to update profile: %w", err)
	}

	// Revoke subject roles
	if err := s.subjectRepo.UpdateRoles(ctx, subjectID, []string{}); err != nil {
		return fmt.Errorf("failed to revoke subject roles: %w", err)
	}

	// Revoke sessions
	if err := s.sessionRepo.RevokeBySubjectID(ctx, subjectID.String(), time.Now().UTC()); err != nil {
		fmt.Printf("WARNING: failed to revoke sessions: %v\n", err)
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id": actorID.String(),
		"action":   "admin_profile_revoked",
		"subject":  subjectID.String(),
		"role":     profile.Role,
		"result":   "success",
	}
	if err := s.auditRepo.LogAdminAction(ctx, "admin_profile_revoked", "profile", &profile.ID, actorID, auditEvent); err != nil {
		fmt.Printf("WARNING: failed to log audit event: %v\n", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	return nil
}
