package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	sharedhttp "github.com/kirilock/backend/shared/http"
	"github.com/kirilock/backend/shared/validation"

	"github.com/kirilock/backend/identity-service/internal/middleware"
	"github.com/kirilock/backend/identity-service/internal/service"
)

type CreateSessionRequest struct {
	SubjectID    string `json:"subject_id" validate:"required"`
	CredentialID string `json:"credential_id" validate:"required"`
	ExpiresIn    int64  `json:"expires_in,omitempty"` // seconds
}

type SessionResponse struct {
	ID           string    `json:"id"`
	SubjectID    string    `json:"subject_id"`
	CredentialID string    `json:"credential_id"`
	SessionID    string    `json:"session_id"`
	RevocationID string    `json:"revocation_id"`
	IssuedAt     time.Time `json:"issued_at"`
	ExpiresAt    time.Time `json:"expires_at"`
}

type SessionHandler struct {
	sessionService *service.SessionService
	validator      *validation.Validator
}

func NewSessionHandler(sessionService *service.SessionService) (*SessionHandler, error) {
	if sessionService == nil {
		return nil, errors.New("session service is required")
	}

	return &SessionHandler{
		sessionService: sessionService,
		validator:      validation.New(),
	}, nil
}

func (h *SessionHandler) CreateSession(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req CreateSessionRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	expiresIn := 24 * time.Hour
	if req.ExpiresIn > 0 {
		expiresIn = time.Duration(req.ExpiresIn) * time.Second
	}

	session, err := h.sessionService.CreateSession(
		r.Context(),
		req.SubjectID,
		req.CredentialID,
		expiresIn,
	)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "failed to create session"})
		return
	}

	response := SessionResponse{
		ID:           session.ID,
		SubjectID:    session.SubjectID,
		CredentialID: session.CredentialID,
		SessionID:    session.SessionID,
		RevocationID: session.RevocationID,
		IssuedAt:     session.IssuedAt,
		ExpiresAt:    session.ExpiresAt,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}

type ValidateSessionRequest struct {
	SessionID string `json:"session_id" validate:"required"`
}

func (h *SessionHandler) ValidateSession(w http.ResponseWriter, r *http.Request) {
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

	var req ValidateSessionRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	session, err := h.sessionService.ValidateSession(r.Context(), req.SessionID)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "invalid session"})
		return
	}

	if session.SubjectID != principal.Subject {
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
	}

	response := SessionResponse{
		ID:           session.ID,
		SubjectID:    session.SubjectID,
		CredentialID: session.CredentialID,
		SessionID:    session.SessionID,
		RevocationID: session.RevocationID,
		IssuedAt:     session.IssuedAt,
		ExpiresAt:    session.ExpiresAt,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

type RevokeSessionRequest struct {
	SessionID string `json:"session_id" validate:"required"`
}

func (h *SessionHandler) RevokeSession(w http.ResponseWriter, r *http.Request) {
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

	var req RevokeSessionRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	session, err := h.sessionService.ValidateSession(r.Context(), req.SessionID)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "invalid session"})
		return
	}

	if session.SubjectID != principal.Subject {
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
	}

	if err := h.sessionService.RevokeSession(
		r.Context(),
		req.SessionID,
	); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "failed to revoke session"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func (h *SessionHandler) RevokeAllSubjectSessions(w http.ResponseWriter, r *http.Request) {
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

	actorID := principal.Subject

	if err := h.sessionService.RevokeAllSubjectSessions(
		r.Context(),
		actorID,
	); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "failed to revoke sessions"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}
