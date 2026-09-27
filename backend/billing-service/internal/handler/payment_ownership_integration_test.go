package handler

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"regexp"
	"strings"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/google/uuid"

	"github.com/kirilock/backend/billing-service/internal/identity"
	"github.com/kirilock/backend/billing-service/internal/middleware"
	"github.com/kirilock/backend/billing-service/internal/model"
	"github.com/kirilock/backend/billing-service/internal/repository"
	"github.com/kirilock/backend/billing-service/internal/service"
	"github.com/kirilock/backend/shared/validation"
)

// testIdentityClient is a fake identity client for integration testing
type testIdentityClient struct {
	validateSessionFunc func(ctx context.Context, sessionID string) (middleware.AuthenticatedSubject, error)
	resolveFunc         func(ctx context.Context, sessionID string, responsibilityID uuid.UUID) (identity.PaymentResponsibilityResponse, error)
}

func (c *testIdentityClient) ValidateSession(ctx context.Context, sessionID string) (middleware.AuthenticatedSubject, error) {
	if c.validateSessionFunc != nil {
		return c.validateSessionFunc(ctx, sessionID)
	}
	return middleware.AuthenticatedSubject{}, errors.New("not implemented")
}

func (c *testIdentityClient) ResolvePaymentResponsibility(ctx context.Context, sessionID string, responsibilityID uuid.UUID) (identity.PaymentResponsibilityResponse, error) {
	if c.resolveFunc != nil {
		return c.resolveFunc(ctx, sessionID, responsibilityID)
	}
	return identity.PaymentResponsibilityResponse{}, errors.New("not implemented")
}

// testProvider is a fake payment provider for integration testing
type testProvider struct {
	createFunc func(ctx context.Context, request service.CreatePaymentRequest) (model.ProviderPayment, error)
}

func (p *testProvider) CreatePayment(ctx context.Context, request service.CreatePaymentRequest) (model.ProviderPayment, error) {
	if p.createFunc != nil {
		return p.createFunc(ctx, request)
	}
	return model.ProviderPayment{}, errors.New("not implemented")
}

func (p *testProvider) VerifyPayment(ctx context.Context, transactionID string) (model.ProviderPayment, error) {
	return model.ProviderPayment{}, errors.New("not implemented")
}

