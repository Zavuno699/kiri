package billing

import (
	"context"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/google/uuid"
	"github.com/kirilock/backend/billing-service/internal/middleware"
)

// mockIdentityClient implements middleware.IdentityClient for testing
type mockIdentityClient struct {
	shouldFail   bool
	validSession bool
	subjectID    string
	roles        []string
}

func (m *mockIdentityClient) ValidateSession(ctx context.Context, sessionID string) (middleware.AuthenticatedSubject, error) {
	if m.shouldFail {
		return middleware.AuthenticatedSubject{}, errors.New("identity service unavailable")
	}
	if !m.validSession {
		return middleware.AuthenticatedSubject{}, errors.New("invalid session")
	}
	return middleware.AuthenticatedSubject{
		SubjectID:    m.subjectID,
		Email:        "test@example.com",
		Roles:        m.roles,
		IsAdmin:      false,
		IsSuperAdmin: false,
	}, nil
}

func TestService_AuthorizationWiring(t *testing.T) {
	// Test that routes are wired with authentication and authorization
	testUUID := uuid.New()

	identityClient := &mockIdentityClient{
		shouldFail:   false,
		validSession: true,
		subjectID:    testUUID.String(),
		roles:        []string{"finance_admin"}, // Has payment.write scope
	}

	authMiddleware := middleware.NewAuthenticationMiddleware(identityClient)

	// Create a simple handler that returns 200 after auth/authz
	testHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	// Wire up auth + auth + handler
	paymentWriteAuth := middleware.NewAuthorizationMiddleware(middleware.ScopePaymentWrite)
	wiredHandler := authMiddleware.Authenticate(paymentWriteAuth.Authorize(testHandler))

	// Test that unauthenticated request returns 401
	req := httptest.NewRequest("POST", "/api/v1/payments", nil)
	w := httptest.NewRecorder()
	wiredHandler.ServeHTTP(w, req)

	if w.Code != http.StatusUnauthorized {
		t.Errorf("expected 401 for unauthenticated request, got %d", w.Code)
	}

	// Test that authenticated but wrong role returns 403
	wrongRoleClient := &mockIdentityClient{
		shouldFail:   false,
		validSession: true,
		subjectID:    testUUID.String(),
		roles:        []string{"tenant"}, // Does not have payment.write scope
	}

	wrongRoleAuth := middleware.NewAuthenticationMiddleware(wrongRoleClient)
	wrongRoleWiredHandler := wrongRoleAuth.Authenticate(paymentWriteAuth.Authorize(testHandler))

	req = httptest.NewRequest("POST", "/api/v1/payments", nil)
	req.Header.Set("Authorization", "valid-session-id")
	w = httptest.NewRecorder()
	wrongRoleWiredHandler.ServeHTTP(w, req)

	if w.Code != http.StatusForbidden {
		t.Errorf("expected 403 for authenticated but wrong role, got %d", w.Code)
	}
}

func TestService_AuthenticatedAuthorizedReachesHandler(t *testing.T) {
	// Test that authenticated + authorized request reaches the handler
	testUUID := uuid.New()

	identityClient := &mockIdentityClient{
		shouldFail:   false,
		validSession: true,
		subjectID:    testUUID.String(),
		roles:        []string{"finance_admin"}, // Has payment.write scope
	}

	authMiddleware := middleware.NewAuthenticationMiddleware(identityClient)

	// Create a simple handler that returns 200 after auth/authz
	testHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	// Wire up auth + auth + handler
	paymentWriteAuth := middleware.NewAuthorizationMiddleware(middleware.ScopePaymentWrite)
	wiredHandler := authMiddleware.Authenticate(paymentWriteAuth.Authorize(testHandler))

	req := httptest.NewRequest("POST", "/api/v1/payments", nil)
	req.Header.Set("Authorization", "valid-session-id")
	w := httptest.NewRecorder()
	wiredHandler.ServeHTTP(w, req)

	// Should be 200 (auth + authz passed, handler ran)
	if w.Code != http.StatusOK {
		t.Errorf("expected 200 for authenticated + authorized request, got %d", w.Code)
	}
}

func TestService_SuperAdminPermitted(t *testing.T) {
	// Test that super_admin is permitted for payment.write
	testUUID := uuid.New()

	identityClient := &mockIdentityClient{
		shouldFail:   false,
		validSession: true,
		subjectID:    testUUID.String(),
		roles:        []string{"super_admin"}, // Has payment.write scope
	}

	authMiddleware := middleware.NewAuthenticationMiddleware(identityClient)

	// Create a simple handler that returns 200 after auth/authz
	testHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	// Wire up auth + auth + handler
	paymentWriteAuth := middleware.NewAuthorizationMiddleware(middleware.ScopePaymentWrite)
	wiredHandler := authMiddleware.Authenticate(paymentWriteAuth.Authorize(testHandler))

	req := httptest.NewRequest("POST", "/api/v1/payments", nil)
	req.Header.Set("Authorization", "valid-session-id")
	w := httptest.NewRecorder()
	wiredHandler.ServeHTTP(w, req)

	// Should be 200 (super_admin has payment.write scope)
	if w.Code != http.StatusOK {
		t.Errorf("expected 200 for super_admin, got %d", w.Code)
	}
}
