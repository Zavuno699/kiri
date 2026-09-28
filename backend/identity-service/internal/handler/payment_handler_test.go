package handler

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/kirilock/backend/identity-service/internal/client"
	"github.com/kirilock/backend/identity-service/internal/middleware"
	"github.com/kirilock/backend/identity-service/internal/model"
	"github.com/kirilock/backend/identity-service/internal/repository"
)

func pointerTo[T any](v T) *T {
	return &v
}

func int64Ptr(v int64) *int64 {
	return &v
}

// mockPaymentService is a minimal mock for testing the authorization boundary
// It wraps a test payment resolver and stubs out all other PaymentService methods
type mockPaymentService struct {
	resolver paymentResolver
}

type paymentResolver interface {
	GetPaymentResponsibilityWithAccount(ctx context.Context, responsibilityID uuid.UUID) (model.PaymentResponsibility, model.PaymentAccount, error)
}

func (m *mockPaymentService) GetPaymentResponsibilityWithAccount(ctx context.Context, responsibilityID uuid.UUID) (model.PaymentResponsibility, model.PaymentAccount, error) {
	return m.resolver.GetPaymentResponsibilityWithAccount(ctx, responsibilityID)
}

// Stub out all other PaymentService methods - they should not be called in this test
func (m *mockPaymentService) CreatePaymentAccount(ctx context.Context, landlordSubjectID uuid.UUID, account model.PaymentAccount) (model.PaymentAccount, error) {
	return model.PaymentAccount{}, errors.New("not implemented in test")
}

func (m *mockPaymentService) GetPaymentAccount(ctx context.Context, landlordSubjectID uuid.UUID, accountID uuid.UUID) (model.PaymentAccount, error) {
	return model.PaymentAccount{}, errors.New("not implemented in test")
}

func (m *mockPaymentService) GetLandlordPaymentAccounts(ctx context.Context, landlordSubjectID uuid.UUID) ([]model.PaymentAccount, error) {
	return nil, errors.New("not implemented in test")
}

func (m *mockPaymentService) ActivatePaymentAccount(ctx context.Context, landlordSubjectID uuid.UUID, accountID uuid.UUID) error {
	return errors.New("not implemented in test")
}

func (m *mockPaymentService) CreatePaymentResponsibility(ctx context.Context, landlordSubjectID uuid.UUID, responsibility model.PaymentResponsibility) (model.PaymentResponsibility, error) {
	return model.PaymentResponsibility{}, errors.New("not implemented in test")
}

func (m *mockPaymentService) GetTenantPaymentResponsibility(ctx context.Context, tenantSubjectID uuid.UUID) (model.PaymentResponsibility, error) {
	return model.PaymentResponsibility{}, errors.New("not implemented in test")
}

// testPaymentResolver implements paymentResolver for testing
type testPaymentResolver struct {
	responsibility model.PaymentResponsibility
	account        model.PaymentAccount
	called         bool
	err            error
}

func (t *testPaymentResolver) GetPaymentResponsibilityWithAccount(ctx context.Context, id uuid.UUID) (model.PaymentResponsibility, model.PaymentAccount, error) {
	t.called = true
	if t.err != nil {
		return model.PaymentResponsibility{}, model.PaymentAccount{}, t.err
	}
	if t.responsibility.ID == uuid.Nil || t.account.ID == uuid.Nil {
		return model.PaymentResponsibility{}, model.PaymentAccount{}, repository.ErrPaymentResponsibilityNotFound
	}
	return t.responsibility, t.account, nil
}