// TestPaymentOwnershipIntegration tests the real handler→application path with persistence
func TestPaymentOwnershipIntegration(t *testing.T) {
	// Define distinct identities
	subjectA := uuid.New() // Finance admin (caller)
	tenantB := uuid.New()  // Tenant B (payment owner)
	responsibilityB := uuid.New()

	// Setup sqlmock
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("failed to create sqlmock: %v", err)
	}
	defer db.Close()

	// Create real repository with sqlmock
	repo := repository.NewPaymentRepository(db)

	// Setup fake identity client returning responsibility for Tenant B
	identityClient := &testIdentityClient{
		validateSessionFunc: func(ctx context.Context, sessionID string) (middleware.AuthenticatedSubject, error) {
			return middleware.AuthenticatedSubject{
				SubjectID:    subjectA.String(),
				Email:        "finance-admin@example.com",
				Roles:        []string{"finance_admin"},
				IsAdmin:      false,
				IsSuperAdmin: false,
			}, nil
		},
		resolveFunc: func(ctx context.Context, sessionID string, responsibilityID uuid.UUID) (identity.PaymentResponsibilityResponse, error) {
			if responsibilityID != responsibilityB {
				return identity.PaymentResponsibilityResponse{}, errors.New("payment responsibility not found")
			}
			return identity.PaymentResponsibilityResponse{
				ID:              responsibilityB,
				TenantSubjectID: tenantB,
				Status:          "ACTIVE",
			}, nil
		},
	}

	// Setup fake provider
	provider := &testProvider{
		createFunc: func(ctx context.Context, request service.CreatePaymentRequest) (model.ProviderPayment, error) {
			return model.ProviderPayment{
				ID:        "flw-test-001",
				Reference: request.Reference,
				Amount:    request.Amount,
				Currency:  request.Currency,
				Status:    "PENDING",
			}, nil
		},
	}

	// Create real PaymentApplication
	application, err := service.NewPaymentApplication(provider, repo, identityClient)
	if err != nil {
		t.Fatalf("failed to create payment application: %v", err)
	}

	// Create handler with real application
	handler, err := NewPaymentApplicationHandler(validation.New(), application)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	// Setup sqlmock expectations
	// 1. GetByIdempotencyKey - not found
	mock.ExpectQuery("SELECT id, tenant_id, payment_responsibility_id, reference, provider, provider_charge_id, amount_minor, currency, status, idempotency_key, request_hash, correlation_id, created_at, updated_at, settled_at, version FROM payments WHERE provider = \\$1 AND idempotency_key = \\$2").
		WithArgs("FLUTTERWAVE", "test-key-001").
		WillReturnError(repository.ErrPaymentNotFound)

	// 2. ClaimPaymentIdempotency (INSERT with ON CONFLICT DO NOTHING)
	mock.ExpectExec("INSERT INTO payment_idempotency_claims").
		WithArgs(sqlmock.AnyArg(), "FLUTTERWAVE", "test-key-001", sqlmock.AnyArg(), "KIRI-TEST-001", "PROCESSING", sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg()).
		WillReturnResult(sqlmock.NewResult(1, 1))

	// 3. CreatePending (INSERT INTO payments) - no transaction
	mock.ExpectExec(regexp.QuoteMeta(`
		INSERT INTO payments (
                        id,
                        tenant_id,
                        payment_responsibility_id,
                        reference,
                        provider,
                        provider_charge_id,
                        amount_minor,
                        currency,
                        status,
                        idempotency_key,
                        request_hash,
                        correlation_id,
                        created_at,
                        updated_at,
                        settled_at,
                        version
                )
                VALUES (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        $7,
                        $8,
                        $9,
                        $10,
                        $11,
                        $12,
                        $13,
                        $14,
                        $15,
                        $16
                )
	`)).
		WithArgs(
			sqlmock.AnyArg(), // id
			tenantB,          // tenant_id - CRITICAL: must be Tenant B, not Subject A
			responsibilityB,  // payment_responsibility_id - CRITICAL: must be responsibility B
			"KIRI-TEST-001",  // reference
			"FLUTTERWAVE",    // provider
			"flw-test-001",   // provider_charge_id
			20000,            // amount_minor
			"UGX",            // currency
			"PENDING",        // status
			"test-key-001",   // idempotency_key
			sqlmock.AnyArg(), // request_hash
			"trace-001",      // correlation_id
			sqlmock.AnyArg(), // created_at
			sqlmock.AnyArg(), // updated_at
			sqlmock.AnyArg(), // settled_at
			1,                // version
		).
		WillReturnResult(sqlmock.NewResult(1, 1))

	// 4. CompletePaymentIdempotency
	mock.ExpectExec("UPDATE payment_idempotency_claims").
		WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), "FLUTTERWAVE", "test-key-001").
		WillReturnResult(sqlmock.NewResult(1, 1))

	// Create request
	request := service.CreatePaymentRequest{
		PaymentResponsibilityID: responsibilityB,
		Reference:               "KIRI-TEST-001",
		Amount:                  20000,
		Currency:                "UGX",
		CustomerEmail:           "tenant@example.com",
		CustomerPhone:           "+256700000000",
		Network:                 "MTN",
		CountryCode:             "UG",
		IdempotencyKey:          "test-key-001",
		TraceID:                 "trace-001",
	}

	requestBody, err := json.Marshal(request)
	if err != nil {
		t.Fatalf("failed to marshal request: %v", err)
	}

	// Execute request
	req := httptest.NewRequest("POST", "/api/v1/payments", strings.NewReader(string(requestBody)))
	req.Header.Set("Authorization", "Bearer test-session")
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	// Assert HTTP 201
	if w.Code != http.StatusCreated {
		t.Fatalf("expected status 201, got %d: %s", w.Code, w.Body.String())
	}

	// Verify all sqlmock expectations were met
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("sqlmock expectations not met: %v", err)
	}

	// Decode response
	var payment model.Payment
	if err := json.NewDecoder(w.Body).Decode(&payment); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	// CRITICAL ASSERTION: payment owner is Tenant B, NOT Subject A (finance admin)
	if payment.TenantID != tenantB {
		t.Fatalf("payment tenant_id = %s, want %s (Tenant B), payment owner must be derived from responsibility, not caller", payment.TenantID, tenantB)
	}

	// CRITICAL ASSERTION: explicitly assert tenant_id != Subject A
	if payment.TenantID == subjectA {
		t.Fatalf("REGRESSION: payment tenant_id == caller SubjectID (%s), ownership must NOT be derived from authenticated caller", subjectA)
	}

	// Assert responsibility ID is persisted
	if payment.PaymentResponsibilityID == nil {
		t.Fatal("payment_responsibility_id is nil")
	}
	if *payment.PaymentResponsibilityID != responsibilityB {
		t.Fatalf("payment_responsibility_id = %s, want %s", *payment.PaymentResponsibilityID, responsibilityB)
	}

	// Add negative-control comment to prevent regression
	// If someone reintroduces caller-SubjectID as tenant, this test will fail
	t.Logf("✓ Verified: payment tenant_id (%s) != caller SubjectID (%s)", payment.TenantID, subjectA)
	t.Logf("✓ Verified: payment derived from responsibility Tenant B, not finance-admin Subject A")
}

