package handler

import (
	"context"
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
}

func (t *testPaymentResolver) GetPaymentResponsibilityWithAccount(ctx context.Context, id uuid.UUID) (model.PaymentResponsibility, model.PaymentAccount, error) {
	t.called = true
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
			ID:               responsibilityID,
			TenantSubjectID:  uuid.New(),
			PaymentAccountID: uuid.New(),
			TenancyID:        uuid.New(),
			Status:           model.PaymentResponsibilityActive,
			CreatedAt:        time.Now(),
			UpdatedAt:        time.Now(),
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