// TestGetPaymentResponsibilityInternal_AuthorizationBoundary tests the authorization boundary
// for the internal responsibility resolution endpoint using the REAL handler
func TestGetPaymentResponsibilityInternal_AuthorizationBoundary(t *testing.T) {
	responsibilityID := uuid.New()

	// Create a test resolver that returns a valid responsibility
	resolver := &testPaymentResolver{
		responsibility: model.PaymentResponsibility{
			ID:                     responsibilityID,
			TenantSubjectID:        uuid.New(),
			PaymentAccountID:       uuid.New(),
			TenancyID:              uuid.New(),
			Status:                 model.PaymentResponsibilityActive,
			MonthlyRentAmountMinor: int64Ptr(100000),
			Notes:                  pointerTo("Test responsibility"),
			CreatedAt:              time.Now(),
			UpdatedAt:              time.Now(),
		},
		account: model.PaymentAccount{
			ID:       uuid.New(),
			Provider: model.ProviderStripe,
			Status:   model.PaymentAccountActive,
		},
	}

	// Wrap resolver in mockPaymentService which stubs out all other methods
	mockService := &mockPaymentService{resolver: resolver}

	handler, err := NewPaymentHandler(mockService)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	tests := []struct {
		name         string
		roles        []string
		expectStatus int
		expectCalled bool
	}{
		{
			name:         "finance_admin authorized",
			roles:        []string{"finance_admin"},
			expectStatus: http.StatusOK,
			expectCalled: true,
		},
		{
			name:         "super_admin authorized",
			roles:        []string{"super_admin"},
			expectStatus: http.StatusOK,
			expectCalled: true,
		},
		{
			name:         "tenant forbidden",
			roles:        []string{"tenant"},
			expectStatus: http.StatusForbidden,
			expectCalled: false,
		},
		{
			name:         "landlord forbidden",
			roles:        []string{"landlord"},
			expectStatus: http.StatusForbidden,
			expectCalled: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Reset mock call counter
			resolver.called = false

			// Create request with query parameter
			req := httptest.NewRequest("GET", "/internal/payment-responsibilities?id="+responsibilityID.String(), nil)

			// Inject principal with roles
			principal := client.Principal{
				Subject: uuid.New().String(),
				Roles:   tt.roles,
			}
			ctx := middleware.WithPrincipal(context.Background(), principal)
			req = req.WithContext(ctx)

			// Call handler
			w := httptest.NewRecorder()
			handler.GetPaymentResponsibilityInternal(w, req)

			// Assert status code
			if w.Code != tt.expectStatus {
				t.Errorf("expected status %d, got %d: %s", tt.expectStatus, w.Code, w.Body.String())
			}

			// Assert whether service was called
			if resolver.called != tt.expectCalled {
				t.Errorf("expected service called=%v, got called=%v", tt.expectCalled, resolver.called)
			}
		})
	}
}

func TestGetPaymentResponsibilityInternal_NoPrincipal_Unauthorized(t *testing.T) {
	responsibilityID := uuid.New()

	resolver := &testPaymentResolver{
		responsibility: model.PaymentResponsibility{
			ID:               responsibilityID,
			TenantSubjectID:  uuid.New(),
			PaymentAccountID: uuid.New(),
			TenancyID:        uuid.New(),
			Status:           model.PaymentResponsibilityActive,
		},
		account: model.PaymentAccount{
			ID:       uuid.New(),
			Provider: model.ProviderStripe,
			Status:   model.PaymentAccountActive,
		},
	}

	mockService := &mockPaymentService{resolver: resolver}

	handler, err := NewPaymentHandler(mockService)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	// Create request WITHOUT principal in context
	req := httptest.NewRequest("GET", "/internal/payment-responsibilities?id="+responsibilityID.String(), nil)

	w := httptest.NewRecorder()
	handler.GetPaymentResponsibilityInternal(w, req)

	// Should return 401 Unauthorized
	if w.Code != http.StatusUnauthorized {
		t.Errorf("expected status %d, got %d", http.StatusUnauthorized, w.Code)
	}

	// Service should NOT have been called
	if resolver.called {
		t.Error("service should not have been called when principal is missing")
	}
}

