package handler

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/google/uuid"
	sharedhttp "github.com/kirilock/backend/shared/http"
	"github.com/kirilock/backend/shared/validation"

	"github.com/kirilock/backend/identity-service/internal/middleware"
	"github.com/kirilock/backend/identity-service/internal/model"
	"github.com/kirilock/backend/identity-service/internal/service"
)

type PublicRegistrationRequest struct {
	Email        string `json:"email" validate:"required,email"`
	Password     string `json:"password" validate:"required,min=8"`
	TermsVersion string `json:"terms_version" validate:"required"`
}

type SubmitApplicationVerificationRequest struct {
	ApplicationID uuid.UUID `json:"application_id" validate:"required"`
}

type AdminReviewRequest struct {
	ApplicationID uuid.UUID `json:"application_id" validate:"required"`
	Decision      string    `json:"decision" validate:"required,oneof=APPROVE REJECT REQUEST_INFO"`
	Reason        string    `json:"reason,omitempty"`
	Category      string    `json:"category,omitempty"`
}

type LandlordApplicationHandler struct {
	service   *service.LandlordApplicationService
	validator *validation.Validator
}

func NewLandlordApplicationHandler(
	svc *service.LandlordApplicationService,
) (*LandlordApplicationHandler, error) {
	if svc == nil {
		return nil, errors.New("landlord application service is required")
	}

	return &LandlordApplicationHandler{
		service:   svc,
		validator: validation.New(),
	}, nil
}

// PublicLandlordRegistration creates a landlord application without authentication
// This is the only public path that can create a landlord application
func (h *LandlordApplicationHandler) PublicLandlordRegistration(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req PublicRegistrationRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	app, err := h.service.CreatePublicRegistration(r.Context(), req.Email, req.Password, req.TermsVersion)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		// Account enumeration protection: return generic error
		if errors.Is(err, service.ErrLandlordApplicationAlreadyExists) ||
			err.Error() == "registration failed" {
			w.WriteHeader(http.StatusConflict)
			json.NewEncoder(w).Encode(map[string]string{"message": "registration failed"})
			return
		}
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"message": "failed to create landlord application"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(app)
}

// GetApplicationStatus retrieves the applicant's own application status
func (h *LandlordApplicationHandler) GetApplicationStatus(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "unauthorized"})
		return
	}

	subjectID := uuid.MustParse(principal.Subject)

	app, err := h.service.GetApplicationStatus(r.Context(), subjectID)
	if err != nil {
		if errors.Is(err, service.ErrLandlordApplicationNotFound) {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]string{"error": "application not found"})
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "failed to get application status"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(app)
}

// SubmitVerification submits verification for review
func (h *LandlordApplicationHandler) SubmitVerification(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "unauthorized"})
		return
	}

	subjectID := uuid.MustParse(principal.Subject)

	app, err := h.service.SubmitVerification(r.Context(), subjectID)
	if err != nil {
		if errors.Is(err, service.ErrLandlordApplicationNotFound) {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]string{"error": "application not found"})
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "failed to submit verification"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(app)
}

// AdminListApplications lists applications by status (admin only)
func (h *LandlordApplicationHandler) AdminListApplications(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "unauthorized"})
		return
	}

	// Check admin authorization
	hasAdminRole := false
	for _, role := range principal.Roles {
		if role == "super_admin" || role == "security_admin" {
			hasAdminRole = true
			break
		}
	}

	if !hasAdminRole {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"error": "insufficient permissions"})
		return
	}

	statusStr := r.URL.Query().Get("status")
	if statusStr == "" {
		statusStr = string(model.LandlordApplicationStatusPendingVerification)
	}

	status := model.LandlordApplicationStatus(statusStr)

	apps, err := h.service.AdminListApplications(r.Context(), status)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "failed to list applications"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(apps)
}

// AdminGetApplication retrieves application detail (admin only)
func (h *LandlordApplicationHandler) AdminGetApplication(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "unauthorized"})
		return
	}

	// Check admin authorization
	hasAdminRole := false
	for _, role := range principal.Roles {
		if role == "super_admin" || role == "security_admin" {
			hasAdminRole = true
			break
		}
	}

	if !hasAdminRole {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"error": "insufficient permissions"})
		return
	}

	applicationIDStr := r.URL.Query().Get("id")
	if applicationIDStr == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "application id required"})
		return
	}

	applicationID, err := uuid.Parse(applicationIDStr)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "invalid application id"})
		return
	}

	app, err := h.service.AdminGetApplication(r.Context(), applicationID)
	if err != nil {
		if errors.Is(err, service.ErrLandlordApplicationNotFound) {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]string{"error": "application not found"})
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "failed to get application"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(app)
}

// AdminReview handles admin review actions (approve/reject/request info)
func (h *LandlordApplicationHandler) AdminReview(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "unauthorized"})
		return
	}

	// Check admin authorization
	hasAdminRole := false
	for _, role := range principal.Roles {
		if role == "super_admin" || role == "security_admin" {
			hasAdminRole = true
			break
		}
	}

	if !hasAdminRole {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"error": "insufficient permissions"})
		return
	}

	var req AdminReviewRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	reviewerID := uuid.MustParse(principal.Subject)

	switch req.Decision {
	case "APPROVE":
		err = h.service.AdminApprove(r.Context(), req.ApplicationID, reviewerID)
	case "REJECT":
		err = h.service.AdminReject(r.Context(), req.ApplicationID, reviewerID, req.Reason, req.Category)
	case "REQUEST_INFO":
		err = h.service.AdminRequestMoreInformation(r.Context(), req.ApplicationID, reviewerID, req.Reason)
	default:
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "invalid decision"})
		return
	}

	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "failed to process review"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}
