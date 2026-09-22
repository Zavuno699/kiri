package handler

import (
	"errors"
	"net/http"

	"github.com/google/uuid"
	sharedhttp "github.com/kirilock/backend/shared/http"

	"github.com/kirilock/backend/identity-service/internal/middleware"
	"github.com/kirilock/backend/identity-service/internal/repository"
	"github.com/kirilock/backend/identity-service/internal/service"
)

var (
	ErrUnauthorizedAdminOperation = errors.New("only super admin can perform this operation")
	ErrInvalidAdminRole           = errors.New("invalid admin role")
)

type AdminGovernanceHandler struct {
	subjectService         *service.SubjectService
	adminInvitationService *service.AdminInvitationService
	adminProfileService    *service.AdminProfileService
	auditRepo              repository.AuditRepository
	subjectRepo            repository.SubjectRepository
}

func NewAdminGovernanceHandler(
	subjectService *service.SubjectService,
	adminInvitationService *service.AdminInvitationService,
	adminProfileService *service.AdminProfileService,
	auditRepo repository.AuditRepository,
	subjectRepo repository.SubjectRepository,
) (*AdminGovernanceHandler, error) {
	if subjectService == nil {
		return nil, errors.New("subject service is required")
	}
	if adminInvitationService == nil {
		return nil, errors.New("admin invitation service is required")
	}
	if adminProfileService == nil {
		return nil, errors.New("admin profile service is required")
	}
	if auditRepo == nil {
		return nil, errors.New("audit repository is required")
	}
	if subjectRepo == nil {
		return nil, errors.New("subject repository is required")
	}

	return &AdminGovernanceHandler{
		subjectService:         subjectService,
		adminInvitationService: adminInvitationService,
		adminProfileService:    adminProfileService,
		auditRepo:              auditRepo,
		subjectRepo:            subjectRepo,
	}, nil
}

// InviteAdmin creates an admin invitation (super_admin only)
func (h *AdminGovernanceHandler) InviteAdmin(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "unauthorized", "unauthorized", "", nil)
		return
	}

	// Authorize: only super_admin can invite admins
	hasSuperAdmin := false
	for _, role := range principal.Roles {
		if role == "super_admin" {
			hasSuperAdmin = true
			break
		}
	}
	if !hasSuperAdmin {
		sharedhttp.WriteError(w, http.StatusForbidden, "forbidden", "insufficient permissions: super_admin role required", "", nil)
		return
	}

	// Decode request
	var req struct {
		SubjectID    uuid.UUID `json:"subject_id"`
		IntendedRole string    `json:"intended_role"`
		Reason       string    `json:"reason"`
		Department   string    `json:"department"`
	}
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteError(w, http.StatusBadRequest, "bad_request", "invalid request body", "", nil)
		return
	}

	// Convert principal.Subject to UUID
	actorID, err := uuid.Parse(principal.Subject)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "invalid_principal", "invalid principal subject ID", "", nil)
		return
	}

	// Create invitation
	invitation, token, err := h.adminInvitationService.CreateInvitation(
		ctx,
		actorID,
		req.SubjectID,
		req.IntendedRole,
		req.Reason,
		req.Department,
	)
	if err != nil {
		if errors.Is(err, service.ErrMaxSuperAdminsExceeded) {
			sharedhttp.WriteError(w, http.StatusConflict, "max_super_admins", "maximum of two super admins allowed", "", nil)
			return
		}
		sharedhttp.WriteError(w, http.StatusInternalServerError, "internal_error", "failed to create invitation", "", nil)
		return
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":       principal.Subject,
		"action":         "admin_invited",
		"target_subject": req.SubjectID.String(),
		"intended_role":  req.IntendedRole,
		"result":         "success",
	}
	if err := h.auditRepo.LogAdminAction(ctx, "admin_invited", "invitation", &invitation.ID, actorID, auditEvent); err != nil {
		// Log but don't fail the response
	}

	// Return invitation details (without plaintext token in production)
	response := map[string]interface{}{
		"invitation_id":    invitation.ID,
		"subject_id":       invitation.SubjectID,
		"intended_role":    invitation.IntendedRole,
		"status":           invitation.Status,
		"invitation_token": token, // In production, this should be sent via email, not API response
		"expires_at":       invitation.InvitationExpiresAt,
	}

	sharedhttp.WriteJSON(w, http.StatusCreated, response)
}