func TestGetPaymentResponsibilityInternal_HappyPath_ResponseFields(t *testing.T) {
	// Test 200 happy-path with full response JSON field assertions
	responsibilityID := uuid.New()
	tenantSubjectID := uuid.New()
	paymentAccountID := uuid.New()
	tenancyID := uuid.New()

	resolver := &testPaymentResolver{
		responsibility: model.PaymentResponsibility{
			ID:                      responsibilityID,
			TenantSubjectID:         tenantSubjectID,
			PaymentAccountID:        paymentAccountID,
			TenancyID:               tenancyID,
			Status:                  model.PaymentResponsibilityActive,
			ResponsibleForRent:      true,
			ResponsibleForUtilities: false,
			ResponsibleForFees:      true,
			MonthlyRentAmountMinor:  int64Ptr(500000),
			Notes:                   pointerTo("Test responsibility"),
			CreatedAt:               time.Now(),
			UpdatedAt:               time.Now(),
		},
		account: model.PaymentAccount{
			ID:       paymentAccountID,
			Provider: model.ProviderStripe,
			Status:   model.PaymentAccountActive,
		},
		called: false,
		err:    nil,
	}

	mockService := &mockPaymentService{resolver: resolver}

	handler, err := NewPaymentHandler(mockService)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	req := httptest.NewRequest("GET", "/internal/payment-responsibilities?id="+responsibilityID.String(), nil)

	principal := client.Principal{
		Subject: uuid.New().String(),
		Roles:   []string{"finance_admin"},
	}
	ctx := middleware.WithPrincipal(context.Background(), principal)
	req = req.WithContext(ctx)

	w := httptest.NewRecorder()
	handler.GetPaymentResponsibilityInternal(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d: %s", w.Code, w.Body.String())
	}

	// Decode and assert response fields
	var response PaymentResponsibilityWithAccountResponse
	if err := json.NewDecoder(w.Body).Decode(&response); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if response.ID != responsibilityID {
		t.Errorf("expected ID %s, got %s", responsibilityID, response.ID)
	}
	if response.TenantSubjectID != tenantSubjectID {
		t.Errorf("expected TenantSubjectID %s, got %s", tenantSubjectID, response.TenantSubjectID)
	}
	if response.PaymentAccountID != paymentAccountID {
		t.Errorf("expected PaymentAccountID %s, got %s", paymentAccountID, response.PaymentAccountID)
	}
	if response.TenancyID != tenancyID {
		t.Errorf("expected TenancyID %s, got %s", tenancyID, response.TenancyID)
	}
	if response.Status != model.PaymentResponsibilityActive {
		t.Errorf("expected Status %s, got %s", model.PaymentResponsibilityActive, response.Status)
	}
	if response.PaymentAccountProvider != model.ProviderStripe {
		t.Errorf("expected PaymentAccountProvider %s, got %s", model.ProviderStripe, response.PaymentAccountProvider)
	}
	if response.PaymentAccountStatus != model.PaymentAccountActive {
		t.Errorf("expected PaymentAccountStatus %s, got %s", model.PaymentAccountActive, response.PaymentAccountStatus)
	}
}

func TestGetPaymentResponsibilityInternal_NotFound(t *testing.T) {
	// Test 404 when responsibility is not found
	responsibilityID := uuid.New()

	resolver := &testPaymentResolver{
		responsibility: model.PaymentResponsibility{}, // Nil ID to trigger not found
		account:        model.PaymentAccount{},
		called:         false,
		err:            nil,
	}

	mockService := &mockPaymentService{resolver: resolver}

	handler, err := NewPaymentHandler(mockService)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	req := httptest.NewRequest("GET", "/internal/payment-responsibilities?id="+responsibilityID.String(), nil)

	principal := client.Principal{
		Subject: uuid.New().String(),
		Roles:   []string{"finance_admin"},
	}
	ctx := middleware.WithPrincipal(context.Background(), principal)
	req = req.WithContext(ctx)

	w := httptest.NewRecorder()
	handler.GetPaymentResponsibilityInternal(w, req)

	if w.Code != http.StatusNotFound {
		t.Errorf("expected status 404, got %d: %s", w.Code, w.Body.String())
	}
}

func TestGetPaymentResponsibilityInternal_InactiveResponsibility(t *testing.T) {
	// Test 409 when responsibility is not ACTIVE
	responsibilityID := uuid.New()

	resolver := &testPaymentResolver{
		responsibility: model.PaymentResponsibility{
			ID:               responsibilityID,
			TenantSubjectID:  uuid.New(),
			PaymentAccountID: uuid.New(),
			TenancyID:        uuid.New(),
			Status:           model.PaymentResponsibilityInactive, // Not ACTIVE
		},
		account: model.PaymentAccount{
			ID:       uuid.New(),
			Provider: model.ProviderStripe,
			Status:   model.PaymentAccountActive,
		},
		called: false,
		err:    nil,
	}

	mockService := &mockPaymentService{resolver: resolver}

	handler, err := NewPaymentHandler(mockService)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	req := httptest.NewRequest("GET", "/internal/payment-responsibilities?id="+responsibilityID.String(), nil)

	principal := client.Principal{
		Subject: uuid.New().String(),
		Roles:   []string{"finance_admin"},
	}
	ctx := middleware.WithPrincipal(context.Background(), principal)
	req = req.WithContext(ctx)

	w := httptest.NewRecorder()
	handler.GetPaymentResponsibilityInternal(w, req)

	if w.Code != http.StatusConflict {
		t.Errorf("expected status 409, got %d: %s", w.Code, w.Body.String())
	}
}