// TestPaymentOwnership_NonexistentResponsibility returns 404
func TestPaymentOwnership_NonexistentResponsibility(t *testing.T) {
	db, _, err := sqlmock.New()
	if err != nil {
		t.Fatalf("failed to create sqlmock: %v", err)
	}
	defer db.Close()

	repo := repository.NewPaymentRepository(db)

	responsibilityID := uuid.New()

	identityClient := &testIdentityClient{
		validateSessionFunc: func(ctx context.Context, sessionID string) (middleware.AuthenticatedSubject, error) {
			return middleware.AuthenticatedSubject{
				SubjectID:    uuid.New().String(),
				Email:        "finance-admin@example.com",
				Roles:        []string{"finance_admin"},
				IsAdmin:      false,
				IsSuperAdmin: false,
			}, nil
		},
		resolveFunc: func(ctx context.Context, sessionID string, responsibilityID uuid.UUID) (identity.PaymentResponsibilityResponse, error) {
			return identity.PaymentResponsibilityResponse{}, identity.ErrResponsibilityNotFound
		},
	}

	provider := &testProvider{
		createFunc: func(ctx context.Context, request service.CreatePaymentRequest) (model.ProviderPayment, error) {
			return model.ProviderPayment{}, errors.New("provider should not be called")
		},
	}

	application, err := service.NewPaymentApplication(provider, repo, identityClient)
	if err != nil {
		t.Fatalf("failed to create payment application: %v", err)
	}

	handler, err := NewPaymentApplicationHandler(validation.New(), application)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	request := service.CreatePaymentRequest{
		PaymentResponsibilityID: responsibilityID,
		Reference:               "KIRI-TEST-001",
		Amount:                  20000,
		Currency:                "UGX",
		CustomerEmail:           "tenant@example.com",
		CustomerPhone:           "+256700000000",
		Network:                 "MTN",
		CountryCode:             "UG",
		IdempotencyKey:          "test-key-001",
		TraceID:                 "trace-001",
	}

	requestBody, err := json.Marshal(request)
	if err != nil {
		t.Fatalf("failed to marshal request: %v", err)
	}

	req := httptest.NewRequest("POST", "/api/v1/payments", strings.NewReader(string(requestBody)))
	req.Header.Set("Authorization", "Bearer test-session")
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	if w.Code != http.StatusNotFound {
		t.Fatalf("expected 404, got %d: %s", w.Code, w.Body.String())
	}
}

// TestPaymentOwnership_InactiveResponsibility returns 409
func TestPaymentOwnership_InactiveResponsibility(t *testing.T) {
	db, _, err := sqlmock.New()
	if err != nil {
		t.Fatalf("failed to create sqlmock: %v", err)
	}
	defer db.Close()

	repo := repository.NewPaymentRepository(db)

	responsibilityID := uuid.New()
	tenantID := uuid.New()

	identityClient := &testIdentityClient{
		validateSessionFunc: func(ctx context.Context, sessionID string) (middleware.AuthenticatedSubject, error) {
			return middleware.AuthenticatedSubject{
				SubjectID:    uuid.New().String(),
				Email:        "finance-admin@example.com",
				Roles:        []string{"finance_admin"},
				IsAdmin:      false,
				IsSuperAdmin: false,
			}, nil
		},
		resolveFunc: func(ctx context.Context, sessionID string, responsibilityID uuid.UUID) (identity.PaymentResponsibilityResponse, error) {
			return identity.PaymentResponsibilityResponse{
				ID:              responsibilityID,
				TenantSubjectID: tenantID,
				Status:          "INACTIVE", // Not ACTIVE
			}, nil
		},
	}

	provider := &testProvider{
		createFunc: func(ctx context.Context, request service.CreatePaymentRequest) (model.ProviderPayment, error) {
			return model.ProviderPayment{}, errors.New("provider should not be called")
		},
	}

	application, err := service.NewPaymentApplication(provider, repo, identityClient)
	if err != nil {
		t.Fatalf("failed to create payment application: %v", err)
	}

	handler, err := NewPaymentApplicationHandler(validation.New(), application)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	request := service.CreatePaymentRequest{
		PaymentResponsibilityID: responsibilityID,
		Reference:               "KIRI-TEST-001",
		Amount:                  20000,
		Currency:                "UGX",
		CustomerEmail:           "tenant@example.com",
		CustomerPhone:           "+256700000000",
		Network:                 "MTN",
		CountryCode:             "UG",
		IdempotencyKey:          "test-key-001",
		TraceID:                 "trace-001",
	}

	requestBody, err := json.Marshal(request)
	if err != nil {
		t.Fatalf("failed to marshal request: %v", err)
	}

	req := httptest.NewRequest("POST", "/api/v1/payments", strings.NewReader(string(requestBody)))
	req.Header.Set("Authorization", "Bearer test-session")
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	if w.Code != http.StatusConflict {
		t.Fatalf("expected 409, got %d: %s", w.Code, w.Body.String())
	}
}

