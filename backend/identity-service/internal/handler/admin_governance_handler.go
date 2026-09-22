package handler

import (
	"errors"
	"net/http"

	"github.com/google/uuid"
	sharedhttp "github.com/kirilock/backend/shared/http"
	"github.com/kirilock/backend/shared/validation"

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
	validator              *validation.Validator
}

func NewAdminGovernanceHandler(
	subjectService *service.SubjectService,
	adminInvitationService *service.AdminInvitationService,
	adminProfileService *service.AdminProfileService,
	auditRepo repository.AuditRepository,
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

	return &AdminGovernanceHandler{
		subjectService:         subjectService,
		adminInvitationService: adminInvitationService,
		adminProfileService:    adminProfileService,
		auditRepo:              auditRepo,
		validator:              validation.NewValidator(),
	}, nil
}

type InviteAdminRequest struct {
	SubjectID    uuid.UUID `json:"subject_id" validate:"required"`
	IntendedRole string    `json:"intended_role" validate:"required"`
	Reason       string    `json:"reason" validate:"required"`
	Department   string    `json:"department"`
}

type ListAdminsResponse struct {
	Admins []AdminSummary `json:"admins"`
	Total  int            `json:"total"`
}

type AdminSummary struct {
	SubjectID    uuid.UUID `json:"subject_id"`
	Email        string    `json:"email"`
	Role         string    `json:"role"`
	Status       string    `json:"status"`
	IsSuperAdmin bool      `json:"is_super_admin"`
	CreatedAt    string    `json:"created_at"`
}

type EffectivePermissionsResponse struct {
	RoleScopes map[string][]string `json:"role_scopes"`
}

// InviteAdmin creates an admin invitation (super_admin only)
func (h *AdminGovernanceHandler) InviteAdmin(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, r, http.StatusUnauthorized, "unauthorized")
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
		sharedhttp.WriteError(w, r, http.StatusForbidden, "insufficient permissions: super_admin role required")
		return
	}

	// Decode request
	var req InviteAdminRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Validate request
	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Create invitation
	invitation, token, err := h.adminInvitationService.CreateInvitation(
		ctx,
		principal.SubjectID,
		req.SubjectID,
		req.IntendedRole,
		req.Reason,
		req.Department,
	)
	if err != nil {
		if errors.Is(err, service.ErrMaxSuperAdminsExceeded) {
			sharedhttp.WriteError(w, r, http.StatusConflict, "maximum of two super admins allowed")
			return
		}
		sharedhttp.WriteError(w, r, http.StatusInternalServerError, "failed to create invitation")
		return
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":       principal.SubjectID,
		"action":         "admin_invited",
		"target_subject": req.SubjectID.String(),
		"intended_role":  req.IntendedRole,
		"result":         "success",
	}
	if err := h.auditRepo.LogEvent(ctx, "admin", "invitation", req.SubjectID.String(), auditEvent); err != nil {
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

	sharedhttp.WriteJSON(w, r, http.StatusCreated, response)
}

// ListAdministrators lists all administrators (super_admin only)
func (h *AdminGovernanceHandler) ListAdministrators(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, r, http.StatusUnauthorized, "unauthorized")
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
		sharedhttp.WriteError(w, r, http.StatusForbidden, "insufficient permissions: super_admin role required")
		return
	}

	// TODO: Implement list from admin_profiles
	// For now, return empty list
	response := ListAdminsResponse{
		Admins: []AdminSummary{},
		Total:  0,
	}

	sharedhttp.WriteJSON(w, r, http.StatusOK, response)
}

// GetEffectivePermissions returns the role→scope matrix (authenticated)
func (h *AdminGovernanceHandler) GetEffectivePermissions(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, r, http.StatusUnauthorized, "unauthorized")
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
		sharedhttp.WriteError(w, r, http.StatusForbidden, "insufficient permissions: super_admin or audit_admin role required")
		return
	}

	// Return role→scope matrix from security-service
	// For now, return a static mapping
	response := EffectivePermissionsResponse{
		RoleScopes: map[string][]string{
			"super_admin":    {"lease.read", "lease.write", "payment.read", "payment.reconcile", "payment.settle", "financial.read", "financial.configure", "device.read", "device.provision", "device.command", "lock.read", "lock.command", "security.read", "security.write", "audit.read"},
			"security_admin": {"security.read", "security.write", "audit.read", "device.read"},
			"finance_admin":  {"payment.read", "payment.write", "payment.reconcile", "payment.settle", "payment.refund", "financial.read", "audit.read"},
			"device_admin":   {"device.read", "device.provision", "device.command", "lock.read", "lock.command", "audit.read"},
			"audit_admin":    {"audit.read", "security.read"},
		},
	}

	sharedhttp.WriteJSON(w, r, http.StatusOK, response)
}

