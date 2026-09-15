package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/google/uuid"
	sharedhttp "github.com/kirilock/backend/shared/http"
	"github.com/kirilock/backend/shared/validation"

	"github.com/kirilock/backend/identity-service/internal/middleware"
	"github.com/kirilock/backend/identity-service/internal/model"
	"github.com/kirilock/backend/identity-service/internal/service"
)

type LandlordHandler struct {
	landlordService *service.LandlordService
	validator       *validation.Validator
}

type CreateLandlordProfileRequest struct {
	LegalName string `json:"legal_name" validate:"required"`
}

type SubmitVerificationRequest struct {
	LegalName    string `json:"legal_name" validate:"required"`
	BusinessName string `json:"business_name"`
	TaxID        string `json:"tax_id"`
	Phone        string `json:"phone"`
	AddressLine1 string `json:"address_line1" validate:"required"`
	AddressLine2 string `json:"address_line2"`
	City         string `json:"city" validate:"required"`
	State        string `json:"state" validate:"required"`
	PostalCode   string `json:"postal_code" validate:"required"`
	Country      string `json:"country"`
}

type VerificationActionRequest struct {
	Reason string `json:"reason"`
}

type LandlordProfileResponse struct {
	ID                 uuid.UUID                        `json:"id"`
	SubjectID          uuid.UUID                        `json:"subject_id"`
	VerificationStatus model.LandlordVerificationStatus `json:"verification_status"`
	AuthorizationState model.LandlordAuthorizationState `json:"authorization_state"`
	LegalName          string                           `json:"legal_name"`
	BusinessName       string                           `json:"business_name"`
	SubmittedAt        *time.Time                       `json:"submitted_at,omitempty"`
	ReviewedAt         *time.Time                       `json:"reviewed_at,omitempty"`
	VerifiedAt         *time.Time                       `json:"verified_at,omitempty"`
	RejectionReason    string                           `json:"rejection_reason,omitempty"`
	Notes              string                           `json:"notes,omitempty"`
}

func NewLandlordHandler(landlordService *service.LandlordService) (*LandlordHandler, error) {
	if landlordService == nil {
		return nil, errors.New("landlord service is required")
	}

	return &LandlordHandler{
		landlordService: landlordService,
		validator:       validation.New(),
	}, nil
}

func (h *LandlordHandler) CreateProfile(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req CreateLandlordProfileRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	subjectID, err := uuid.Parse(principal.Subject)
	if err != nil {
		http.Error(w, "invalid subject id", http.StatusBadRequest)
		return
	}

	profile, err := h.landlordService.CreateLandlordProfile(r.Context(), subjectID, req.LegalName)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := LandlordProfileResponse{
		ID:                 profile.ID,
		SubjectID:          profile.SubjectID,
		VerificationStatus: profile.VerificationStatus,
		AuthorizationState: profile.AuthorizationState,
		LegalName:          profile.LegalName,
		BusinessName:       profile.BusinessName,
		SubmittedAt:        profile.SubmittedAt,
		ReviewedAt:         profile.ReviewedAt,
		VerifiedAt:         profile.VerifiedAt,
		RejectionReason:    profile.RejectionReason,
		Notes:              profile.Notes,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *LandlordHandler) SubmitVerification(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req SubmitVerificationRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	subjectID, err := uuid.Parse(principal.Subject)
	if err != nil {
		http.Error(w, "invalid subject id", http.StatusBadRequest)
		return
	}

	profile, err := h.landlordService.GetLandlordProfile(r.Context(), subjectID)
	if err != nil {
		http.Error(w, "profile not found", http.StatusNotFound)
		return
	}

	info := model.LandlordProfile{
		LegalName:    req.LegalName,
		BusinessName: req.BusinessName,
		TaxID:        req.TaxID,
		Phone:        req.Phone,
		AddressLine1: req.AddressLine1,
		AddressLine2: req.AddressLine2,
		City:         req.City,
		State:        req.State,
		PostalCode:   req.PostalCode,
		Country:      req.Country,
	}

	if err := h.landlordService.SubmitVerificationInformation(r.Context(), profile.ID, info); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *LandlordHandler) ApproveVerification(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	// Only super admins can approve verifications
	isSuperAdmin := false
	for _, role := range principal.Roles {
		if role == "super_admin" {
			isSuperAdmin = true
			break
		}
	}
	if !isSuperAdmin {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	profileID := r.URL.Query().Get("profile_id")
	if profileID == "" {
		http.Error(w, "profile_id required", http.StatusBadRequest)
		return
	}

	id, err := uuid.Parse(profileID)
	if err != nil {
		http.Error(w, "invalid profile id", http.StatusBadRequest)
		return
	}

	if err := h.landlordService.ApproveVerification(r.Context(), id); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *LandlordHandler) RejectVerification(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req VerificationActionRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	// Only super admins can reject verifications
	isSuperAdmin := false
	for _, role := range principal.Roles {
		if role == "super_admin" {
			isSuperAdmin = true
			break
		}
	}
	if !isSuperAdmin {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	profileID := r.URL.Query().Get("profile_id")
	if profileID == "" {
		http.Error(w, "profile_id required", http.StatusBadRequest)
		return
	}

	id, err := uuid.Parse(profileID)
	if err != nil {
		http.Error(w, "invalid profile id", http.StatusBadRequest)
		return
	}

	if err := h.landlordService.RejectVerification(r.Context(), id, req.Reason); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *LandlordHandler) GetProfile(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	subjectID, err := uuid.Parse(principal.Subject)
	if err != nil {
		http.Error(w, "invalid subject id", http.StatusBadRequest)
		return
	}

	profile, err := h.landlordService.GetLandlordProfile(r.Context(), subjectID)
	if err != nil {
		http.Error(w, "profile not found", http.StatusNotFound)
		return
	}

	response := LandlordProfileResponse{
		ID:                 profile.ID,
		SubjectID:          profile.SubjectID,
		VerificationStatus: profile.VerificationStatus,
		AuthorizationState: profile.AuthorizationState,
		LegalName:          profile.LegalName,
		BusinessName:       profile.BusinessName,
		SubmittedAt:        profile.SubmittedAt,
		ReviewedAt:         profile.ReviewedAt,
		VerifiedAt:         profile.VerifiedAt,
		RejectionReason:    profile.RejectionReason,
		Notes:              profile.Notes,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