// ListAdministrators lists all administrators (super_admin only)
func (h *AdminGovernanceHandler) ListAdministrators(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "unauthorized", "unauthorized", "", nil)
		return
	}

	// Authorize: only super_admin can list administrators
	hasSuperAdmin := false
	for _, role := range principal.Roles {
		if role == "super_admin" {
			hasSuperAdmin = true
			break
		}
	}
	if !hasSuperAdmin {
		sharedhttp.WriteError(w, http.StatusForbidden, "forbidden", "insufficient permissions: super_admin role required", "", nil)
		return
	}

	// List all admin profiles
	profiles, err := h.adminProfileService.ListAll(ctx)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusInternalServerError, "internal_error", "failed to list administrators", "", nil)
		return
	}

	// Build response with admin summaries
	admins := make([]map[string]interface{}, 0, len(profiles))
	for _, profile := range profiles {
		// Get subject details
		subject, err := h.subjectRepo.GetByID(ctx, profile.SubjectID)
		if err != nil {
			// Skip if subject not found
			continue
		}

		admins = append(admins, map[string]interface{}{
			"subject_id":     profile.SubjectID,
			"email":          subject.Email,
			"role":           profile.Role,
			"status":         profile.Status,
			"is_super_admin": subject.IsSuperAdmin,
			"created_at":     profile.CreatedAt,
		})
	}

	response := map[string]interface{}{
		"admins": admins,
		"total":  len(admins),
	}

	sharedhttp.WriteJSON(w, http.StatusOK, response)
}

// GetEffectivePermissions returns the role→scope matrix (authenticated)
func (h *AdminGovernanceHandler) GetEffectivePermissions(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "unauthorized", "unauthorized", "", nil)
		return
	}

	// Authorize: super_admin or audit_admin can view permissions
	hasPermission := false
	for _, role := range principal.Roles {
		if role == "super_admin" || role == "audit_admin" {
			hasPermission = true
			break
		}
	}
	if !hasPermission {
		sharedhttp.WriteError(w, http.StatusForbidden, "forbidden", "insufficient permissions: super_admin or audit_admin role required", "", nil)
		return
	}

	// Return role→scope matrix from security-service
	// For now, return a static mapping
	response := map[string]interface{}{
		"role_scopes": map[string][]string{
			"super_admin":    {"lease.read", "lease.write", "payment.read", "payment.reconcile", "payment.settle", "financial.read", "financial.configure", "device.read", "device.provision", "device.command", "lock.read", "lock.command", "security.read", "security.write", "audit.read"},
			"security_admin": {"security.read", "security.write", "audit.read", "device.read"},
			"finance_admin":  {"payment.read", "payment.write", "payment.reconcile", "payment.settle", "payment.refund", "financial.read", "audit.read"},
			"device_admin":   {"device.read", "device.provision", "device.command", "lock.read", "lock.command", "audit.read"},
			"audit_admin":    {"audit.read", "security.read"},
		},
	}

	sharedhttp.WriteJSON(w, http.StatusOK, response)
}