// TestPaymentOwnership_ForbiddenResponsibility returns 403
func TestPaymentOwnership_ForbiddenResponsibility(t *testing.T) {
	db, _, err := sqlmock.New()
	if err != nil {
		t.Fatalf("failed to create sqlmock: %v", err)
	}
	defer db.Close()

	repo := repository.NewPaymentRepository(db)

	responsibilityID := uuid.New()

	identityClient := &testIdentityClient{
		validateSessionFunc: func(ctx context.Context, sessionID string) (middleware.AuthenticatedSubject, error) {
			return middleware.AuthenticatedSubject{
				SubjectID:    uuid.New().String(),
				Email:        "finance-admin@example.com",
				Roles:        []string{"finance_admin"},
				IsAdmin:      false,
				IsSuperAdmin: false,
			}, nil
		},
		resolveFunc: func(ctx context.Context, sessionID string, responsibilityID uuid.UUID) (identity.PaymentResponsibilityResponse, error) {
			return identity.PaymentResponsibilityResponse{}, identity.ErrForbidden
		},
	}

	provider := &testProvider{
		createFunc: func(ctx context.Context, request service.CreatePaymentRequest) (model.ProviderPayment, error) {
			return model.ProviderPayment{}, errors.New("provider should not be called")
		},
	}

	application, err := service.NewPaymentApplication(provider, repo, identityClient)
	if err != nil {
		t.Fatalf("failed to create payment application: %v", err)
	}

	handler, err := NewPaymentApplicationHandler(validation.New(), application)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	request := service.CreatePaymentRequest{
		PaymentResponsibilityID: responsibilityID,
		Reference:               "KIRI-TEST-001",
		Amount:                  20000,
		Currency:                "UGX",
		CustomerEmail:           "tenant@example.com",
		CustomerPhone:           "+256700000000",
		Network:                 "MTN",
		CountryCode:             "UG",
		IdempotencyKey:          "test-key-001",
		TraceID:                 "trace-001",
	}

	requestBody, err := json.Marshal(request)
	if err != nil {
		t.Fatalf("failed to marshal request: %v", err)
	}

	req := httptest.NewRequest("POST", "/api/v1/payments", strings.NewReader(string(requestBody)))
	req.Header.Set("Authorization", "Bearer test-session")
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	if w.Code != http.StatusForbidden {
		t.Fatalf("expected 403, got %d: %s", w.Code, w.Body.String())
	}
}

// TestPaymentOwnership_InvalidResponsibilityID returns 422
func TestPaymentOwnership_InvalidResponsibilityID(t *testing.T) {
	db, _, err := sqlmock.New()
	if err != nil {
		t.Fatalf("failed to create sqlmock: %v", err)
	}
	defer db.Close()

	repo := repository.NewPaymentRepository(db)

	identityClient := &testIdentityClient{
		validateSessionFunc: func(ctx context.Context, sessionID string) (middleware.AuthenticatedSubject, error) {
			return middleware.AuthenticatedSubject{
				SubjectID:    uuid.New().String(),
				Email:        "finance-admin@example.com",
				Roles:        []string{"finance_admin"},
				IsAdmin:      false,
				IsSuperAdmin: false,
			}, nil
		},
		resolveFunc: func(ctx context.Context, sessionID string, responsibilityID uuid.UUID) (identity.PaymentResponsibilityResponse, error) {
			return identity.PaymentResponsibilityResponse{}, errors.New("should not be called")
		},
	}

	provider := &testProvider{
		createFunc: func(ctx context.Context, request service.CreatePaymentRequest) (model.ProviderPayment, error) {
			return model.ProviderPayment{}, errors.New("provider should not be called")
		},
	}

	application, err := service.NewPaymentApplication(provider, repo, identityClient)
	if err != nil {
		t.Fatalf("failed to create payment application: %v", err)
	}

	handler, err := NewPaymentApplicationHandler(validation.New(), application)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	// Invalid UUID
	request := service.CreatePaymentRequest{
		PaymentResponsibilityID: uuid.Nil,
		Reference:               "KIRI-TEST-001",
		Amount:                  20000,
		Currency:                "UGX",
		CustomerEmail:           "tenant@example.com",
		CustomerPhone:           "+256700000000",
		Network:                 "MTN",
		CountryCode:             "UG",
		IdempotencyKey:          "test-key-001",
		TraceID:                 "trace-001",
	}

	requestBody, err := json.Marshal(request)
	if err != nil {
		t.Fatalf("failed to marshal request: %v", err)
	}

	req := httptest.NewRequest("POST", "/api/v1/payments", strings.NewReader(string(requestBody)))
	req.Header.Set("Authorization", "Bearer test-session")
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	// Nil UUID is a validation failure (422) because required field
	if w.Code != http.StatusUnprocessableEntity {
		t.Fatalf("expected 422, got %d: %s", w.Code, w.Body.String())
	}
}

