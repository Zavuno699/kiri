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

type AssignmentHandler struct {
	assignmentService *service.AssignmentService
	validator         *validation.Validator
}

type AssignLockRequest struct {
	LockID uuid.UUID `json:"lock_id" validate:"required"`
	UnitID uuid.UUID `json:"unit_id" validate:"required"`
	Notes  string    `json:"notes"`
}

type UnassignLockRequest struct {
	LockID uuid.UUID `json:"lock_id" validate:"required"`
	Notes  string    `json:"notes"`
}

type ReassignLockRequest struct {
	LockID     uuid.UUID `json:"lock_id" validate:"required"`
	FromUnitID uuid.UUID `json:"from_unit_id" validate:"required"`
	ToUnitID   uuid.UUID `json:"to_unit_id" validate:"required"`
	Notes      string    `json:"notes"`
}

type AssignmentResponse struct {
	ID            uuid.UUID                  `json:"id"`
	LockID        uuid.UUID                  `json:"lock_id"`
	UnitID        uuid.UUID                  `json:"unit_id"`
	Status        model.LockAssignmentStatus `json:"status"`
	AssignedAt    string                     `json:"assigned_at"`
	DeactivatedAt *string                    `json:"deactivated_at,omitempty"`
	Notes         string                     `json:"notes"`
	CreatedAt     string                     `json:"created_at"`
	UpdatedAt     string                     `json:"updated_at"`
}

func NewAssignmentHandler(assignmentService *service.AssignmentService) (*AssignmentHandler, error) {
	if assignmentService == nil {
		return nil, errors.New("assignment service is required")
	}

	return &AssignmentHandler{
		assignmentService: assignmentService,
		validator:         validation.New(),
	}, nil
}

func (h *AssignmentHandler) AssignLock(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req AssignLockRequest
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

	actorSubjectID, err := uuid.Parse(principal.Subject)
	if err != nil {
		http.Error(w, "invalid subject id", http.StatusBadRequest)
		return
	}

	assignment, err := h.assignmentService.AssignLockToUnit(r.Context(), actorSubjectID, req.LockID, req.UnitID, req.Notes)
	if err != nil {
		if err == service.ErrUnauthorizedAssignment {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		if err == service.ErrLockAlreadyAssigned || err == service.ErrUnitAlreadyAssigned {
			http.Error(w, err.Error(), http.StatusConflict)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := AssignmentResponse{
		ID:            assignment.ID,
		LockID:        assignment.LockID,
		UnitID:        assignment.UnitID,
		Status:        assignment.Status,
		AssignedAt:    assignment.AssignedAt.Format(time.RFC3339),
		DeactivatedAt: formatTimePtr(assignment.DeactivatedAt),
		Notes:         assignment.Notes,
		CreatedAt:     assignment.CreatedAt.Format(time.RFC3339),
		UpdatedAt:     assignment.UpdatedAt.Format(time.RFC3339),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}

func (h *AssignmentHandler) UnassignLock(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req UnassignLockRequest
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

	actorSubjectID, err := uuid.Parse(principal.Subject)
	if err != nil {
		http.Error(w, "invalid subject id", http.StatusBadRequest)
		return
	}

	if err := h.assignmentService.UnassignLock(r.Context(), actorSubjectID, req.LockID, req.Notes); err != nil {
		if err == service.ErrUnauthorizedAssignment {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		if err == service.ErrAssignmentNotFound {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *AssignmentHandler) ReassignLock(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req ReassignLockRequest
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

	actorSubjectID, err := uuid.Parse(principal.Subject)
	if err != nil {
		http.Error(w, "invalid subject id", http.StatusBadRequest)
		return
	}

	assignment, err := h.assignmentService.ReassignLock(r.Context(), actorSubjectID, req.LockID, req.FromUnitID, req.ToUnitID, req.Notes)
	if err != nil {
		if err == service.ErrUnauthorizedAssignment {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		if err == service.ErrAssignmentNotFound {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := AssignmentResponse{
		ID:            assignment.ID,
		LockID:        assignment.LockID,
		UnitID:        assignment.UnitID,
		Status:        assignment.Status,
		AssignedAt:    assignment.AssignedAt.Format(time.RFC3339),
		DeactivatedAt: formatTimePtr(assignment.DeactivatedAt),
		Notes:         assignment.Notes,
		CreatedAt:     assignment.CreatedAt.Format(time.RFC3339),
		UpdatedAt:     assignment.UpdatedAt.Format(time.RFC3339),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (h *AssignmentHandler) GetLockAssignments(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	actorSubjectID, err := uuid.Parse(principal.Subject)
	if err != nil {
		http.Error(w, "invalid subject id", http.StatusBadRequest)
		return
	}

	lockID := r.URL.Query().Get("lock_id")
	if lockID == "" {
		http.Error(w, "lock_id required", http.StatusBadRequest)
		return
	}

	id, err := uuid.Parse(lockID)
	if err != nil {
		http.Error(w, "invalid lock id", http.StatusBadRequest)
		return
	}

	assignments, err := h.assignmentService.GetLockAssignments(r.Context(), actorSubjectID, id)
	if err != nil {
		if err == service.ErrUnauthorizedAssignment {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var responses []AssignmentResponse
	for _, assignment := range assignments {
		responses = append(responses, AssignmentResponse{
			ID:            assignment.ID,
			LockID:        assignment.LockID,
			UnitID:        assignment.UnitID,
			Status:        assignment.Status,
			AssignedAt:    assignment.AssignedAt.Format(time.RFC3339),
			DeactivatedAt: formatTimePtr(assignment.DeactivatedAt),
			Notes:         assignment.Notes,
			CreatedAt:     assignment.CreatedAt.Format(time.RFC3339),
			UpdatedAt:     assignment.UpdatedAt.Format(time.RFC3339),
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(responses)
}

func (h *AssignmentHandler) GetUnitAssignments(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	actorSubjectID, err := uuid.Parse(principal.Subject)
	if err != nil {
		http.Error(w, "invalid subject id", http.StatusBadRequest)
		return
	}

	unitID := r.URL.Query().Get("unit_id")
	if unitID == "" {
		http.Error(w, "unit_id required", http.StatusBadRequest)
		return
	}

	id, err := uuid.Parse(unitID)
	if err != nil {
		http.Error(w, "invalid unit id", http.StatusBadRequest)
		return
	}

	assignments, err := h.assignmentService.GetUnitAssignments(r.Context(), actorSubjectID, id)
	if err != nil {
		if err == service.ErrUnauthorizedAssignment {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var responses []AssignmentResponse
	for _, assignment := range assignments {
		responses = append(responses, AssignmentResponse{
			ID:            assignment.ID,
			LockID:        assignment.LockID,
			UnitID:        assignment.UnitID,
			Status:        assignment.Status,
			AssignedAt:    assignment.AssignedAt.Format(time.RFC3339),
			DeactivatedAt: formatTimePtr(assignment.DeactivatedAt),
			Notes:         assignment.Notes,
			CreatedAt:     assignment.CreatedAt.Format(time.RFC3339),
			UpdatedAt:     assignment.UpdatedAt.Format(time.RFC3339),
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(responses)
}

func formatTimePtr(t *time.Time) *string {
	if t == nil {
		return nil
	}
	formatted := t.Format(time.RFC3339)
	return &formatted
}
