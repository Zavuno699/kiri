package handler

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/google/uuid"
	sharedhttp "github.com/kirilock/backend/shared/http"
	"github.com/kirilock/backend/shared/validation"

	"github.com/kirilock/backend/identity-service/internal/middleware"
	"github.com/kirilock/backend/identity-service/internal/repository"
)

var (
	ErrForbiddenProvisioning = errors.New("forbidden: super_admin role required")
)

// SecretProvider defines the interface for storing and retrieving device credentials
// This mirrors the device-service SecretProvider interface for consistency
type SecretProvider interface {
	StoreCredential(ctx context.Context, deviceID string, credentialType string, secret string) (string, error)
	GetCredential(ctx context.Context, reference string) (string, error)
	RevokeCredential(ctx context.Context, reference string) error
	DeleteCredential(ctx context.Context, reference string) error
}

// InMemorySecretProvider is a development implementation of SecretProvider
// WARNING: NOT suitable for production - secrets are stored in memory only
type InMemorySecretProvider struct {
	secrets map[string]string
}

func NewInMemorySecretProvider() *InMemorySecretProvider {
	return &InMemorySecretProvider{
		secrets: make(map[string]string),
	}
}

func (p *InMemorySecretProvider) StoreCredential(ctx context.Context, deviceID string, credentialType string, secret string) (string, error) {
	if secret == "" {
		return "", fmt.Errorf("secret cannot be empty")
	}

	reference := fmt.Sprintf("%s:%s:%s", deviceID, credentialType, generateReference())
	p.secrets[reference] = secret

	return reference, nil
}

func (p *InMemorySecretProvider) GetCredential(ctx context.Context, reference string) (string, error) {
	secret, exists := p.secrets[reference]
	if !exists {
		return "", fmt.Errorf("credential not found")
	}

	return secret, nil
}

func (p *InMemorySecretProvider) RevokeCredential(ctx context.Context, reference string) error {
	return p.DeleteCredential(ctx, reference)
}

func (p *InMemorySecretProvider) DeleteCredential(ctx context.Context, reference string) error {
	delete(p.secrets, reference)
	return nil
}

func generateReference() string {
	return uuid.New().String()
}

// ProvisionDeviceRequest represents the request to provision a new padlock device
type ProvisionDeviceRequest struct {
	DeviceType      string          `json:"device_type" validate:"required"`
	SerialNumber    string          `json:"serial_number" validate:"required"`
	Model           string          `json:"model" validate:"required"`
	FirmwareVersion string          `json:"firmware_version" validate:"required"`
	GatewayID       *string         `json:"gateway_id,omitempty"`
	Capabilities    map[string]bool `json:"capabilities"`
	CredentialType  string          `json:"credential_type" validate:"required"`
	CredentialValue string          `json:"credential_value" validate:"required"`
}

// ProvisionDeviceResponse represents the safe response (never contains secrets)
type ProvisionDeviceResponse struct {
	DeviceID      string    `json:"device_id"`
	SerialNumber  string    `json:"serial_number"`
	Status        string    `json:"status"`
	ProvisionedAt time.Time `json:"provisioned_at"`
}

// DeviceListResponse represents a list of devices (non-secret fields only)
type DeviceListResponse struct {
	Devices []DeviceListItem `json:"devices"`
	Total   int              `json:"total"`
}

// DeviceListItem represents a device in the list (no credentials)
type DeviceListItem struct {
	ID                string    `json:"id"`
	DeviceType        string    `json:"device_type"`
	SerialNumber      string    `json:"serial_number"`
	Model             string    `json:"model"`
	FirmwareVersion   string    `json:"firmware_version"`
	LifecycleState    string    `json:"lifecycle_state"`
	ConnectivityState string    `json:"connectivity_state"`
	CredentialStatus  string    `json:"credential_status"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`
}

// DeviceProvisioningHandler handles device provisioning operations
type DeviceProvisioningHandler struct {
	auditRepo      repository.AuditRepository
	secretProvider SecretProvider
	validator      *validation.Validator
	// In-memory device storage for development (would be device-service in production)
	devices map[string]DeviceListItem
}

// DeviceRecord represents a stored device record
type DeviceRecord struct {
	ID                  string
	DeviceType          string
	SerialNumber        string
	Model               string
	FirmwareVersion     string
	LifecycleState      string
	ConnectivityState   string
	CredentialReference string
	CredentialStatus    string
	CreatedAt           time.Time
	UpdatedAt           time.Time
}