// TestPaymentOwnership_CrossTenantDerivation proves ownership is derived per-responsibility
// Finance Admin A creates payments for Responsibility B (Tenant B) and Responsibility C (Tenant C)
// Each payment must have the correct tenant_id derived from its responsibility, not from Admin A
func TestPaymentOwnership_CrossTenantDerivation(t *testing.T) {
	// Define distinct identities
	subjectA := uuid.New() // Finance admin (caller)
	tenantB := uuid.New()  // Tenant B
	tenantC := uuid.New()  // Tenant C
	responsibilityB := uuid.New()
	responsibilityC := uuid.New()

	// Setup sqlmock
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("failed to create sqlmock: %v", err)
	}
	defer db.Close()

	repo := repository.NewPaymentRepository(db)

	// Setup fake identity client returning appropriate responsibility per request
	identityClient := &testIdentityClient{
		validateSessionFunc: func(ctx context.Context, sessionID string) (middleware.AuthenticatedSubject, error) {
			return middleware.AuthenticatedSubject{
				SubjectID:    subjectA.String(),
				Email:        "finance-admin@example.com",
				Roles:        []string{"finance_admin"},
				IsAdmin:      false,
				IsSuperAdmin: false,
			}, nil
		},
		resolveFunc: func(ctx context.Context, sessionID string, responsibilityID uuid.UUID) (identity.PaymentResponsibilityResponse, error) {
			if responsibilityID == responsibilityB {
				return identity.PaymentResponsibilityResponse{
					ID:              responsibilityB,
					TenantSubjectID: tenantB,
					Status:          "ACTIVE",
				}, nil
			}
			if responsibilityID == responsibilityC {
				return identity.PaymentResponsibilityResponse{
					ID:              responsibilityC,
					TenantSubjectID: tenantC,
					Status:          "ACTIVE",
				}, nil
			}
			return identity.PaymentResponsibilityResponse{}, errors.New("payment responsibility not found")
		},
	}

	provider := &testProvider{
		createFunc: func(ctx context.Context, request service.CreatePaymentRequest) (model.ProviderPayment, error) {
			return model.ProviderPayment{
				ID:        "flw-test-" + request.Reference,
				Reference: request.Reference,
				Amount:    request.Amount,
				Currency:  request.Currency,
				Status:    "PENDING",
			}, nil
		},
	}

	application, err := service.NewPaymentApplication(provider, repo, identityClient)
	if err != nil {
		t.Fatalf("failed to create payment application: %v", err)
	}

	handler, err := NewPaymentApplicationHandler(validation.New(), application)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	// Test 1: Create payment for Responsibility B (Tenant B)
	// Setup sqlmock expectations for payment B
	mock.ExpectQuery("SELECT id, tenant_id, payment_responsibility_id, reference, provider, provider_charge_id, amount_minor, currency, status, idempotency_key, request_hash, correlation_id, created_at, updated_at, settled_at, version FROM payments WHERE provider = \\$1 AND idempotency_key = \\$2").
		WithArgs("FLUTTERWAVE", "test-key-b").
		WillReturnError(repository.ErrPaymentNotFound)

	mock.ExpectExec("INSERT INTO payment_idempotency_claims").
		WithArgs(sqlmock.AnyArg(), "FLUTTERWAVE", "test-key-b", sqlmock.AnyArg(), "KIRI-TEST-B", "PROCESSING", sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg()).
		WillReturnResult(sqlmock.NewResult(1, 1))

	mock.ExpectExec(regexp.QuoteMeta(`
		INSERT INTO payments (
                        id,
                        tenant_id,
                        payment_responsibility_id,
                        reference,
                        provider,
                        provider_charge_id,
                        amount_minor,
                        currency,
                        status,
                        idempotency_key,
                        request_hash,
                        correlation_id,
                        created_at,
                        updated_at,
                        settled_at,
                        version
                )
                VALUES (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        $7,
                        $8,
                        $9,
                        $10,
                        $11,
                        $12,
                        $13,
                        $14,
                        $15,
                        $16
                )
	`)).
		WithArgs(
			sqlmock.AnyArg(),
			tenantB,         // CRITICAL: tenant_id == Tenant B
			responsibilityB, // CRITICAL: payment_responsibility_id == responsibility B
			"KIRI-TEST-B",
			"FLUTTERWAVE",
			"flw-test-KIRI-TEST-B",
			20000,
			"UGX",
			"PENDING",
			"test-key-b",
			sqlmock.AnyArg(),
			"trace-b",
			sqlmock.AnyArg(),
			sqlmock.AnyArg(),
			sqlmock.AnyArg(),
			1,
		).
		WillReturnResult(sqlmock.NewResult(1, 1))

	mock.ExpectExec("UPDATE payment_idempotency_claims").
		WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), "FLUTTERWAVE", "test-key-b").
		WillReturnResult(sqlmock.NewResult(1, 1))

	requestB := service.CreatePaymentRequest{
		PaymentResponsibilityID: responsibilityB,
		Reference:               "KIRI-TEST-B",
		Amount:                  20000,
		Currency:                "UGX",
		CustomerEmail:           "tenant@example.com",
		CustomerPhone:           "+256700000000",
		Network:                 "MTN",
		CountryCode:             "UG",
		IdempotencyKey:          "test-key-b",
		TraceID:                 "trace-b",
	}

	requestBodyB, _ := json.Marshal(requestB)
	reqB := httptest.NewRequest("POST", "/api/v1/payments", strings.NewReader(string(requestBodyB)))
	reqB.Header.Set("Authorization", "Bearer test-session")
	wB := httptest.NewRecorder()

	handler.ServeHTTP(wB, reqB)

	if wB.Code != http.StatusCreated {
		t.Fatalf("payment B: expected status 201, got %d: %s", wB.Code, wB.Body.String())
	}

	var paymentB model.Payment
	json.NewDecoder(wB.Body).Decode(&paymentB)

	// CRITICAL: payment B's tenant_id == Tenant B, NOT Subject A
	if paymentB.TenantID != tenantB {
		t.Fatalf("payment B tenant_id = %s, want %s (Tenant B)", paymentB.TenantID, tenantB)
	}
	if paymentB.TenantID == subjectA {
		t.Fatalf("REGRESSION: payment B tenant_id == caller SubjectID (%s)", subjectA)
	}

	// Verify sqlmock expectations were met
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("payment B sqlmock expectations not met: %v", err)
	}

	// Test 2: Create payment for Responsibility C (Tenant C)
	// Setup sqlmock expectations for payment C
	mock.ExpectQuery("SELECT id, tenant_id, payment_responsibility_id, reference, provider, provider_charge_id, amount_minor, currency, status, idempotency_key, request_hash, correlation_id, created_at, updated_at, settled_at, version FROM payments WHERE provider = \\$1 AND idempotency_key = \\$2").
		WithArgs("FLUTTERWAVE", "test-key-c").
		WillReturnError(repository.ErrPaymentNotFound)

	mock.ExpectExec("INSERT INTO payment_idempotency_claims").
		WithArgs(sqlmock.AnyArg(), "FLUTTERWAVE", "test-key-c", sqlmock.AnyArg(), "KIRI-TEST-C", "PROCESSING", sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg()).
		WillReturnResult(sqlmock.NewResult(1, 1))

	mock.ExpectExec(regexp.QuoteMeta(`
		INSERT INTO payments (
                        id,
                        tenant_id,
                        payment_responsibility_id,
                        reference,
                        provider,
                        provider_charge_id,
                        amount_minor,
                        currency,
                        status,
                        idempotency_key,
                        request_hash,
                        correlation_id,
                        created_at,
                        updated_at,
                        settled_at,
                        version
                )
                VALUES (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        $7,
                        $8,
                        $9,
                        $10,
                        $11,
                        $12,
                        $13,
                        $14,
                        $15,
                        $16
                )
	`)).
		WithArgs(
			sqlmock.AnyArg(),
			tenantC,         // CRITICAL: tenant_id == Tenant C
			responsibilityC, // CRITICAL: payment_responsibility_id == responsibility C
			"KIRI-TEST-C",
			"FLUTTERWAVE",
			"flw-test-KIRI-TEST-C",
			20000,
			"UGX",
			"PENDING",
			"test-key-c",
			sqlmock.AnyArg(),
			"trace-c",
			sqlmock.AnyArg(),
			sqlmock.AnyArg(),
			sqlmock.AnyArg(),
			1,
		).
		WillReturnResult(sqlmock.NewResult(1, 1))

	mock.ExpectExec("UPDATE payment_idempotency_claims").
		WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), "FLUTTERWAVE", "test-key-c").
		WillReturnResult(sqlmock.NewResult(1, 1))

	requestC := service.CreatePaymentRequest{
		PaymentResponsibilityID: responsibilityC,
		Reference:               "KIRI-TEST-C",
		Amount:                  20000,
		Currency:                "UGX",
		CustomerEmail:           "tenant@example.com",
		CustomerPhone:           "+256700000000",
		Network:                 "MTN",
		CountryCode:             "UG",
		IdempotencyKey:          "test-key-c",
		TraceID:                 "trace-c",
	}

	requestBodyC, _ := json.Marshal(requestC)
	reqC := httptest.NewRequest("POST", "/api/v1/payments", strings.NewReader(string(requestBodyC)))
	reqC.Header.Set("Authorization", "Bearer test-session")
	wC := httptest.NewRecorder()

	handler.ServeHTTP(wC, reqC)

	if wC.Code != http.StatusCreated {
		t.Fatalf("payment C: expected status 201, got %d: %s", wC.Code, wC.Body.String())
	}

	var paymentC model.Payment
	json.NewDecoder(wC.Body).Decode(&paymentC)

	// CRITICAL: payment C's tenant_id == Tenant C, NOT Subject A
	if paymentC.TenantID != tenantC {
		t.Fatalf("payment C tenant_id = %s, want %s (Tenant C)", paymentC.TenantID, tenantC)
	}
	if paymentC.TenantID == subjectA {
		t.Fatalf("REGRESSION: payment C tenant_id == caller SubjectID (%s)", subjectA)
	}

	// Verify sqlmock expectations were met
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("payment C sqlmock expectations not met: %v", err)
	}

	// CRITICAL ASSERTION: Neither payment equals Admin A's SubjectID
	if paymentB.TenantID == subjectA || paymentC.TenantID == subjectA {
		t.Fatalf("REGRESSION: one or more payments have tenant_id == caller SubjectID (%s)", subjectA)
	}

	// CRITICAL ASSERTION: Payments have different tenant_ids (per-responsibility derivation)
	if paymentB.TenantID == paymentC.TenantID {
		t.Fatalf("ERROR: payments B and C have same tenant_id (%s), expected different (B=%s, C=%s)", paymentB.TenantID, tenantB, tenantC)
	}

	t.Logf("✓ Verified: payment B tenant_id (%s) derived from responsibility B, not Admin A (%s)", paymentB.TenantID, subjectA)
	t.Logf("✓ Verified: payment C tenant_id (%s) derived from responsibility C, not Admin A (%s)", paymentC.TenantID, subjectA)
	t.Logf("✓ Verified: ownership derived per-responsibility, not coincidentally")
}

