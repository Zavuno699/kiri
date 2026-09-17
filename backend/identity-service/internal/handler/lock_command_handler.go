package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/identity-service/internal/client"
	"github.com/kirilock/backend/identity-service/internal/middleware"
	"github.com/kirilock/backend/identity-service/internal/model"
	"github.com/kirilock/backend/identity-service/internal/repository"
	"github.com/kirilock/backend/identity-service/internal/service"
)

type LockCommandRequest struct {
	LockID    uuid.UUID `json:"lock_id"`
	Operation string    `json:"operation"` // "lock", "unlock"
}

type LockCommandResponse struct {
	Authorized bool      `json:"authorized"`
	Reason     string    `json:"reason,omitempty"`
	TenancyID  uuid.UUID `json:"tenancy_id,omitempty"`
	UnitID     uuid.UUID `json:"unit_id,omitempty"`
}

type LockCommandHandler struct {
	lockAuthorizer     service.LockAuthorizer
	auditRepo          repository.AuditRepository
	lockCommandRepo    repository.LockCommandRepository
	lockRepo           repository.LockRepository
	lockAssignmentRepo repository.LockAssignmentRepository
	unitRepo           repository.UnitRepository
	propertyRepo       repository.PropertyRepository
	landlordRepo       repository.LandlordProfileRepository
	deviceClient       *client.DeviceClient
}

func NewLockCommandHandler(
	lockAuthorizer service.LockAuthorizer,
	auditRepo repository.AuditRepository,
	lockCommandRepo repository.LockCommandRepository,
	lockRepo repository.LockRepository,
	lockAssignmentRepo repository.LockAssignmentRepository,
	unitRepo repository.UnitRepository,
	propertyRepo repository.PropertyRepository,
	landlordRepo repository.LandlordProfileRepository,
	deviceClient *client.DeviceClient,
) (*LockCommandHandler, error) {
	if lockAuthorizer == nil {
		return nil, errors.New("lock authorizer is required")
	}
	if auditRepo == nil {
		return nil, errors.New("audit repository is required")
	}
	if lockCommandRepo == nil {
		return nil, errors.New("lock command repository is required")
	}
	if lockRepo == nil {
		return nil, errors.New("lock repository is required")
	}
	if lockAssignmentRepo == nil {
		return nil, errors.New("lock assignment repository is required")
	}
	if unitRepo == nil {
		return nil, errors.New("unit repository is required")
	}
	if propertyRepo == nil {
		return nil, errors.New("property repository is required")
	}
	if landlordRepo == nil {
		return nil, errors.New("landlord repository is required")
	}

	return &LockCommandHandler{
		lockAuthorizer:     lockAuthorizer,
		auditRepo:          auditRepo,
		lockCommandRepo:    lockCommandRepo,
		lockRepo:           lockRepo,
		lockAssignmentRepo: lockAssignmentRepo,
		unitRepo:           unitRepo,
		propertyRepo:       propertyRepo,
		landlordRepo:       landlordRepo,
		deviceClient:       deviceClient,
	}, nil
}