// PromoteToSuperAdmin promotes a subject to super admin (super_admin only)
func (h *AdminGovernanceHandler) PromoteToSuperAdmin(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "unauthorized", "unauthorized", "", nil)
		return
	}

	// Authorize: only super_admin can promote to super admin
	hasSuperAdmin := false
	for _, role := range principal.Roles {
		if role == "super_admin" {
			hasSuperAdmin = true
			break
		}
	}
	if !hasSuperAdmin {
		sharedhttp.WriteError(w, http.StatusForbidden, "forbidden", "insufficient permissions: super_admin role required", "", nil)
		return
	}

	// Decode request
	var req struct {
		TargetID uuid.UUID `json:"target_id"`
	}
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteError(w, http.StatusBadRequest, "bad_request", "invalid request body", "", nil)
		return
	}

	// Convert principal.Subject to UUID
	actorID, err := uuid.Parse(principal.Subject)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "invalid_principal", "invalid principal subject ID", "", nil)
		return
	}

	// Promote
	err = h.subjectService.SetSuperAdmin(ctx, actorID, req.TargetID, true)
	if err != nil {
		if errors.Is(err, service.ErrMaxSuperAdminsExceeded) {
			sharedhttp.WriteError(w, http.StatusConflict, "max_super_admins", "maximum of two super admins allowed", "", nil)
			return
		}
		sharedhttp.WriteError(w, http.StatusInternalServerError, "internal_error", "failed to promote to super admin", "", nil)
		return
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":  principal.Subject,
		"action":    "super_admin_promoted",
		"target_id": req.TargetID.String(),
		"result":    "success",
	}
	if err := h.auditRepo.LogAdminAction(ctx, "super_admin_promoted", "super_admin", &req.TargetID, actorID, auditEvent); err != nil {
		// Log but don't fail the response
	}

	sharedhttp.WriteJSON(w, http.StatusOK, map[string]string{"status": "promoted"})
}

// DemoteFromSuperAdmin demotes a super admin (super_admin only)
func (h *AdminGovernanceHandler) DemoteFromSuperAdmin(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "unauthorized", "unauthorized", "", nil)
		return
	}

	// Authorize: only super_admin can demote super admin
	hasSuperAdmin := false
	for _, role := range principal.Roles {
		if role == "super_admin" {
			hasSuperAdmin = true
			break
		}
	}
	if !hasSuperAdmin {
		sharedhttp.WriteError(w, http.StatusForbidden, "forbidden", "insufficient permissions: super_admin role required", "", nil)
		return
	}

	// Decode request
	var req struct {
		TargetID uuid.UUID `json:"target_id"`
	}
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteError(w, http.StatusBadRequest, "bad_request", "invalid request body", "", nil)
		return
	}

	// Convert principal.Subject to UUID
	actorID, err := uuid.Parse(principal.Subject)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "invalid_principal", "invalid principal subject ID", "", nil)
		return
	}

	// Demote
	err = h.subjectService.SetSuperAdmin(ctx, actorID, req.TargetID, false)
	if err != nil {
		if errors.Is(err, service.ErrLastSuperAdmin) {
			sharedhttp.WriteError(w, http.StatusConflict, "last_super_admin", "cannot demote the last super admin", "", nil)
			return
		}
		sharedhttp.WriteError(w, http.StatusInternalServerError, "internal_error", "failed to demote from super admin", "", nil)
		return
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":  principal.Subject,
		"action":    "super_admin_demoted",
		"target_id": req.TargetID.String(),
		"result":    "success",
	}
	if err := h.auditRepo.LogAdminAction(ctx, "super_admin_demoted", "super_admin", &req.TargetID, actorID, auditEvent); err != nil {
		// Log but don't fail the response
	}

	sharedhttp.WriteJSON(w, http.StatusOK, map[string]string{"status": "demoted"})
}

