package middleware

import (
	"context"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"
)

// identityClient is the interface for session validation
type identityClient interface {
	ValidateSession(ctx context.Context, sessionID string) (AuthenticatedSubject, error)
}

// mockIdentityClient is a mock for testing without real HTTP calls
type mockIdentityClient struct {
	shouldFail   bool
	validSession bool
}

func (m *mockIdentityClient) ValidateSession(ctx context.Context, sessionID string) (AuthenticatedSubject, error) {
	if m.shouldFail {
		return AuthenticatedSubject{}, errors.New("identity service unavailable")
	}
	if !m.validSession {
		return AuthenticatedSubject{}, errors.New("invalid session")
	}
	return AuthenticatedSubject{
		SubjectID:    "test-subject-id",
		Email:        "test@example.com",
		Roles:        []string{"tenant"},
		IsAdmin:      false,
		IsSuperAdmin: false,
	}, nil
}

func TestAuthenticationMiddleware_NoSession(t *testing.T) {
	mockClient := &mockIdentityClient{shouldFail: false, validSession: false}
	authMiddleware := NewAuthenticationMiddleware(mockClient)

	handler := authMiddleware.Authenticate(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest("GET", "/test", nil)
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	if w.Code != http.StatusUnauthorized {
		t.Errorf("expected 401, got %d", w.Code)
	}
}

func TestAuthenticationMiddleware_RawSessionID(t *testing.T) {
	// Test that the middleware accepts raw session ID (platform contract)
	mockClient := &mockIdentityClient{shouldFail: false, validSession: true}
	authMiddleware := NewAuthenticationMiddleware(mockClient)

	handler := authMiddleware.Authenticate(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest("GET", "/test", nil)
	req.Header.Set("Authorization", "valid-session-id") // No Bearer prefix
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected 200 for raw session ID, got %d", w.Code)
	}
}

func TestAuthenticationMiddleware_BearerPrefix(t *testing.T) {
	// Test that the middleware accepts Bearer prefix (for compatibility)
	mockClient := &mockIdentityClient{shouldFail: false, validSession: true}
	authMiddleware := NewAuthenticationMiddleware(mockClient)

	handler := authMiddleware.Authenticate(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest("GET", "/test", nil)
	req.Header.Set("Authorization", "Bearer valid-session-id") // With Bearer prefix
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected 200 for Bearer prefix, got %d", w.Code)
	}
}

func TestAuthenticationMiddleware_InvalidSession(t *testing.T) {
	mockClient := &mockIdentityClient{shouldFail: false, validSession: false}
	authMiddleware := NewAuthenticationMiddleware(mockClient)

	handler := authMiddleware.Authenticate(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest("GET", "/test", nil)
	req.Header.Set("Authorization", "invalid-session-id")
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	// Should return 401 since identity-client will reject invalid session
	if w.Code != http.StatusUnauthorized {
		t.Errorf("expected 401, got %d", w.Code)
	}
}

func TestAuthenticationMiddleware_ValidSession(t *testing.T) {
	mockClient := &mockIdentityClient{shouldFail: false, validSession: true}
	authMiddleware := NewAuthenticationMiddleware(mockClient)

	handler := authMiddleware.Authenticate(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest("GET", "/test", nil)
	req.Header.Set("Authorization", "valid-session-id")
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	// Should return 200 since session is valid
	if w.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", w.Code)
	}
}

func TestAuthorizationMiddleware_Unauthorized(t *testing.T) {
	authMiddleware := NewAuthorizationMiddleware(ScopePaymentRead)

	handler := authMiddleware.Authorize(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest("GET", "/test", nil)
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	// Should return 401 since no authenticated subject in context
	if w.Code != http.StatusUnauthorized {
		t.Errorf("expected 401, got %d", w.Code)
	}
}

func TestAuthorizationMiddleware_WrongRole(t *testing.T) {
	authMiddleware := NewAuthorizationMiddleware(ScopePaymentWrite)

	// Create a request with authenticated subject that has only tenant role
	subject := AuthenticatedSubject{
		SubjectID:    "test-subject-id",
		Email:        "test@example.com",
		Roles:        []string{"tenant"},
		IsAdmin:      false,
		IsSuperAdmin: false,
	}
	ctx := WithAuthenticatedSubject(context.Background(), subject)

	handler := authMiddleware.Authorize(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest("GET", "/test", nil).WithContext(ctx)
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	// Should return 403 since tenant doesn't have payment.write scope
	if w.Code != http.StatusForbidden {
		t.Errorf("expected 403, got %d", w.Code)
	}
}

func TestAuthorizationPolicy_TenantCanReadPayment(t *testing.T) {
	policy := NewDefaultAuthorizationPolicy()

	roles := []Role{RoleTenant}
	hasPermission := policy.Allows(roles, ScopePaymentRead)

	if !hasPermission {
		t.Error("tenant should have payment.read scope")
	}
}

func TestAuthorizationPolicy_TenantCannotWritePayment(t *testing.T) {
	policy := NewDefaultAuthorizationPolicy()

	roles := []Role{RoleTenant}
	hasPermission := policy.Allows(roles, ScopePaymentWrite)

	if hasPermission {
		t.Error("tenant should not have payment.write scope")
	}
}

func TestAuthorizationPolicy_LandlordCanReadPayment(t *testing.T) {
	policy := NewDefaultAuthorizationPolicy()

	roles := []Role{RoleLandlord}
	hasPermission := policy.Allows(roles, ScopePaymentRead)

	if !hasPermission {
		t.Error("landlord should have payment.read scope")
	}
}

func TestAuthorizationPolicy_FinanceAdminCanReconcile(t *testing.T) {
	policy := NewDefaultAuthorizationPolicy()

	roles := []Role{RoleFinanceAdmin}
	hasPermission := policy.Allows(roles, ScopePaymentReconcile)

	if !hasPermission {
		t.Error("finance_admin should have payment.reconcile scope")
	}
}

func TestAuthorizationPolicy_SuperAdminHasAllScopes(t *testing.T) {
	policy := NewDefaultAuthorizationPolicy()

	roles := []Role{RoleSuperAdmin}
	allScopes := []Scope{
		ScopeLeaseRead, ScopeLeaseWrite,
		ScopePaymentRead, ScopePaymentWrite, ScopePaymentReconcile, ScopePaymentSettle, ScopePaymentRefund,
		ScopeDeviceRead, ScopeDeviceProvision, ScopeDeviceCommand,
		ScopeLockRead, ScopeLockCommand,
		ScopeFinancialRead, ScopeFinancialConfigure,
		ScopeSecurityRead, ScopeSecurityWrite,
		ScopeAuditRead,
	}

	for _, scope := range allScopes {
		if !policy.Allows(roles, scope) {
			t.Errorf("super_admin should have %s scope", scope)
		}
	}
}
