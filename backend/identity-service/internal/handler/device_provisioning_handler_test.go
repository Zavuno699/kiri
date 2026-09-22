package handler

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/google/uuid"
	"github.com/kirilock/backend/identity-service/internal/client"
	"github.com/kirilock/backend/identity-service/internal/middleware"
)

// MockAuditRepository is a mock implementation of AuditRepository for testing
type MockAuditRepository struct {
	events []AuditEvent
}

type AuditEvent struct {
	EventType     string
	ActorID       uuid.UUID
	ResourceType  string
	ResourceID    *uuid.UUID
	NewValues     map[string]interface{}
	CorrelationID string
	Success       bool
}

func (m *MockAuditRepository) LogEvent(
	ctx context.Context,
	eventType string,
	actorID uuid.UUID,
	resourceType string,
	resourceID *uuid.UUID,
	oldValues map[string]interface{},
	newValues map[string]interface{},
	correlationID string,
	ipAddress string,
	userAgent string,
	success bool,
	errorMessage string,
) error {
	// Verify that secret is never in newValues
	if newValues != nil {
		if _, hasSecret := newValues["credential_value"]; hasSecret {
			panic("SECURITY VIOLATION: credential_value found in audit log")
		}
		if _, hasReference := newValues["credential_reference"]; hasReference {
			panic("SECURITY VIOLATION: credential_reference found in audit log")
		}
	}

	m.events = append(m.events, AuditEvent{
		EventType:     eventType,
		ActorID:       actorID,
		ResourceType:  resourceType,
		ResourceID:    resourceID,
		NewValues:     newValues,
		CorrelationID: correlationID,
		Success:       success,
	})
	return nil
}

func (m *MockAuditRepository) LogAdminAction(
	ctx context.Context,
	eventType string,
	resourceType string,
	resourceID *uuid.UUID,
	actorID uuid.UUID,
	details map[string]interface{},
) error {
	return m.LogEvent(
		ctx,
		eventType,
		actorID,
		resourceType,
		resourceID,
		nil,
		details,
		"",
		"",
		"",
		true,
		"",
	)
}

