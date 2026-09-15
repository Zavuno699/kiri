package handler

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/google/uuid"
	sharedhttp "github.com/kirilock/backend/shared/http"
	"github.com/kirilock/backend/shared/validation"

	"github.com/kirilock/backend/identity-service/internal/middleware"
	"github.com/kirilock/backend/identity-service/internal/service"
)

var (
	ErrUnauthorized = errors.New("unauthorized")
	ErrForbidden    = errors.New("forbidden")
)

type CreateSubjectRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8"`
}

type SubjectResponse struct {
	ID           uuid.UUID `json:"id"`
	SubjectID    string    `json:"subject_id"`
	Email        string    `json:"email"`
	Roles        []string  `json:"roles"`
	IsAdmin      bool      `json:"is_admin"`
	IsSuperAdmin bool      `json:"is_super_admin"`
}

type SubjectHandler struct {
	subjectService *service.SubjectService
	validator      *validation.Validator
}

func NewSubjectHandler(subjectService *service.SubjectService) (*SubjectHandler, error) {
	if subjectService == nil {
		return nil, errors.New("subject service is required")
	}

	return &SubjectHandler{
		subjectService: subjectService,
		validator:      validation.New(),
	}, nil
}

func (h *SubjectHandler) CreateSubject(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req CreateSubjectRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	subject, err := h.subjectService.CreateSubject(
		r.Context(),
		req.Email,
		req.Password,
		nil,   // No roles allowed in public registration
		false, // No admin flag allowed
		false, // No super admin flag allowed
	)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "failed to create subject"})
		return
	}

	response := SubjectResponse{
		ID:           subject.ID,
		SubjectID:    subject.SubjectID,
		Email:        subject.Email,
		Roles:        subject.Roles,
		IsAdmin:      subject.IsAdmin,
		IsSuperAdmin: subject.IsSuperAdmin,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}

type AuthenticateRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type AuthenticateResponse struct {
	SubjectID    string   `json:"subject_id"`
	Email        string   `json:"email"`
	Roles        []string `json:"roles"`
	IsAdmin      bool     `json:"is_admin"`
	IsSuperAdmin bool     `json:"is_super_admin"`
}

func (h *SubjectHandler) Authenticate(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req AuthenticateRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	subject, err := h.subjectService.VerifyPassword(
		r.Context(),
		req.Email,
		req.Password,
	)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "authentication failed"})
		return
	}

	response := AuthenticateResponse{
		SubjectID:    subject.SubjectID,
		Email:        subject.Email,
		Roles:        subject.Roles,
		IsAdmin:      subject.IsAdmin,
		IsSuperAdmin: subject.IsSuperAdmin,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

type SetAdminRequest struct {
	TargetID uuid.UUID `json:"target_id" validate:"required"`
	IsAdmin  bool      `json:"is_admin" validate:"required"`
}

func (h *SubjectHandler) SetAdmin(w http.ResponseWriter, r *http.Request) {
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

	var req SetAdminRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	actorID := uuid.MustParse(principal.Subject)

	hasAdminRole := false
	for _, role := range principal.Roles {
		if role == "super_admin" {
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

	if err := h.subjectService.SetAdmin(
		r.Context(),
		actorID,
		req.TargetID,
		req.IsAdmin,
	); err != nil {
		if errors.Is(err, service.ErrAdminSelfDemotion) {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusForbidden)
			json.NewEncoder(w).Encode(map[string]string{"error": "cannot demote self from admin"})
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "failed to set admin status"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

type SetSuperAdminRequest struct {
	TargetID     uuid.UUID `json:"target_id" validate:"required"`
	IsSuperAdmin bool      `json:"is_super_admin" validate:"required"`
}

func (h *SubjectHandler) SetSuperAdmin(w http.ResponseWriter, r *http.Request) {
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

	var req SetSuperAdminRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	actorID := uuid.MustParse(principal.Subject)

	hasSuperAdminRole := false
	for _, role := range principal.Roles {
		if role == "super_admin" {
			hasSuperAdminRole = true
			break
		}
	}

	if !hasSuperAdminRole {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"error": "insufficient permissions"})
		return
	}

	if err := h.subjectService.SetSuperAdmin(
		r.Context(),
		actorID,
		req.TargetID,
		req.IsSuperAdmin,
	); err != nil {
		if errors.Is(err, service.ErrSuperAdminSelfDemotion) {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusForbidden)
			json.NewEncoder(w).Encode(map[string]string{"error": "cannot demote self from super admin"})
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "failed to set super admin status"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}