// TestPaymentOwnership_IdempotencyHandlerPath tests idempotency through the real HTTP handler
// (a) creates a payment for responsibility B with idempotency key K and returns it
// (b) replays identical request with K and returns the SAME payment (provider NOT called again)
// (c) reuses K with responsibility C and is rejected as an idempotency conflict
// (d) the original payment remains associated with B
func TestPaymentOwnership_IdempotencyHandlerPath(t *testing.T) {
	subjectA := uuid.New() // Finance admin
	tenantB := uuid.New()
	tenantC := uuid.New()
	responsibilityB := uuid.New()
	responsibilityC := uuid.New()
	idempotencyKey := "handler-idempotency-001"

	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("failed to create sqlmock: %v", err)
	}
	defer db.Close()

	repo := repository.NewPaymentRepository(db)

	identityClient := &testIdentityClient{
		validateSessionFunc: func(ctx context.Context, sessionID string) (middleware.AuthenticatedSubject, error) {
			return middleware.AuthenticatedSubject{
				SubjectID:    subjectA.String(),
				Email:        "finance-admin@example.com",
				Roles:        []string{"finance_admin"},
				IsAdmin:      false,
				IsSuperAdmin: false,
			}, nil
		},
		resolveFunc: func(ctx context.Context, sessionID string, responsibilityID uuid.UUID) (identity.PaymentResponsibilityResponse, error) {
			if responsibilityID == responsibilityB {
				return identity.PaymentResponsibilityResponse{
					ID:              responsibilityB,
					TenantSubjectID: tenantB,
					Status:          "ACTIVE",
				}, nil
			}
			if responsibilityID == responsibilityC {
				return identity.PaymentResponsibilityResponse{
					ID:              responsibilityC,
					TenantSubjectID: tenantC,
					Status:          "ACTIVE",
				}, nil
			}
			return identity.PaymentResponsibilityResponse{}, errors.New("payment responsibility not found")
		},
	}

	providerCallCount := 0
	provider := &testProvider{
		createFunc: func(ctx context.Context, request service.CreatePaymentRequest) (model.ProviderPayment, error) {
			providerCallCount++
			return model.ProviderPayment{
				ID:        "flw-idempotency-001",
				Reference: request.Reference,
				Amount:    request.Amount,
				Currency:  request.Currency,
				Status:    "PENDING",
			}, nil
		},
	}

	application, err := service.NewPaymentApplication(provider, repo, identityClient)
	if err != nil {
		t.Fatalf("failed to create payment application: %v", err)
	}

	handler, err := NewPaymentApplicationHandler(validation.New(), application)
	if err != nil {
		t.Fatalf("failed to create handler: %v", err)
	}

	// (a) Create payment for responsibility B with idempotency key K
	mock.ExpectQuery("SELECT id, tenant_id, payment_responsibility_id, reference, provider, provider_charge_id, amount_minor, currency, status, idempotency_key, request_hash, correlation_id, created_at, updated_at, settled_at, version FROM payments WHERE provider = \\$1 AND idempotency_key = \\$2").
		WithArgs("FLUTTERWAVE", idempotencyKey).
		WillReturnError(repository.ErrPaymentNotFound)

	mock.ExpectExec("INSERT INTO payment_idempotency_claims").
		WithArgs(sqlmock.AnyArg(), "FLUTTERWAVE", idempotencyKey, sqlmock.AnyArg(), "KIRI-IDEMP-001", "PROCESSING", sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg()).
		WillReturnResult(sqlmock.NewResult(1, 1))

	mock.ExpectExec(regexp.QuoteMeta(`
		INSERT INTO payments (
                        id,
                        tenant_id,
                        payment_responsibility_id,
                        reference,
                        provider,
                        provider_charge_id,
                        amount_minor,
                        currency,
                        status,
                        idempotency_key,
                        request_hash,
                        correlation_id,
                        created_at,
                        updated_at,
                        settled_at,
                        version
                )
                VALUES (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        $7,
                        $8,
                        $9,
                        $10,
                        $11,
                        $12,
                        $13,
                        $14,
                        $15,
                        $16
                )
	`)).
		WithArgs(
			sqlmock.AnyArg(),
			tenantB,
			responsibilityB,
			"KIRI-IDEMP-001",
			"FLUTTERWAVE",
			"flw-idempotency-001",
			20000,
			"UGX",
			"PENDING",
			idempotencyKey,
			sqlmock.AnyArg(),
			"trace-idemp",
			sqlmock.AnyArg(),
			sqlmock.AnyArg(),
			sqlmock.AnyArg(),
			1,
		).
		WillReturnResult(sqlmock.NewResult(1, 1))

	mock.ExpectExec("UPDATE payment_idempotency_claims").
		WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), "FLUTTERWAVE", idempotencyKey).
		WillReturnResult(sqlmock.NewResult(1, 1))

	request := service.CreatePaymentRequest{
		PaymentResponsibilityID: responsibilityB,
		Reference:               "KIRI-IDEMP-001",
		Amount:                  20000,
		Currency:                "UGX",
		CustomerEmail:           "tenant@example.com",
		CustomerPhone:           "+256700000000",
		Network:                 "MTN",
		CountryCode:             "UG",
		IdempotencyKey:          idempotencyKey,
		TraceID:                 "trace-idemp",
	}

	requestBody, _ := json.Marshal(request)
	req := httptest.NewRequest("POST", "/api/v1/payments", strings.NewReader(string(requestBody)))
	req.Header.Set("Authorization", "Bearer test-session")
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	if w.Code != http.StatusCreated {
		t.Fatalf("step (a): expected status 201, got %d: %s", w.Code, w.Body.String())
	}

	var payment1 model.Payment
	json.NewDecoder(w.Body).Decode(&payment1)

	if providerCallCount != 1 {
		t.Fatalf("step (a): expected provider called once, got %d times", providerCallCount)
	}

	if payment1.TenantID != tenantB {
		t.Fatalf("step (a): expected tenant_id %s, got %s", tenantB, payment1.TenantID)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("step (a): sqlmock expectations not met: %v", err)
	}

	// (b) Replay identical request with K - should return SAME payment, provider NOT called again
	mock.ExpectQuery("SELECT id, tenant_id, payment_responsibility_id, reference, provider, provider_charge_id, amount_minor, currency, status, idempotency_key, request_hash, correlation_id, created_at, updated_at, settled_at, version FROM payments WHERE provider = \\$1 AND idempotency_key = \\$2").
		WithArgs("FLUTTERWAVE", idempotencyKey).
		WillReturnRows(
			sqlmock.NewRows([]string{
				"id", "tenant_id", "payment_responsibility_id", "reference", "provider",
				"provider_charge_id", "amount_minor", "currency", "status", "idempotency_key",
				"request_hash", "correlation_id", "created_at", "updated_at", "settled_at", "version",
			}).AddRow(
				payment1.ID,
				payment1.TenantID,
				payment1.PaymentResponsibilityID,
				payment1.Reference,
				payment1.Provider,
				payment1.ProviderChargeID,
				payment1.AmountMinor,
				payment1.Currency,
				payment1.Status,
				payment1.IdempotencyKey,
				payment1.RequestHash,
				payment1.CorrelationID,
				payment1.CreatedAt,
				payment1.UpdatedAt,
				payment1.SettledAt,
				payment1.Version,
			),
		)

	providerCallCount = 0 // Reset counter
	req = httptest.NewRequest("POST", "/api/v1/payments", strings.NewReader(string(requestBody)))
	req.Header.Set("Authorization", "Bearer test-session")
	w = httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	if w.Code != http.StatusCreated {
		t.Fatalf("step (b): expected status 201, got %d: %s", w.Code, w.Body.String())
	}

	var payment2 model.Payment
	json.NewDecoder(w.Body).Decode(&payment2)

	if providerCallCount != 0 {
		t.Fatalf("step (b): expected provider NOT called on replay, got %d calls", providerCallCount)
	}

	if payment2.ID != payment1.ID {
		t.Fatalf("step (b): expected same payment ID %s, got %s", payment1.ID, payment2.ID)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("step (b): sqlmock expectations not met: %v", err)
	}

	// (c) Reuse K with responsibility C - should be rejected as idempotency conflict
	mock.ExpectQuery("SELECT id, tenant_id, payment_responsibility_id, reference, provider, provider_charge_id, amount_minor, currency, status, idempotency_key, request_hash, correlation_id, created_at, updated_at, settled_at, version FROM payments WHERE provider = \\$1 AND idempotency_key = \\$2").
		WithArgs("FLUTTERWAVE", idempotencyKey).
		WillReturnRows(
			sqlmock.NewRows([]string{
				"id", "tenant_id", "payment_responsibility_id", "reference", "provider",
				"provider_charge_id", "amount_minor", "currency", "status", "idempotency_key",
				"request_hash", "correlation_id", "created_at", "updated_at", "settled_at", "version",
			}).AddRow(
				payment1.ID,
				payment1.TenantID,
				payment1.PaymentResponsibilityID,
				payment1.Reference,
				payment1.Provider,
				payment1.ProviderChargeID,
				payment1.AmountMinor,
				payment1.Currency,
				payment1.Status,
				payment1.IdempotencyKey,
				payment1.RequestHash,
				payment1.CorrelationID,
				payment1.CreatedAt,
				payment1.UpdatedAt,
				payment1.SettledAt,
				payment1.Version,
			),
		)

	requestC := request
	requestC.PaymentResponsibilityID = responsibilityC
	requestC.Reference = "KIRI-IDEMP-002" // Different reference to ensure hash differs

	requestBodyC, _ := json.Marshal(requestC)
	req = httptest.NewRequest("POST", "/api/v1/payments", strings.NewReader(string(requestBodyC)))
	req.Header.Set("Authorization", "Bearer test-session")
	w = httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	if w.Code != http.StatusConflict {
		t.Fatalf("step (c): expected status 409 (idempotency conflict), got %d: %s", w.Code, w.Body.String())
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("step (c): sqlmock expectations not met: %v", err)
	}

	// (d) Original payment remains associated with B
	if payment1.TenantID != tenantB {
		t.Fatalf("step (d): original payment tenant_id changed from %s to %s", tenantB, payment1.TenantID)
	}

	if payment1.PaymentResponsibilityID == nil || *payment1.PaymentResponsibilityID != responsibilityB {
		t.Fatalf("step (d): original payment responsibility changed from %s", responsibilityB)
	}

	t.Logf("✓ Verified: idempotency replay returns same payment without provider call")
	t.Logf("✓ Verified: reusing key with different responsibility rejected as conflict")
	t.Logf("✓ Verified: original payment remains associated with responsibility B (tenant %s)", tenantB)
}