// ApproveAdminProfile approves an admin profile (super_admin only)
func (h *AdminGovernanceHandler) ApproveAdminProfile(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "unauthorized", "unauthorized", "", nil)
		return
	}

	// Authorize: only super_admin can approve
	hasSuperAdmin := false
	for _, role := range principal.Roles {
		if role == "super_admin" {
			hasSuperAdmin = true
			break
		}
	}
	if !hasSuperAdmin {
		sharedhttp.WriteError(w, http.StatusForbidden, "forbidden", "insufficient permissions: super_admin role required", "", nil)
		return
	}

	// Decode request
	var req struct {
		SubjectID    uuid.UUID `json:"subject_id"`
		VettingNotes string    `json:"vetting_notes"`
	}
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteError(w, http.StatusBadRequest, "bad_request", "invalid request body", "", nil)
		return
	}

	// Convert principal.Subject to UUID
	actorID, err := uuid.Parse(principal.Subject)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "invalid_principal", "invalid principal subject ID", "", nil)
		return
	}

	// Approve
	err = h.adminProfileService.Approve(ctx, actorID, req.SubjectID, req.VettingNotes)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusInternalServerError, "internal_error", "failed to approve admin profile", "", nil)
		return
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":      principal.Subject,
		"action":        "admin_profile_approved",
		"target_id":     req.SubjectID.String(),
		"vetting_notes": req.VettingNotes,
		"result":        "success",
	}
	if err := h.auditRepo.LogAdminAction(ctx, "admin_profile_approved", "profile", &req.SubjectID, actorID, auditEvent); err != nil {
		// Log but don't fail the response
	}

	sharedhttp.WriteJSON(w, http.StatusOK, map[string]string{"status": "approved"})
}

// RejectAdminProfile rejects an admin profile (super_admin only)
func (h *AdminGovernanceHandler) RejectAdminProfile(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "unauthorized", "unauthorized", "", nil)
		return
	}

	// Authorize: only super_admin can reject
	hasSuperAdmin := false
	for _, role := range principal.Roles {
		if role == "super_admin" {
			hasSuperAdmin = true
			break
		}
	}
	if !hasSuperAdmin {
		sharedhttp.WriteError(w, http.StatusForbidden, "forbidden", "insufficient permissions: super_admin role required", "", nil)
		return
	}

	// Decode request
	var req struct {
		SubjectID       uuid.UUID `json:"subject_id"`
		RejectionReason string    `json:"rejection_reason"`
	}
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteError(w, http.StatusBadRequest, "bad_request", "invalid request body", "", nil)
		return
	}

	// Convert principal.Subject to UUID
	actorID, err := uuid.Parse(principal.Subject)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "invalid_principal", "invalid principal subject ID", "", nil)
		return
	}

	// Reject
	err = h.adminProfileService.Reject(ctx, actorID, req.SubjectID, req.RejectionReason)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusInternalServerError, "internal_error", "failed to reject admin profile", "", nil)
		return
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":         principal.Subject,
		"action":           "admin_profile_rejected",
		"target_id":        req.SubjectID.String(),
		"rejection_reason": req.RejectionReason,
		"result":           "success",
	}
	if err := h.auditRepo.LogAdminAction(ctx, "admin_profile_rejected", "profile", &req.SubjectID, actorID, auditEvent); err != nil {
		// Log but don't fail the response
	}

	sharedhttp.WriteJSON(w, http.StatusOK, map[string]string{"status": "rejected"})
}

// SuspendAdmin suspends an admin (super_admin only)
func (h *AdminGovernanceHandler) SuspendAdmin(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "unauthorized", "unauthorized", "", nil)
		return
	}

	// Authorize: only super_admin can suspend
	hasSuperAdmin := false
	for _, role := range principal.Roles {
		if role == "super_admin" {
			hasSuperAdmin = true
			break
		}
	}
	if !hasSuperAdmin {
		sharedhttp.WriteError(w, http.StatusForbidden, "forbidden", "insufficient permissions: super_admin role required", "", nil)
		return
	}

	// Decode request
	var req struct {
		SubjectID        uuid.UUID `json:"subject_id"`
		SuspensionReason string    `json:"suspension_reason"`
	}
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteError(w, http.StatusBadRequest, "bad_request", "invalid request body", "", nil)
		return
	}

	// Convert principal.Subject to UUID
	actorID, err := uuid.Parse(principal.Subject)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "invalid_principal", "invalid principal subject ID", "", nil)
		return
	}

	// Suspend
	err = h.adminProfileService.Suspend(ctx, actorID, req.SubjectID, req.SuspensionReason)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusInternalServerError, "internal_error", "failed to suspend admin", "", nil)
		return
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":          principal.Subject,
		"action":            "admin_suspended",
		"target_id":         req.SubjectID.String(),
		"suspension_reason": req.SuspensionReason,
		"result":            "success",
	}
	if err := h.auditRepo.LogAdminAction(ctx, "admin_suspended", "profile", &req.SubjectID, actorID, auditEvent); err != nil {
		// Log but don't fail the response
	}

	sharedhttp.WriteJSON(w, http.StatusOK, map[string]string{"status": "suspended"})
}