func TestGetPaymentResponsibilityInternal_InactiveAccount(t *testing.T) {
	// Test 409 when payment account is not ACTIVE
	responsibilityID := uuid.New()

	resolver := &testPaymentResolver{
		responsibility: model.PaymentResponsibility{
			ID:               responsibilityID,
			TenantSubjectID:  uuid.New(),
			PaymentAccountID: uuid.New(),
			TenancyID:        uuid.New(),
			Status:           model.PaymentResponsibilityActive,
		},
		account: model.PaymentAccount{
			ID:       uuid.New(),
			Provider: model.ProviderStripe,
			Status:   model.PaymentAccountPaused, // Not ACTIVE
		},
		called: false,
		err:    nil,
	}

	mockService := &mockPaymentService{resolver: resolver}

	handler, err := NewPaymentHandler(mockService)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	req := httptest.NewRequest("GET", "/internal/payment-responsibilities?id="+responsibilityID.String(), nil)

	principal := client.Principal{
		Subject: uuid.New().String(),
		Roles:   []string{"finance_admin"},
	}
	ctx := middleware.WithPrincipal(context.Background(), principal)
	req = req.WithContext(ctx)

	w := httptest.NewRecorder()
	handler.GetPaymentResponsibilityInternal(w, req)

	if w.Code != http.StatusConflict {
		t.Errorf("expected status 409, got %d: %s", w.Code, w.Body.String())
	}
}

func TestGetPaymentResponsibilityInternal_GlobalTrustSemantics(t *testing.T) {
	// Test global-trust: finance_admin can resolve responsibility belonging to an arbitrary tenant
	// This is the intentional platform-level finance boundary
	responsibilityID := uuid.New()
	arbitraryTenantID := uuid.New() // Arbitrary tenant, not the admin's tenant

	resolver := &testPaymentResolver{
		responsibility: model.PaymentResponsibility{
			ID:               responsibilityID,
			TenantSubjectID:  arbitraryTenantID, // Different from admin
			PaymentAccountID: uuid.New(),
			TenancyID:        uuid.New(),
			Status:           model.PaymentResponsibilityActive,
		},
		account: model.PaymentAccount{
			ID:       uuid.New(),
			Provider: model.ProviderStripe,
			Status:   model.PaymentAccountActive,
		},
		called: false,
		err:    nil,
	}

	mockService := &mockPaymentService{resolver: resolver}

	handler, err := NewPaymentHandler(mockService)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	req := httptest.NewRequest("GET", "/internal/payment-responsibilities?id="+responsibilityID.String(), nil)

	principal := client.Principal{
		Subject: uuid.New().String(), // Finance admin (different from arbitraryTenantID)
		Roles:   []string{"finance_admin"},
	}
	ctx := middleware.WithPrincipal(context.Background(), principal)
	req = req.WithContext(ctx)

	w := httptest.NewRecorder()
	handler.GetPaymentResponsibilityInternal(w, req)

	// Should succeed (200) - global-trust allows admin to resolve any responsibility
	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200 (global-trust allows admin to resolve arbitrary tenant's responsibility), got %d: %s", w.Code, w.Body.String())
	}

	// Decode and verify the response contains the arbitrary tenant's data
	var response PaymentResponsibilityWithAccountResponse
	if err := json.NewDecoder(w.Body).Decode(&response); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if response.TenantSubjectID != arbitraryTenantID {
		t.Errorf("expected TenantSubjectID %s (arbitrary tenant), got %s", arbitraryTenantID, response.TenantSubjectID)
	}

	t.Logf("✓ Verified: global-trust semantics - finance_admin can resolve responsibility belonging to arbitrary tenant %s", arbitraryTenantID)
}

func TestGetPaymentResponsibilityInternal_InternalError(t *testing.T) {
	// Test 500 when repository returns an internal error
	responsibilityID := uuid.New()

	resolver := &testPaymentResolver{
		err: errors.New("database connection failed"),
	}

	mockService := &mockPaymentService{resolver: resolver}

	handler, err := NewPaymentHandler(mockService)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	req := httptest.NewRequest("GET", "/internal/payment-responsibilities?id="+responsibilityID.String(), nil)

	principal := client.Principal{
		Subject: uuid.New().String(),
		Roles:   []string{"finance_admin"},
	}
	ctx := middleware.WithPrincipal(context.Background(), principal)
	req = req.WithContext(ctx)

	w := httptest.NewRecorder()
	handler.GetPaymentResponsibilityInternal(w, req)

	if w.Code != http.StatusInternalServerError {
		t.Errorf("expected status 500, got %d: %s", w.Code, w.Body.String())
	}

	// Response body should be generic, not leak internal error
	if w.Body.String() != "internal server error\n" {
		t.Errorf("expected generic error message, got: %s", w.Body.String())
	}
}
