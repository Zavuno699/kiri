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
	"github.com/kirilock/backend/identity-service/internal/repository"
	"github.com/kirilock/backend/identity-service/internal/service"
)

type TenantHandler struct {
	tenantService *service.TenantService
	subjectRepo   repository.SubjectRepository
	validator     *validation.Validator
}

type CreateTenantInvitationRequest struct {
	TenantSubjectID uuid.UUID `json:"tenant_subject_id"`
	TenantEmail     string    `json:"tenant_email"`
	UnitID          uuid.UUID `json:"unit_id" validate:"required"`
	LeaseStartDate  string    `json:"lease_start_date" validate:"required"`
	LeaseEndDate    string    `json:"lease_end_date"`
}

type AcceptInvitationRequest struct {
	Token string `json:"token" validate:"required"`
}

type TerminateTenancyRequest struct {
	Reason string `json:"reason" validate:"required"`
}

type PreviewInvitationRequest struct {
	Token string `json:"token" validate:"required"`
}

type ActivateTenantRequest struct {
	Token    string `json:"token" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type ActivateTenantResponse struct {
	Tenancy   TenancyResponse `json:"tenancy"`
	SessionID string          `json:"session_id"`
	SubjectID uuid.UUID       `json:"subject_id"`
	Email     string          `json:"email"`
	Roles     []string        `json:"roles"`
}

type TenancyResponse struct {
	ID                         uuid.UUID           `json:"id"`
	TenantSubjectID            uuid.UUID           `json:"tenant_subject_id"`
	UnitID                     uuid.UUID           `json:"unit_id"`
	Status                     model.TenancyStatus `json:"status"`
	LeaseStartDate             time.Time           `json:"lease_start_date"`
	LeaseEndDate               *time.Time          `json:"lease_end_date,omitempty"`
	InvitedByLandlordProfileID *uuid.UUID          `json:"invited_by_landlord_profile_id,omitempty"`
	InvitationExpiresAt        *time.Time          `json:"invitation_expires_at,omitempty"`
	InvitationAcceptedAt       *time.Time          `json:"invitation_accepted_at,omitempty"`
	TerminatedAt               *time.Time          `json:"terminated_at,omitempty"`
	TerminationReason          string              `json:"termination_reason,omitempty"`
	CreatedAt                  time.Time           `json:"created_at"`
	UpdatedAt                  time.Time           `json:"updated_at"`
}

func NewTenantHandler(tenantService *service.TenantService, subjectRepo repository.SubjectRepository) (*TenantHandler, error) {
	if tenantService == nil {
		return nil, errors.New("tenant service is required")
	}
	if subjectRepo == nil {
		return nil, errors.New("subject repository is required")
	}

	return &TenantHandler{
		tenantService: tenantService,
		subjectRepo:   subjectRepo,
		validator:     validation.New(),
	}, nil
}

func (h *TenantHandler) CreateTenantInvitation(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req CreateTenantInvitationRequest
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

	leaseStartDate, err := time.Parse(time.RFC3339, req.LeaseStartDate)
	if err != nil {
		http.Error(w, "invalid lease_start_date format", http.StatusBadRequest)
		return
	}

	var leaseEndDate *time.Time
	if req.LeaseEndDate != "" {
		endDate, err := time.Parse(time.RFC3339, req.LeaseEndDate)
		if err != nil {
			http.Error(w, "invalid lease_end_date format", http.StatusBadRequest)
			return
		}
		leaseEndDate = &endDate
	}

	var tenancy model.Tenancy
	if req.TenantEmail != "" {
		// Invite by email (not-yet-existing tenant)
		tenancy, err = h.tenantService.CreateTenantInvitationByEmail(r.Context(), subjectID, req.TenantEmail, req.UnitID, leaseStartDate, leaseEndDate)
	} else if req.TenantSubjectID != uuid.Nil {
		// Invite existing tenant
		tenancy, err = h.tenantService.CreateTenantInvitation(r.Context(), subjectID, req.TenantSubjectID, req.UnitID, leaseStartDate, leaseEndDate)
	} else {
		http.Error(w, "either tenant_subject_id or tenant_email is required", http.StatusBadRequest)
		return
	}
	if err != nil {
		if err == service.ErrLandlordNotAuthorized || err == service.ErrUnauthorizedProperty {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		if err == service.ErrUnitNotAvailable || err == service.ErrDuplicateActiveTenancy {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := TenancyResponse{
		ID:                         tenancy.ID,
		TenantSubjectID:            tenancy.TenantSubjectID,
		UnitID:                     tenancy.UnitID,
		Status:                     tenancy.Status,
		LeaseStartDate:             tenancy.LeaseStartDate,
		LeaseEndDate:               tenancy.LeaseEndDate,
		InvitedByLandlordProfileID: tenancy.InvitedByLandlordProfileID,
		InvitationExpiresAt:        tenancy.InvitationExpiresAt,
		InvitationAcceptedAt:       tenancy.InvitationAcceptedAt,
		TerminatedAt:               tenancy.TerminatedAt,
		TerminationReason:          tenancy.TerminationReason,
		CreatedAt:                  tenancy.CreatedAt,
		UpdatedAt:                  tenancy.UpdatedAt,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *TenantHandler) AcceptInvitation(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req AcceptInvitationRequest
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

	if err := h.tenantService.AcceptInvitation(r.Context(), subjectID, req.Token); err != nil {
		if err == service.ErrInvalidInvitation || err == service.ErrInvitationExpired {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *TenantHandler) GetTenantTenancy(w http.ResponseWriter, r *http.Request) {
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

	tenancy, err := h.tenantService.GetTenantTenancy(r.Context(), subjectID)
	if err != nil {
		http.Error(w, "tenancy not found", http.StatusNotFound)
		return
	}

	response := TenancyResponse{
		ID:                         tenancy.ID,
		TenantSubjectID:            tenancy.TenantSubjectID,
		UnitID:                     tenancy.UnitID,
		Status:                     tenancy.Status,
		LeaseStartDate:             tenancy.LeaseStartDate,
		LeaseEndDate:               tenancy.LeaseEndDate,
		InvitedByLandlordProfileID: tenancy.InvitedByLandlordProfileID,
		InvitationExpiresAt:        tenancy.InvitationExpiresAt,
		InvitationAcceptedAt:       tenancy.InvitationAcceptedAt,
		TerminatedAt:               tenancy.TerminatedAt,
		TerminationReason:          tenancy.TerminationReason,
		CreatedAt:                  tenancy.CreatedAt,
		UpdatedAt:                  tenancy.UpdatedAt,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *TenantHandler) GetLandlordTenancies(w http.ResponseWriter, r *http.Request) {
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

	tenancies, err := h.tenantService.GetLandlordTenancies(r.Context(), subjectID)
	if err != nil {
		if errors.Is(err, repository.ErrLandlordProfileNotFound) {
			// Landlord has no profile yet - return empty array
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode([]TenancyResponse{})
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var responses []TenancyResponse
	for _, tenancy := range tenancies {
		responses = append(responses, TenancyResponse{
			ID:                         tenancy.ID,
			TenantSubjectID:            tenancy.TenantSubjectID,
			UnitID:                     tenancy.UnitID,
			Status:                     tenancy.Status,
			LeaseStartDate:             tenancy.LeaseStartDate,
			LeaseEndDate:               tenancy.LeaseEndDate,
			InvitedByLandlordProfileID: tenancy.InvitedByLandlordProfileID,
			InvitationExpiresAt:        tenancy.InvitationExpiresAt,
			InvitationAcceptedAt:       tenancy.InvitationAcceptedAt,
			TerminatedAt:               tenancy.TerminatedAt,
			TerminationReason:          tenancy.TerminationReason,
			CreatedAt:                  tenancy.CreatedAt,
			UpdatedAt:                  tenancy.UpdatedAt,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(responses)
}

func (h *TenantHandler) TerminateTenancy(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req TerminateTenancyRequest
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

	tenancyID := r.URL.Query().Get("tenancy_id")
	if tenancyID == "" {
		http.Error(w, "tenancy_id required", http.StatusBadRequest)
		return
	}

	id, err := uuid.Parse(tenancyID)
	if err != nil {
		http.Error(w, "invalid tenancy id", http.StatusBadRequest)
		return
	}

	if err := h.tenantService.TerminateTenancy(r.Context(), subjectID, id, req.Reason); err != nil {
		if err == service.ErrLandlordNotAuthorized || err == service.ErrUnauthorizedProperty {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *TenantHandler) PreviewInvitation(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req PreviewInvitationRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	preview, err := h.tenantService.PreviewInvitation(r.Context(), req.Token)
	if err != nil {
		if err == service.ErrInvalidInvitation || err == service.ErrInvitationExpired {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(preview)
}

func (h *TenantHandler) ActivateTenant(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req ActivateTenantRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	tenancy, sessionID, err := h.tenantService.ActivateTenant(r.Context(), req.Token, req.Password)
	if err != nil {
		if err == service.ErrInvalidInvitation || err == service.ErrInvitationExpired || err == service.ErrInvitationAlreadyUsed || err == service.ErrWeakPassword {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get subject details for response
	subject, err := h.subjectRepo.GetByID(r.Context(), tenancy.TenantSubjectID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := ActivateTenantResponse{
		Tenancy: TenancyResponse{
			ID:                         tenancy.ID,
			TenantSubjectID:            tenancy.TenantSubjectID,
			UnitID:                     tenancy.UnitID,
			Status:                     tenancy.Status,
			LeaseStartDate:             tenancy.LeaseStartDate,
			LeaseEndDate:               tenancy.LeaseEndDate,
			InvitedByLandlordProfileID: tenancy.InvitedByLandlordProfileID,
			InvitationExpiresAt:        tenancy.InvitationExpiresAt,
			InvitationAcceptedAt:       tenancy.InvitationAcceptedAt,
			TerminatedAt:               tenancy.TerminatedAt,
			TerminationReason:          tenancy.TerminationReason,
			CreatedAt:                  tenancy.CreatedAt,
			UpdatedAt:                  tenancy.UpdatedAt,
		},
		SessionID: sessionID,
		SubjectID: subject.ID,
		Email:     subject.Email,
		Roles:     subject.Roles,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}

func (h *TenantHandler) RevokeInvitation(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
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

	tenancyID := r.URL.Query().Get("tenancy_id")
	if tenancyID == "" {
		http.Error(w, "tenancy_id required", http.StatusBadRequest)
		return
	}

	id, err := uuid.Parse(tenancyID)
	if err != nil {
		http.Error(w, "invalid tenancy id", http.StatusBadRequest)
		return
	}

	if err := h.tenantService.RevokeInvitation(r.Context(), subjectID, id); err != nil {
		if err == service.ErrUnauthorizedOperation {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *TenantHandler) ResendInvitation(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
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

	tenancyID := r.URL.Query().Get("tenancy_id")
	if tenancyID == "" {
		http.Error(w, "tenancy_id required", http.StatusBadRequest)
		return
	}

	id, err := uuid.Parse(tenancyID)
	if err != nil {
		http.Error(w, "invalid tenancy id", http.StatusBadRequest)
		return
	}

	newToken, err := h.tenantService.ResendInvitation(r.Context(), subjectID, id)
	if err != nil {
		if err == service.ErrUnauthorizedOperation {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": newToken})
}