// ReactivateAdmin reactivates a suspended admin (super_admin only)
func (h *AdminGovernanceHandler) ReactivateAdmin(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "unauthorized", "unauthorized", "", nil)
		return
	}

	// Authorize: only super_admin can reactivate
	hasSuperAdmin := false
	for _, role := range principal.Roles {
		if role == "super_admin" {
			hasSuperAdmin = true
			break
		}
	}
	if !hasSuperAdmin {
		sharedhttp.WriteError(w, http.StatusForbidden, "forbidden", "insufficient permissions: super_admin role required", "", nil)
		return
	}

	// Decode request
	var req struct {
		SubjectID uuid.UUID `json:"subject_id"`
	}
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteError(w, http.StatusBadRequest, "bad_request", "invalid request body", "", nil)
		return
	}

	// Convert principal.Subject to UUID
	actorID, err := uuid.Parse(principal.Subject)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "invalid_principal", "invalid principal subject ID", "", nil)
		return
	}

	// Reactivate
	err = h.adminProfileService.Reactivate(ctx, actorID, req.SubjectID)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusInternalServerError, "internal_error", "failed to reactivate admin", "", nil)
		return
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":  principal.Subject,
		"action":    "admin_reactivated",
		"target_id": req.SubjectID.String(),
		"result":    "success",
	}
	if err := h.auditRepo.LogAdminAction(ctx, "admin_reactivated", "profile", &req.SubjectID, actorID, auditEvent); err != nil {
		// Log but don't fail the response
	}

	sharedhttp.WriteJSON(w, http.StatusOK, map[string]string{"status": "reactivated"})
}

// RevokeAdmin revokes an admin permanently (super_admin only)
func (h *AdminGovernanceHandler) RevokeAdmin(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "unauthorized", "unauthorized", "", nil)
		return
	}

	// Authorize: only super_admin can revoke
	hasSuperAdmin := false
	for _, role := range principal.Roles {
		if role == "super_admin" {
			hasSuperAdmin = true
			break
		}
	}
	if !hasSuperAdmin {
		sharedhttp.WriteError(w, http.StatusForbidden, "forbidden", "insufficient permissions: super_admin role required", "", nil)
		return
	}

	// Decode request
	var req struct {
		SubjectID uuid.UUID `json:"subject_id"`
	}
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteError(w, http.StatusBadRequest, "bad_request", "invalid request body", "", nil)
		return
	}

	// Convert principal.Subject to UUID
	actorID, err := uuid.Parse(principal.Subject)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusUnauthorized, "invalid_principal", "invalid principal subject ID", "", nil)
		return
	}

	// Revoke
	err = h.adminProfileService.Revoke(ctx, actorID, req.SubjectID)
	if err != nil {
		sharedhttp.WriteError(w, http.StatusInternalServerError, "internal_error", "failed to revoke admin", "", nil)
		return
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":  principal.Subject,
		"action":    "admin_revoked",
		"target_id": req.SubjectID.String(),
		"result":    "success",
	}
	if err := h.auditRepo.LogAdminAction(ctx, "admin_revoked", "profile", &req.SubjectID, actorID, auditEvent); err != nil {
		// Log but don't fail the response
	}

	sharedhttp.WriteJSON(w, http.StatusOK, map[string]string{"status": "revoked"})
}