// PromoteToSuperAdmin promotes a subject to super admin (super_admin only)
func (h *AdminGovernanceHandler) PromoteToSuperAdmin(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, r, http.StatusUnauthorized, "unauthorized")
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
		sharedhttp.WriteError(w, r, http.StatusForbidden, "insufficient permissions: super_admin role required")
		return
	}

	// Decode request
	var req struct {
		TargetID uuid.UUID `json:"target_id" validate:"required"`
	}
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Validate request
	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Promote
	err = h.subjectService.SetSuperAdmin(ctx, principal.SubjectID, req.TargetID, true)
	if err != nil {
		if errors.Is(err, service.ErrMaxSuperAdminsExceeded) {
			sharedhttp.WriteError(w, r, http.StatusConflict, "maximum of two super admins allowed")
			return
		}
		sharedhttp.WriteError(w, r, http.StatusInternalServerError, "failed to promote to super admin")
		return
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":  principal.SubjectID,
		"action":    "super_admin_promoted",
		"target_id": req.TargetID.String(),
		"result":    "success",
	}
	if err := h.auditRepo.LogEvent(ctx, "admin", "super_admin", req.TargetID.String(), auditEvent); err != nil {
		// Log but don't fail the response
	}

	sharedhttp.WriteJSON(w, r, http.StatusOK, map[string]string{"status": "promoted"})
}

// DemoteFromSuperAdmin demotes a super admin (super_admin only)
func (h *AdminGovernanceHandler) DemoteFromSuperAdmin(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, r, http.StatusUnauthorized, "unauthorized")
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
		sharedhttp.WriteError(w, r, http.StatusForbidden, "insufficient permissions: super_admin role required")
		return
	}

	// Decode request
	var req struct {
		TargetID uuid.UUID `json:"target_id" validate:"required"`
	}
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Validate request
	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Demote
	err = h.subjectService.SetSuperAdmin(ctx, principal.SubjectID, req.TargetID, false)
	if err != nil {
		if errors.Is(err, service.ErrLastSuperAdmin) {
			sharedhttp.WriteError(w, r, http.StatusConflict, "cannot demote the last super admin")
			return
		}
		sharedhttp.WriteError(w, r, http.StatusInternalServerError, "failed to demote from super admin")
		return
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":  principal.SubjectID,
		"action":    "super_admin_demoted",
		"target_id": req.TargetID.String(),
		"result":    "success",
	}
	if err := h.auditRepo.LogEvent(ctx, "admin", "super_admin", req.TargetID.String(), auditEvent); err != nil {
		// Log but don't fail the response
	}

	sharedhttp.WriteJSON(w, r, http.StatusOK, map[string]string{"status": "demoted"})
}

// ApproveAdminProfile approves an admin profile (super_admin only)
func (h *AdminGovernanceHandler) ApproveAdminProfile(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, r, http.StatusUnauthorized, "unauthorized")
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
		sharedhttp.WriteError(w, r, http.StatusForbidden, "insufficient permissions: super_admin role required")
		return
	}

	// Decode request
	var req struct {
		SubjectID    uuid.UUID `json:"subject_id" validate:"required"`
		VettingNotes string    `json:"vetting_notes"`
	}
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Validate request
	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Approve
	err = h.adminProfileService.Approve(ctx, principal.SubjectID, req.SubjectID, req.VettingNotes)
	if err != nil {
		sharedhttp.WriteError(w, r, http.StatusInternalServerError, "failed to approve admin profile")
		return
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":      principal.SubjectID,
		"action":        "admin_profile_approved",
		"target_id":     req.SubjectID.String(),
		"vetting_notes": req.VettingNotes,
		"result":        "success",
	}
	if err := h.auditRepo.LogEvent(ctx, "admin", "profile", req.SubjectID.String(), auditEvent); err != nil {
		// Log but don't fail the response
	}

	sharedhttp.WriteJSON(w, r, http.StatusOK, map[string]string{"status": "approved"})
}