func (h *LockCommandHandler) HandleLockCommand(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Derive authenticated subject from principal (never trust client-supplied tenant ID)
	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	// Parse subject UUID from principal.Subject string
	subjectID, err := uuid.Parse(principal.Subject)
	if err != nil {
		http.Error(w, "invalid subject identifier", http.StatusBadRequest)
		return
	}

	var req LockCommandRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.LockID == uuid.Nil {
		http.Error(w, "lock_id is required", http.StatusBadRequest)
		return
	}

	if req.Operation == "" {
		http.Error(w, "operation is required", http.StatusBadRequest)
		return
	}

	// Generate idempotency key from request signature
	idempotencyKey := generateIdempotencyKey(subjectID, req.LockID, req.Operation)

	// Check for duplicate command (idempotency)
	existing, err := h.lockCommandRepo.GetByIdempotencyKey(r.Context(), idempotencyKey)
	if err == nil {
		// Duplicate request - return existing command status
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(LockCommandResponse{
			Authorized: existing.Status == model.LockCommandAuthorized || existing.Status == model.LockCommandDispatched,
			Reason:     "duplicate request",
		})
		return
	}

	// Authorize before dispatch
	authResult, err := h.lockAuthorizer.AuthorizeLockOperation(r.Context(), service.LockAuthorizationRequest{
		TenantSubjectID: subjectID,
		LockID:          req.LockID,
		Operation:       req.Operation,
	})
	if err != nil {
		http.Error(w, "authorization check failed", http.StatusInternalServerError)
		return
	}

	// Create command record
	correlationID := uuid.New()
	command := model.LockCommand{
		ID:                  uuid.New(),
		LockID:              req.LockID,
		Operation:           req.Operation,
		Status:              model.LockCommandRequested,
		TenantSubjectID:     &subjectID,
		TenancyID:           &authResult.TenancyID,
		UnitID:              &authResult.UnitID,
		AuthorizationReason: authResult.Reason,
		IdempotencyKey:      idempotencyKey,
		CorrelationID:       &correlationID,
		CreatedAt:           time.Now(),
		UpdatedAt:           time.Now(),
		Version:             1,
	}

	// Update command status based on authorization
	if authResult.Authorized {
		command.Status = model.LockCommandAuthorized
	} else {
		command.Status = model.LockCommandDenied
	}

	if err := h.lockCommandRepo.Create(r.Context(), command); err != nil {
		http.Error(w, "failed to create command", http.StatusInternalServerError)
		return
	}

	// Audit authorization outcome
	eventType := "lock.denied"
	if authResult.Authorized {
		eventType = "lock.authorized"
	}

	_ = h.auditRepo.LogEvent(r.Context(), eventType, subjectID, "lock", &req.LockID, nil, map[string]interface{}{
		"operation":      req.Operation,
		"command_id":     command.ID,
		"tenancy_id":     authResult.TenancyID,
		"unit_id":        authResult.UnitID,
		"correlation_id": correlationID,
	}, "", "", "", authResult.Authorized, authResult.Reason)

	// Only on authorization success, dispatch to device-service
	if !authResult.Authorized {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(LockCommandResponse{
			Authorized: false,
			Reason:     authResult.Reason,
		})
		return
	}

	// Dispatch to device-service via internal HTTP
	// Get lock to retrieve device_id
	lock, err := h.lockRepo.GetByID(r.Context(), req.LockID)
	if err != nil {
		// Lock not found - fail the command
		command.Status = model.LockCommandFailed
		command.FailureReason = "lock not found"
		_ = h.lockCommandRepo.Update(r.Context(), command)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(LockCommandResponse{
			Authorized: false,
			Reason:     "lock not found",
		})
		return
	}

	dispatched := false
	dispatchError := ""

	if h.deviceClient != nil {
		// Dispatch to device-service
		deviceReq := client.DeviceCommandRequest{
			DeviceID: lock.DeviceID.String(),
			Command:  req.Operation,
			Payload:  []byte{}, // Empty payload for now
		}

		_, err := h.deviceClient.SendCommand(r.Context(), deviceReq)
		if err != nil {
			dispatchError = err.Error()
		} else {
			dispatched = true
		}
	}

	// Update command status based on dispatch
	if dispatched {
		command.Status = model.LockCommandDispatched
		now := time.Now()
		command.DispatchedAt = &now
	} else {
		command.Status = model.LockCommandFailed
		command.FailureReason = dispatchError
	}

	if err := h.lockCommandRepo.Update(r.Context(), command); err != nil {
		// Log but don't fail the response
		_ = h.auditRepo.LogEvent(r.Context(), "lock.dispatch_failed", subjectID, "lock", &req.LockID, nil, map[string]interface{}{
			"command_id":     command.ID,
			"error":          err.Error(),
			"correlation_id": correlationID,
		}, "", "", "", false, "failed to update command status after dispatch")
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(LockCommandResponse{
		Authorized: dispatched,
		TenancyID:  authResult.TenancyID,
		UnitID:     authResult.UnitID,
	})
}

func (h *LockCommandHandler) HandleLandlordLockCommand(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Derive authenticated subject from principal
	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	// Parse subject UUID from principal.Subject string
	subjectID, err := uuid.Parse(principal.Subject)
	if err != nil {
		http.Error(w, "invalid subject identifier", http.StatusBadRequest)
		return
	}

	var req LockCommandRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.LockID == uuid.Nil {
		http.Error(w, "lock_id is required", http.StatusBadRequest)
		return
	}

	if req.Operation == "" {
		http.Error(w, "operation is required", http.StatusBadRequest)
		return
	}

	// Verify landlord owns the lock's property via lock assignment
	assignment, err := h.lockAssignmentRepo.GetActiveByLockID(r.Context(), req.LockID)
	if err != nil || assignment == nil {
		http.Error(w, "lock not assigned", http.StatusForbidden)
		return
	}

	// Get unit to verify property ownership
	unit, err := h.unitRepo.GetByID(r.Context(), assignment.UnitID)
	if err != nil {
		http.Error(w, "failed to verify ownership", http.StatusInternalServerError)
		return
	}

	// Get property to verify landlord ownership
	property, err := h.propertyRepo.GetByID(r.Context(), unit.PropertyID)
	if err != nil {
		http.Error(w, "failed to verify ownership", http.StatusInternalServerError)
		return
	}

	// Get landlord profile for subject
	landlordProfile, err := h.landlordRepo.GetBySubjectID(r.Context(), subjectID)
	if err != nil {
		http.Error(w, "landlord profile not found", http.StatusForbidden)
		return
	}

	// Verify landlord owns the property
	if property.LandlordProfileID != landlordProfile.ID {
		http.Error(w, "not authorized: lock not owned by landlord", http.StatusForbidden)
		return
	}

	// Create command record (landlord commands are pre-authorized)
	correlationID := uuid.New()
	idempotencyKey := generateIdempotencyKey(subjectID, req.LockID, req.Operation)

	command := model.LockCommand{
		ID:                  uuid.New(),
		LockID:              req.LockID,
		Operation:           req.Operation,
		Status:              model.LockCommandAuthorized,
		TenantSubjectID:     &subjectID,
		TenancyID:           nil, // Landlord commands have no tenancy
		UnitID:              &assignment.UnitID,
		AuthorizationReason: "landlord authorized",
		IdempotencyKey:      idempotencyKey,
		CorrelationID:       &correlationID,
		CreatedAt:           time.Now(),
		UpdatedAt:           time.Now(),
		Version:             1,
	}

	if err := h.lockCommandRepo.Create(r.Context(), command); err != nil {
		http.Error(w, "failed to create command", http.StatusInternalServerError)
		return
	}

	// Audit landlord authorization
	_ = h.auditRepo.LogEvent(r.Context(), "lock.authorized", subjectID, "lock", &req.LockID, nil, map[string]interface{}{
		"operation":      req.Operation,
		"command_id":     command.ID,
		"actor_type":     "landlord",
		"unit_id":        assignment.UnitID,
		"correlation_id": correlationID,
	}, "", "", "", true, "landlord authorized")

	// Dispatch to device-service via internal HTTP
	lock, err := h.lockRepo.GetByID(r.Context(), req.LockID)
	if err != nil {
		command.Status = model.LockCommandFailed
		command.FailureReason = "lock not found"
		_ = h.lockCommandRepo.Update(r.Context(), command)
		http.Error(w, "lock not found", http.StatusNotFound)
		return
	}

	dispatched := false
	dispatchError := ""

	if h.deviceClient != nil {
		deviceReq := client.DeviceCommandRequest{
			DeviceID: lock.DeviceID.String(),
			Command:  req.Operation,
			Payload:  []byte{},
		}

		_, err := h.deviceClient.SendCommand(r.Context(), deviceReq)
		if err != nil {
			dispatchError = err.Error()
		} else {
			dispatched = true
		}
	}

	if dispatched {
		command.Status = model.LockCommandDispatched
		now := time.Now()
		command.DispatchedAt = &now
	} else {
		command.Status = model.LockCommandFailed
		command.FailureReason = dispatchError
	}

	if err := h.lockCommandRepo.Update(r.Context(), command); err != nil {
		_ = h.auditRepo.LogEvent(r.Context(), "lock.dispatch_failed", subjectID, "lock", &req.LockID, nil, map[string]interface{}{
			"command_id":     command.ID,
			"error":          err.Error(),
			"correlation_id": correlationID,
		}, "", "", "", false, "failed to update command status after dispatch")
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(LockCommandResponse{
		Authorized: dispatched,
		UnitID:     assignment.UnitID,
	})
}

func generateIdempotencyKey(subjectID, lockID uuid.UUID, operation string) string {
	return subjectID.String() + ":" + lockID.String() + ":" + operation
}
