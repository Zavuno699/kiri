package service

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/identity-service/internal/model"
	"github.com/kirilock/backend/identity-service/internal/repository"
)

var (
	ErrAdminInvitationInvalidRole = errors.New("invalid admin role")
	ErrUnauthorizedAdminInvite    = errors.New("only super admin can invite admins")
)

type AdminInvitationService struct {
	invitationRepo repository.AdminInvitationRepository
	subjectRepo    repository.SubjectRepository
	auditRepo      repository.AuditRepository
	txDB           repository.TxDB
}

func NewAdminInvitationService(
	invitationRepo repository.AdminInvitationRepository,
	subjectRepo repository.SubjectRepository,
	auditRepo repository.AuditRepository,
	txDB repository.TxDB,
) (*AdminInvitationService, error) {
	if invitationRepo == nil {
		return nil, errors.New("invitation repository is required")
	}
	if subjectRepo == nil {
		return nil, errors.New("subject repository is required")
	}
	if auditRepo == nil {
		return nil, errors.New("audit repository is required")
	}
	if txDB == nil {
		return nil, errors.New("transaction database is required")
	}

	return &AdminInvitationService{
		invitationRepo: invitationRepo,
		subjectRepo:    subjectRepo,
		auditRepo:      auditRepo,
		txDB:           txDB,
	}, nil
}

func (s *AdminInvitationService) generateInvitationToken() (string, error) {
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}

func (s *AdminInvitationService) hashToken(token string) string {
	hash := sha256.Sum256([]byte(token))
	return hex.EncodeToString(hash[:])
}

func (s *AdminInvitationService) validateAdminRole(role string) error {
	validRoles := map[string]bool{
		"security_admin": true,
		"finance_admin":  true,
		"device_admin":   true,
		"audit_admin":    true,
		"super_admin":    true,
	}

	if !validRoles[role] {
		return ErrAdminInvitationInvalidRole
	}
	return nil
}