// RejectAdminProfile rejects an admin profile (super_admin only)
func (h *AdminGovernanceHandler) RejectAdminProfile(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, r, http.StatusUnauthorized, "unauthorized")
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
		sharedhttp.WriteError(w, r, http.StatusForbidden, "insufficient permissions: super_admin role required")
		return
	}

	// Decode request
	var req struct {
		SubjectID       uuid.UUID `json:"subject_id" validate:"required"`
		RejectionReason string    `json:"rejection_reason" validate:"required"`
	}
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Validate request
	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Reject
	err = h.adminProfileService.Reject(ctx, principal.SubjectID, req.SubjectID, req.RejectionReason)
	if err != nil {
		sharedhttp.WriteError(w, r, http.StatusInternalServerError, "failed to reject admin profile")
		return
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":         principal.SubjectID,
		"action":           "admin_profile_rejected",
		"target_id":        req.SubjectID.String(),
		"rejection_reason": req.RejectionReason,
		"result":           "success",
	}
	if err := h.auditRepo.LogEvent(ctx, "admin", "profile", req.SubjectID.String(), auditEvent); err != nil {
		// Log but don't fail the response
	}

	sharedhttp.WriteJSON(w, r, http.StatusOK, map[string]string{"status": "rejected"})
}

// SuspendAdmin suspends an admin (super_admin only)
func (h *AdminGovernanceHandler) SuspendAdmin(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, r, http.StatusUnauthorized, "unauthorized")
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
		sharedhttp.WriteError(w, r, http.StatusForbidden, "insufficient permissions: super_admin role required")
		return
	}

	// Decode request
	var req struct {
		SubjectID        uuid.UUID `json:"subject_id" validate:"required"`
		SuspensionReason string    `json:"suspension_reason" validate:"required"`
	}
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Validate request
	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Suspend
	err = h.adminProfileService.Suspend(ctx, principal.SubjectID, req.SubjectID, req.SuspensionReason)
	if err != nil {
		sharedhttp.WriteError(w, r, http.StatusInternalServerError, "failed to suspend admin")
		return
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":          principal.SubjectID,
		"action":            "admin_suspended",
		"target_id":         req.SubjectID.String(),
		"suspension_reason": req.SuspensionReason,
		"result":            "success",
	}
	if err := h.auditRepo.LogEvent(ctx, "admin", "profile", req.SubjectID.String(), auditEvent); err != nil {
		// Log but don't fail the response
	}

	sharedhttp.WriteJSON(w, r, http.StatusOK, map[string]string{"status": "suspended"})
}

// ReactivateAdmin reactivates a suspended admin (super_admin only)
func (h *AdminGovernanceHandler) ReactivateAdmin(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, r, http.StatusUnauthorized, "unauthorized")
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
		sharedhttp.WriteError(w, r, http.StatusForbidden, "insufficient permissions: super_admin role required")
		return
	}

	// Decode request
	var req struct {
		SubjectID uuid.UUID `json:"subject_id" validate:"required"`
	}
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Validate request
	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Reactivate
	err = h.adminProfileService.Reactivate(ctx, principal.SubjectID, req.SubjectID)
	if err != nil {
		sharedhttp.WriteError(w, r, http.StatusInternalServerError, "failed to reactivate admin")
		return
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":  principal.SubjectID,
		"action":    "admin_reactivated",
		"target_id": req.SubjectID.String(),
		"result":    "success",
	}
	if err := h.auditRepo.LogEvent(ctx, "admin", "profile", req.SubjectID.String(), auditEvent); err != nil {
		// Log but don't fail the response
	}

	sharedhttp.WriteJSON(w, r, http.StatusOK, map[string]string{"status": "reactivated"})
}

// RevokeAdmin revokes an admin permanently (super_admin only)
func (h *AdminGovernanceHandler) RevokeAdmin(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Resolve principal
	principal, err := middleware.PrincipalFromContext(ctx)
	if err != nil {
		sharedhttp.WriteError(w, r, http.StatusUnauthorized, "unauthorized")
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
		sharedhttp.WriteError(w, r, http.StatusForbidden, "insufficient permissions: super_admin role required")
		return
	}

	// Decode request
	var req struct {
		SubjectID uuid.UUID `json:"subject_id" validate:"required"`
	}
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Validate request
	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Revoke
	err = h.adminProfileService.Revoke(ctx, principal.SubjectID, req.SubjectID)
	if err != nil {
		sharedhttp.WriteError(w, r, http.StatusInternalServerError, "failed to revoke admin")
		return
	}

	// Audit log
	auditEvent := map[string]interface{}{
		"actor_id":  principal.SubjectID,
		"action":    "admin_revoked",
		"target_id": req.SubjectID.String(),
		"result":    "success",
	}
	if err := h.auditRepo.LogEvent(ctx, "admin", "profile", req.SubjectID.String(), auditEvent); err != nil {
		// Log but don't fail the response
	}

	sharedhttp.WriteJSON(w, r, http.StatusOK, map[string]string{"status": "revoked"})
}