// NewDeviceProvisioningHandler creates a new device provisioning handler
func NewDeviceProvisioningHandler(auditRepo repository.AuditRepository) (*DeviceProvisioningHandler, error) {
	if auditRepo == nil {
		return nil, errors.New("audit repository is required")
	}

	return &DeviceProvisioningHandler{
		auditRepo:      auditRepo,
		secretProvider: NewInMemorySecretProvider(),
		validator:      validation.New(),
		devices:        make(map[string]DeviceListItem),
	}, nil
}

// ProvisionDevice handles the secure provisioning of a new padlock device
// This endpoint requires super_admin role and never returns secrets
func (h *DeviceProvisioningHandler) ProvisionDevice(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Extract and verify principal
	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "unauthorized"})
		return
	}

	// Authorize: only super_admin can provision devices
	hasSuperAdmin := false
	for _, role := range principal.Roles {
		if role == "super_admin" {
			hasSuperAdmin = true
			break
		}
	}

	if !hasSuperAdmin {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"error": "insufficient permissions: super_admin role required"})
		return
	}

	// Decode request
	var req ProvisionDeviceRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Validate request
	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	// Validate device type
	validDeviceTypes := map[string]bool{
		"PADLOCK":    true,
		"GATEWAY":    true,
		"CONTROLLER": true,
	}
	if !validDeviceTypes[req.DeviceType] {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "invalid device type"})
		return
	}

	// Validate credential type
	validCredentialTypes := map[string]bool{
		"API_KEY":      true,
		"API_SECRET":   true,
		"ACCESS_TOKEN": true,
		"CERTIFICATE":  true,
	}
	if !validCredentialTypes[req.CredentialType] {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "invalid credential type"})
		return
	}

	// Validate credential value is not empty
	if req.CredentialValue == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "credential value is required"})
		return
	}

	// Generate device ID
	deviceID := uuid.New()
	actorID := uuid.MustParse(principal.Subject)
	now := time.Now().UTC()

	// Store credential securely using SecretProvider
	_, err = h.secretProvider.StoreCredential(r.Context(), deviceID.String(), req.CredentialType, req.CredentialValue)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "failed to store credential securely"})
		return
	}

	// Store device record (in-memory for development, would be device-service in production)
	deviceRecord := DeviceListItem{
		ID:                deviceID.String(),
		DeviceType:        req.DeviceType,
		SerialNumber:      req.SerialNumber,
		Model:             req.Model,
		FirmwareVersion:   req.FirmwareVersion,
		LifecycleState:    "PROVISIONED",
		ConnectivityState: "UNKNOWN",
		CredentialStatus:  "ACTIVE",
		CreatedAt:         now,
		UpdatedAt:         now,
	}
	h.devices[deviceID.String()] = deviceRecord

	// Log audit event with safe metadata only (NEVER the secret)
	err = h.auditRepo.LogEvent(
		r.Context(),
		"DEVICE_PROVISIONED",
		actorID,
		"device",
		&deviceID,
		map[string]interface{}{
			"previous_state": nil,
		},
		map[string]interface{}{
			"device_type":      req.DeviceType,
			"serial_number":    req.SerialNumber,
			"model":            req.Model,
			"firmware_version": req.FirmwareVersion,
			"credential_type":  req.CredentialType,
			// NEVER include credential_value or credential_reference
		},
		generateCorrelationID(),
		r.RemoteAddr,
		r.UserAgent(),
		true,
		"",
	)

	if err != nil {
		// Log failure but don't fail the provisioning operation
		// In production, this should be handled more robustly
		http.Error(w, "audit logging failed", http.StatusInternalServerError)
		return
	}

	// Return safe response (NEVER include secret or reference)
	response := ProvisionDeviceResponse{
		DeviceID:      deviceID.String(),
		SerialNumber:  req.SerialNumber,
		Status:        "PROVISIONED",
		ProvisionedAt: now,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}

// ListDevices returns a list of all devices (non-secret fields only)
// This endpoint requires super_admin role
func (h *DeviceProvisioningHandler) ListDevices(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Extract and verify principal
	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "unauthorized"})
		return
	}

	// Authorize: only super_admin can list all devices
	hasSuperAdmin := false
	for _, role := range principal.Roles {
		if role == "super_admin" {
			hasSuperAdmin = true
			break
		}
	}

	if !hasSuperAdmin {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"error": "insufficient permissions: super_admin role required"})
		return
	}

	// Convert device map to slice
	devices := make([]DeviceListItem, 0, len(h.devices))
	for _, device := range h.devices {
		devices = append(devices, device)
	}

	response := DeviceListResponse{
		Devices: devices,
		Total:   len(devices),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

// Helper functions

func generateCorrelationID() string {
	b := make([]byte, 16)
	rand.Read(b)
	return base64.URLEncoding.EncodeToString(b)
}