func (s *AdminInvitationService) CreateInvitation(
	ctx context.Context,
	actorID uuid.UUID,
	targetSubjectID uuid.UUID,
	intendedRole string,
	reason string,
	department string,
) (model.AdminInvitation, string, error) {
	// Validate role
	if err := s.validateAdminRole(intendedRole); err != nil {
		return model.AdminInvitation{}, "", err
	}

	// Check if this is a super_admin invitation and enforce limit
	if intendedRole == "super_admin" {
		count, err := s.invitationRepo.CountSuperAdmins(ctx)
		if err != nil {
			return model.AdminInvitation{}, "", fmt.Errorf("failed to count super admins: %w", err)
		}
		if count >= 2 {
			return model.AdminInvitation{}, "", errors.New("maximum of two super admins allowed")
		}
	}

	// Verify actor is super admin
	actor, err := s.subjectRepo.GetByID(ctx, actorID)
	if err != nil {
		return model.AdminInvitation{}, "", fmt.Errorf("failed to get actor: %w", err)
	}
	if !actor.IsSuperAdmin {
		return model.AdminInvitation{}, "", ErrUnauthorizedAdminInvite
	}

	// Verify target subject exists
	target, err := s.subjectRepo.GetByID(ctx, targetSubjectID)
	if err != nil {
		return model.AdminInvitation{}, "", fmt.Errorf("target subject not found: %w", err)
	}

	// Check for existing invitation
	existing, err := s.invitationRepo.GetBySubjectID(ctx, targetSubjectID)
	if err == nil && existing.IsValid() {
		return model.AdminInvitation{}, "", errors.New("subject already has a valid pending invitation")
	}

	// Generate token
	token, err := s.generateInvitationToken()
	if err != nil {
		return model.AdminInvitation{}, "", fmt.Errorf("failed to generate token: %w", err)
	}
	tokenHash := s.hashToken(token)

	// Invitation expires in 7 days
	expiresAt := time.Now().UTC().Add(7 * 24 * time.Hour)

	// Create invitation in transaction
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return model.AdminInvitation{}, "", fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback(ctx)

	invitation := model.AdminInvitation{
		ID:                  uuid.New(),
		SubjectID:           targetSubjectID,
		InvitedBySubjectID:  actorID,
		IntendedRole:        intendedRole,
		Reason:              reason,
		Department:          department,
		InvitationTokenHash: tokenHash,
		InvitationExpiresAt: expiresAt,
		Status:              model.AdminInvitationInvited,
		SingleUse:           true,
		CreatedAt:           time.Now().UTC(),
		UpdatedAt:           time.Now().UTC(),
		Version:             1,
	}

	if err := s.invitationRepo.Create(ctx, invitation); err != nil {
		return model.AdminInvitation{}, "", fmt.Errorf("failed to create invitation: %w", err)
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":       actorID.String(),
		"action":         "admin_invitation_created",
		"target_subject": target.SubjectID,
		"intended_role":  intendedRole,
		"department":     department,
		"result":         "success",
	}
	if err := s.auditRepo.LogAdminAction(ctx, "admin_invitation_created", "invitation", &invitation.ID, actorID, auditEvent); err != nil {
		// Log but don't fail the transaction
		fmt.Printf("WARNING: failed to log audit event: %v\n", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return model.AdminInvitation{}, "", fmt.Errorf("failed to commit transaction: %w", err)
	}

	return invitation, token, nil
}

func (s *AdminInvitationService) AcceptInvitation(
	ctx context.Context,
	subjectID uuid.UUID,
	token string,
) error {
	tokenHash := s.hashToken(token)

	// Find invitation
	invitation, err := s.invitationRepo.GetByTokenHash(ctx, tokenHash)
	if err != nil {
		return repository.ErrAdminInvitationNotFound
	}

	// Verify subject matches
	if invitation.SubjectID != subjectID {
		return repository.ErrAdminInvitationNotFound
	}

	// Validate invitation
	if !invitation.IsValid() {
		return errors.New("invitation is invalid or expired")
	}

	// Update in transaction
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback(ctx)

	now := time.Now().UTC()
	invitation.Status = model.AdminInvitationAccepted
	invitation.AcceptedAt = &now
	invitation.UpdatedAt = now

	if err := s.invitationRepo.Update(ctx, invitation); err != nil {
		return fmt.Errorf("failed to update invitation: %w", err)
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"action":         "admin_invitation_accepted",
		"target_subject": invitation.SubjectID.String(),
		"intended_role":  invitation.IntendedRole,
		"result":         "success",
	}
	if err := s.auditRepo.LogAdminAction(ctx, "admin_invitation_accepted", "invitation", &invitation.ID, invitation.SubjectID, auditEvent); err != nil {
		fmt.Printf("WARNING: failed to log audit event: %v\n", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	return nil
}

func (s *AdminInvitationService) RevokeInvitation(
	ctx context.Context,
	actorID uuid.UUID,
	invitationID uuid.UUID,
) error {
	// Verify actor is super admin
	actor, err := s.subjectRepo.GetByID(ctx, actorID)
	if err != nil {
		return fmt.Errorf("failed to get actor: %w", err)
	}
	if !actor.IsSuperAdmin {
		return ErrUnauthorizedAdminInvite
	}

	// Get invitation
	invitation, err := s.invitationRepo.GetByID(ctx, invitationID)
	if err != nil {
		return err
	}

	// Update in transaction
	tx, err := s.txDB.Begin(ctx)
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback(ctx)

	now := time.Now().UTC()
	invitation.Status = model.AdminInvitationRevoked
	invitation.RevokedAt = &now
	invitation.UpdatedAt = now

	if err := s.invitationRepo.Update(ctx, invitation); err != nil {
		return fmt.Errorf("failed to update invitation: %w", err)
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":       actorID.String(),
		"action":         "admin_invitation_revoked",
		"target_subject": invitation.SubjectID.String(),
		"intended_role":  invitation.IntendedRole,
		"result":         "success",
	}
	if err := s.auditRepo.LogAdminAction(ctx, "admin_invitation_revoked", "invitation", &invitation.ID, actorID, auditEvent); err != nil {
		fmt.Printf("WARNING: failed to log audit event: %v\n", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	return nil
}