func TestProvisionDevice_SuperAdmin_Success(t *testing.T) {
	mockAudit := &MockAuditRepository{}
	handler, err := NewDeviceProvisioningHandler(mockAudit)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	// Create a request with valid data
	reqBody := ProvisionDeviceRequest{
		DeviceType:      "PADLOCK",
		SerialNumber:    "SN123456",
		Model:           "KiriLock Pro",
		FirmwareVersion: "1.0.0",
		Capabilities: map[string]bool{
			"remote_lock":   true,
			"remote_unlock": true,
		},
		CredentialType:  "API_KEY",
		CredentialValue: "test-secret-key-12345",
	}

	body, _ := json.Marshal(reqBody)
	req := httptest.NewRequest(http.MethodPost, "/admin/devices/provision", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	// Create a context with super_admin principal
	principal := client.Principal{
		Subject:  uuid.New().String(),
		Roles:    []string{"super_admin"},
		TenantID: "",
	}
	ctx := middleware.WithPrincipal(context.Background(), principal)
	req = req.WithContext(ctx)

	// Create response recorder
	w := httptest.NewRecorder()

	// Call the handler
	handler.ProvisionDevice(w, req)

	// Check response
	if w.Code != http.StatusCreated {
		t.Errorf("expected status %d, got %d", http.StatusCreated, w.Code)
	}

	var response ProvisionDeviceResponse
	if err := json.Unmarshal(w.Body.Bytes(), &response); err != nil {
		t.Fatalf("failed to unmarshal response: %v", err)
	}

	// Verify response does not contain secret
	if response.DeviceID == "" {
		t.Error("device ID should not be empty")
	}
	if response.SerialNumber != reqBody.SerialNumber {
		t.Errorf("expected serial number %s, got %s", reqBody.SerialNumber, response.SerialNumber)
	}
	if response.Status != "PROVISIONED" {
		t.Errorf("expected status PROVISIONED, got %s", response.Status)
	}

	// Verify audit event was logged
	if len(mockAudit.events) != 1 {
		t.Errorf("expected 1 audit event, got %d", len(mockAudit.events))
	}

	event := mockAudit.events[0]
	if event.EventType != "DEVICE_PROVISIONED" {
		t.Errorf("expected event type DEVICE_PROVISIONED, got %s", event.EventType)
	}
	if event.ResourceType != "device" {
		t.Errorf("expected resource type device, got %s", event.ResourceType)
	}

	// Verify audit event does not contain secret
	if _, hasSecret := event.NewValues["credential_value"]; hasSecret {
		t.Error("SECURITY VIOLATION: credential_value found in audit event")
	}
	if _, hasReference := event.NewValues["credential_reference"]; hasReference {
		t.Error("SECURITY VIOLATION: credential_reference found in audit event")
	}
}

func TestProvisionDevice_Landlord_Forbidden(t *testing.T) {
	mockAudit := &MockAuditRepository{}
	handler, err := NewDeviceProvisioningHandler(mockAudit)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	reqBody := ProvisionDeviceRequest{
		DeviceType:      "PADLOCK",
		SerialNumber:    "SN123456",
		Model:           "KiriLock Pro",
		FirmwareVersion: "1.0.0",
		CredentialType:  "API_KEY",
		CredentialValue: "test-secret-key-12345",
	}

	body, _ := json.Marshal(reqBody)
	req := httptest.NewRequest(http.MethodPost, "/admin/devices/provision", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	// Create a context with landlord principal (not super_admin)
	principal := client.Principal{
		Subject:  uuid.New().String(),
		Roles:    []string{"landlord"},
		TenantID: "",
	}
	ctx := middleware.WithPrincipal(context.Background(), principal)
	req = req.WithContext(ctx)

	w := httptest.NewRecorder()
	handler.ProvisionDevice(w, req)

	// Should return 403 Forbidden
	if w.Code != http.StatusForbidden {
		t.Errorf("expected status %d, got %d", http.StatusForbidden, w.Code)
	}

	// Verify no audit event was logged (operation was rejected)
	if len(mockAudit.events) != 0 {
		t.Errorf("expected 0 audit events, got %d", len(mockAudit.events))
	}
}

func TestProvisionDevice_Tenant_Forbidden(t *testing.T) {
	mockAudit := &MockAuditRepository{}
	handler, err := NewDeviceProvisioningHandler(mockAudit)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	reqBody := ProvisionDeviceRequest{
		DeviceType:      "PADLOCK",
		SerialNumber:    "SN123456",
		Model:           "KiriLock Pro",
		FirmwareVersion: "1.0.0",
		CredentialType:  "API_KEY",
		CredentialValue: "test-secret-key-12345",
	}

	body, _ := json.Marshal(reqBody)
	req := httptest.NewRequest(http.MethodPost, "/admin/devices/provision", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	// Create a context with tenant principal (not super_admin)
	principal := client.Principal{
		Subject:  uuid.New().String(),
		Roles:    []string{"tenant"},
		TenantID: "",
	}
	ctx := middleware.WithPrincipal(context.Background(), principal)
	req = req.WithContext(ctx)

	w := httptest.NewRecorder()
	handler.ProvisionDevice(w, req)

	// Should return 403 Forbidden
	if w.Code != http.StatusForbidden {
		t.Errorf("expected status %d, got %d", http.StatusForbidden, w.Code)
	}

	// Verify no audit event was logged
	if len(mockAudit.events) != 0 {
		t.Errorf("expected 0 audit events, got %d", len(mockAudit.events))
	}
}

func TestProvisionDevice_Unauthorized_NoPrincipal(t *testing.T) {
	mockAudit := &MockAuditRepository{}
	handler, err := NewDeviceProvisioningHandler(mockAudit)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	reqBody := ProvisionDeviceRequest{
		DeviceType:      "PADLOCK",
		SerialNumber:    "SN123456",
		Model:           "KiriLock Pro",
		FirmwareVersion: "1.0.0",
		CredentialType:  "API_KEY",
		CredentialValue: "test-secret-key-12345",
	}

	body, _ := json.Marshal(reqBody)
	req := httptest.NewRequest(http.MethodPost, "/admin/devices/provision", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	// No principal in context
	w := httptest.NewRecorder()
	handler.ProvisionDevice(w, req)

	// Should return 401 Unauthorized
	if w.Code != http.StatusUnauthorized {
		t.Errorf("expected status %d, got %d", http.StatusUnauthorized, w.Code)
	}
}

func TestProvisionDevice_InvalidDeviceType(t *testing.T) {
	mockAudit := &MockAuditRepository{}
	handler, err := NewDeviceProvisioningHandler(mockAudit)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	reqBody := ProvisionDeviceRequest{
		DeviceType:      "INVALID_TYPE",
		SerialNumber:    "SN123456",
		Model:           "KiriLock Pro",
		FirmwareVersion: "1.0.0",
		CredentialType:  "API_KEY",
		CredentialValue: "test-secret-key-12345",
	}

	body, _ := json.Marshal(reqBody)
	req := httptest.NewRequest(http.MethodPost, "/admin/devices/provision", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	principal := client.Principal{
		Subject:  uuid.New().String(),
		Roles:    []string{"super_admin"},
		TenantID: "",
	}
	ctx := middleware.WithPrincipal(context.Background(), principal)
	req = req.WithContext(ctx)

	w := httptest.NewRecorder()
	handler.ProvisionDevice(w, req)

	// Should return 400 Bad Request
	if w.Code != http.StatusBadRequest {
		t.Errorf("expected status %d, got %d", http.StatusBadRequest, w.Code)
	}
}

func TestProvisionDevice_EmptyCredential(t *testing.T) {
	mockAudit := &MockAuditRepository{}
	handler, err := NewDeviceProvisioningHandler(mockAudit)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	reqBody := ProvisionDeviceRequest{
		DeviceType:      "PADLOCK",
		SerialNumber:    "SN123456",
		Model:           "KiriLock Pro",
		FirmwareVersion: "1.0.0",
		CredentialType:  "API_KEY",
		CredentialValue: "", // Empty credential
	}

	body, _ := json.Marshal(reqBody)
	req := httptest.NewRequest(http.MethodPost, "/admin/devices/provision", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	principal := client.Principal{
		Subject:  uuid.New().String(),
		Roles:    []string{"super_admin"},
		TenantID: "",
	}
	ctx := middleware.WithPrincipal(context.Background(), principal)
	req = req.WithContext(ctx)

	w := httptest.NewRecorder()
	handler.ProvisionDevice(w, req)

	// Should return 400 Bad Request
	if w.Code != http.StatusBadRequest {
		t.Errorf("expected status %d, got %d", http.StatusBadRequest, w.Code)
	}
}

func TestListDevices_SuperAdmin_Success(t *testing.T) {
	mockAudit := &MockAuditRepository{}
	handler, err := NewDeviceProvisioningHandler(mockAudit)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	req := httptest.NewRequest(http.MethodGet, "/admin/devices", nil)

	principal := client.Principal{
		Subject:  uuid.New().String(),
		Roles:    []string{"super_admin"},
		TenantID: "",
	}
	ctx := middleware.WithPrincipal(context.Background(), principal)
	req = req.WithContext(ctx)

	w := httptest.NewRecorder()
	handler.ListDevices(w, req)

	// Should return 200 OK
	if w.Code != http.StatusOK {
		t.Errorf("expected status %d, got %d", http.StatusOK, w.Code)
	}

	var response DeviceListResponse
	if err := json.Unmarshal(w.Body.Bytes(), &response); err != nil {
		t.Fatalf("failed to unmarshal response: %v", err)
	}

	// Verify response structure
	if response.Devices == nil {
		t.Error("devices array should not be nil")
	}
}

func TestListDevices_Landlord_Forbidden(t *testing.T) {
	mockAudit := &MockAuditRepository{}
	handler, err := NewDeviceProvisioningHandler(mockAudit)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	req := httptest.NewRequest(http.MethodGet, "/admin/devices", nil)

	principal := client.Principal{
		Subject:  uuid.New().String(),
		Roles:    []string{"landlord"},
		TenantID: "",
	}
	ctx := middleware.WithPrincipal(context.Background(), principal)
	req = req.WithContext(ctx)

	w := httptest.NewRecorder()
	handler.ListDevices(w, req)

	// Should return 403 Forbidden
	if w.Code != http.StatusForbidden {
		t.Errorf("expected status %d, got %d", http.StatusForbidden, w.Code)
	}
}

func TestSecretProvider_StoreAndGet(t *testing.T) {
	provider := NewInMemorySecretProvider()

	ctx := context.Background()
	deviceID := uuid.New().String()
	credentialType := "API_KEY"
	secret := "my-secret-key"

	// Store credential
	reference, err := provider.StoreCredential(ctx, deviceID, credentialType, secret)
	if err != nil {
		t.Fatalf("failed to store credential: %v", err)
	}

	if reference == "" {
		t.Error("reference should not be empty")
	}

	// Retrieve credential
	retrievedSecret, err := provider.GetCredential(ctx, reference)
	if err != nil {
		t.Fatalf("failed to retrieve credential: %v", err)
	}

	if retrievedSecret != secret {
		t.Errorf("expected secret %s, got %s", secret, retrievedSecret)
	}

	// Delete credential
	err = provider.DeleteCredential(ctx, reference)
	if err != nil {
		t.Fatalf("failed to delete credential: %v", err)
	}

	// Verify credential is deleted
	_, err = provider.GetCredential(ctx, reference)
	if err == nil {
		t.Error("expected error when retrieving deleted credential")
	}
}

func TestSecretProvider_EmptySecret(t *testing.T) {
	provider := NewInMemorySecretProvider()

	ctx := context.Background()
	deviceID := uuid.New().String()
	credentialType := "API_KEY"
	secret := ""

	_, err := provider.StoreCredential(ctx, deviceID, credentialType, secret)
	if err == nil {
		t.Error("expected error when storing empty secret")
	}
}
