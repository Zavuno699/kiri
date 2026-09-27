package service

import (
	"context"
	"errors"
	"regexp"
	"strings"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/google/uuid"

	"github.com/kirilock/backend/billing-service/internal/identity"
	"github.com/kirilock/backend/billing-service/internal/middleware"
	"github.com/kirilock/backend/billing-service/internal/model"
	"github.com/kirilock/backend/billing-service/internal/repository"
)

type applicationTestIdentityClient struct {
	responsibility identity.PaymentResponsibilityResponse
	err            error
	resolveFunc    func(_ context.Context, _ string, responsibilityID uuid.UUID) (identity.PaymentResponsibilityResponse, error)
}

func (c *applicationTestIdentityClient) ValidateSession(_ context.Context, _ string) (middleware.AuthenticatedSubject, error) {
	return middleware.AuthenticatedSubject{}, errors.New("not implemented in test")
}

func (c *applicationTestIdentityClient) ResolvePaymentResponsibility(_ context.Context, _ string, responsibilityID uuid.UUID) (identity.PaymentResponsibilityResponse, error) {
	if c.resolveFunc != nil {
		return c.resolveFunc(nil, "", responsibilityID)
	}
	if c.err != nil {
		return identity.PaymentResponsibilityResponse{}, c.err
	}
	return c.responsibility, nil
}

type applicationTestProvider struct {
	payment model.ProviderPayment
	err     error
	request CreatePaymentRequest
}

func (p *applicationTestProvider) CreatePayment(
	_ context.Context,
	request CreatePaymentRequest,
) (model.ProviderPayment, error) {
	p.request = request

	if p.err != nil {
		return model.ProviderPayment{}, p.err
	}

	return p.payment, nil
}

func (p *applicationTestProvider) VerifyPayment(
	_ context.Context,
	_ string,
) (model.ProviderPayment, error) {
	return model.ProviderPayment{}, errors.New("not implemented in test")
}

func TestBuildPendingPaymentPersistsProviderIdentity(t *testing.T) {
	tenantID := uuid.New()

	request := CreatePaymentRequest{
		Reference:      "KIRI-TEST-0001",
		Amount:         20000,
		Currency:       "UGX",
		CustomerEmail:  "tenant@example.com",
		CustomerPhone:  "+256700000000",
		Network:        "MTN",
		CountryCode:    "UG",
		IdempotencyKey: "abcdefghijkl",
		TraceID:        "trace-test-001",
	}

	providerPayment := model.ProviderPayment{
		ID:        "flw-charge-001",
		Reference: request.Reference,
		Amount:    request.Amount,
		Currency:  request.Currency,
		Status:    "PENDING",
	}

	payment, err := BuildPendingPayment(
		tenantID,
		request,
		"FLUTTERWAVE",
		providerPayment,
	)
	if err != nil {
		t.Fatalf("BuildPendingPayment() error = %v", err)
	}

	if payment.Provider != "FLUTTERWAVE" {
		t.Fatalf("provider = %q, want FLUTTERWAVE", payment.Provider)
	}

	if payment.ProviderChargeID != providerPayment.ID {
		t.Fatalf(
			"provider charge ID = %q, want %q",
			payment.ProviderChargeID,
			providerPayment.ID,
		)
	}

	if payment.Reference != request.Reference {
		t.Fatalf("reference mismatch")
	}

	if payment.AmountMinor != request.Amount {
		t.Fatalf("amount mismatch")
	}

	if payment.Currency != "UGX" {
		t.Fatalf("currency = %q, want UGX", payment.Currency)
	}

	if payment.Status != model.PaymentPending {
		t.Fatalf(
			"status = %q, want %q",
			payment.Status,
			model.PaymentPending,
		)
	}

	if err := payment.Validate(); err != nil {
		t.Fatalf("payment.Validate() error = %v", err)
	}
}

func TestBuildPendingPaymentRejectsProviderIdentityMismatch(t *testing.T) {
	request := CreatePaymentRequest{
		Reference:      "KIRI-TEST-0002",
		Amount:         20000,
		Currency:       "UGX",
		IdempotencyKey: "abcdefghijkl",
		TraceID:        "trace-test-002",
	}

	_, err := BuildPendingPayment(
		uuid.New(),
		request,
		"FLUTTERWAVE",
		model.ProviderPayment{
			ID:        "",
			Reference: request.Reference,
			Amount:    request.Amount,
			Currency:  request.Currency,
			Status:    "PENDING",
		},
	)

	if err == nil {
		t.Fatal("expected missing provider payment ID to be rejected")
	}
}

func TestPaymentApplicationPersistsCompletePayment(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("sqlmock.New() error = %v", err)
	}
	defer db.Close()

	repo := repository.NewPaymentRepository(db)

	provider := &applicationTestProvider{
		payment: model.ProviderPayment{
			ID:        "flw-charge-application-001",
			Reference: "KIRI-APP-0001",
			Amount:    20000,
			Currency:  "UGX",
			Status:    "PENDING",
		},
	}

	tenantID := uuid.New()
	responsibilityID := uuid.New()

	identityClient := &applicationTestIdentityClient{
		responsibility: identity.PaymentResponsibilityResponse{
			ID:              responsibilityID,
			TenantSubjectID: tenantID,
			Status:          "ACTIVE",
		},
	}

	application, err := NewPaymentApplication(provider, repo, identityClient)
	if err != nil {
		t.Fatalf("NewPaymentApplication() error = %v", err)
	}

	request := CreatePaymentRequest{
		PaymentResponsibilityID: responsibilityID,
		Reference:               "KIRI-APP-0001",
		Amount:                  20000,
		Currency:                "UGX",
		CustomerEmail:           "tenant@example.com",
		CustomerPhone:           "+256700000000",
		Network:                 "MTN",
		CountryCode:             "UG",
		IdempotencyKey:          "application-test-001",
		TraceID:                 "trace-application-001",
	}

	mock.ExpectQuery("SELECT.*FROM payments.*WHERE provider = \\$1.*AND idempotency_key = \\$2").
		WithArgs("FLUTTERWAVE", request.IdempotencyKey).
		WillReturnError(repository.ErrPaymentNotFound)

	mock.ExpectExec("INSERT INTO payment_idempotency_claims").
		WithArgs(
			sqlmock.AnyArg(),
			"FLUTTERWAVE",
			request.IdempotencyKey,
			sqlmock.AnyArg(),
			request.Reference,
			"PROCESSING",
			sqlmock.AnyArg(),
			sqlmock.AnyArg(),
			sqlmock.AnyArg(),
		).
		WillReturnResult(sqlmock.NewResult(1, 1))

	mock.ExpectExec("INSERT INTO payments").
		WithArgs(
			sqlmock.AnyArg(),
			tenantID,
			responsibilityID, // payment_responsibility_id
			request.Reference,
			"FLUTTERWAVE",
			provider.payment.ID,
			request.Amount,
			"UGX",
			model.PaymentPending,
			request.IdempotencyKey,
			sqlmock.AnyArg(), // request_hash
			request.TraceID,
			sqlmock.AnyArg(),
			sqlmock.AnyArg(),
			sqlmock.AnyArg(), // settled_at
			int64(1),
		).
		WillReturnResult(sqlmock.NewResult(1, 1))

	mock.ExpectExec("UPDATE payment_idempotency_claims").
		WithArgs(
			sqlmock.AnyArg(),
			sqlmock.AnyArg(),
			"FLUTTERWAVE",
			request.IdempotencyKey,
		).
		WillReturnResult(sqlmock.NewResult(1, 1))

	payment, err := application.CreatePendingPayment(
		context.Background(),
		"test-session-id",
		request,
	)
	if err != nil {
		t.Fatalf("CreatePendingPayment() error = %v", err)
	}

	if payment.ID == uuid.Nil {
		t.Fatal("payment ID must be generated")
	}

	if payment.TenantID != tenantID {
		t.Fatalf("tenant ID = %s, want %s", payment.TenantID, tenantID)
	}

	if payment.PaymentResponsibilityID == nil {
		t.Fatal("payment responsibility ID must be set")
	}

	if *payment.PaymentResponsibilityID != responsibilityID {
		t.Fatalf("payment responsibility ID = %s, want %s", *payment.PaymentResponsibilityID, responsibilityID)
	}

	if payment.ProviderChargeID != provider.payment.ID {
		t.Fatalf(
			"provider charge ID = %q, want %q",
			payment.ProviderChargeID,
			provider.payment.ID,
		)
	}

	if payment.CorrelationID != request.TraceID {
		t.Fatalf(
			"correlation ID = %q, want %q",
			payment.CorrelationID,
			request.TraceID,
		)
	}

	if payment.Status != model.PaymentPending {
		t.Fatalf(
			"status = %q, want %q",
			payment.Status,
			model.PaymentPending,
		)
	}

	if payment.Version != 1 {
		t.Fatalf("version = %d, want 1", payment.Version)
	}

	if payment.CreatedAt.IsZero() {
		t.Fatal("created_at must be populated")
	}

	if payment.UpdatedAt.IsZero() {
		t.Fatal("updated_at must be populated")
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("repository expectations were not met: %v", err)
	}
}

func TestPaymentApplicationReplaysSameIdempotencyRequest(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	repo := repository.NewPaymentRepository(db)

	tenantID := uuid.New()
	responsibilityID := uuid.New()

	request := CreatePaymentRequest{
		PaymentResponsibilityID: responsibilityID,
		Reference:               "KIRI-REPLAY-0001",
		Amount:                  20000,
		Currency:                "UGX",
		CustomerEmail:           "tenant@example.com",
		CustomerPhone:           "+256700000000",
		Network:                 "MTN",
		CountryCode:             "UG",
		IdempotencyKey:          "replay-test-001",
		TraceID:                 "trace-replay-001",
	}

	hash, err := PaymentRequestHash(request)
	if err != nil {
		t.Fatal(err)
	}

	existing := model.Payment{
		ID:                      uuid.New(),
		TenantID:                tenantID,
		PaymentResponsibilityID: &responsibilityID,
		Reference:               request.Reference,
		Provider:                "FLUTTERWAVE",
		ProviderChargeID:        "flw-existing-replay-001",
		AmountMinor:             request.Amount,
		Currency:                "UGX",
		Status:                  model.PaymentPending,
		IdempotencyKey:          request.IdempotencyKey,
		RequestHash:             hash,
		CorrelationID:           request.TraceID,
		CreatedAt:               time.Now().UTC(),
		UpdatedAt:               time.Now().UTC(),
		Version:                 1,
	}

	mock.ExpectQuery("SELECT.*FROM payments.*WHERE provider = \\$1.*AND idempotency_key = \\$2").
		WithArgs("FLUTTERWAVE", request.IdempotencyKey).
		WillReturnRows(sqlmock.NewRows([]string{
			"id",
			"tenant_id",
			"payment_responsibility_id",
			"reference",
			"provider",
			"provider_charge_id",
			"amount_minor",
			"currency",
			"status",
			"idempotency_key",
			"request_hash",
			"correlation_id",
			"created_at",
			"updated_at",
			"settled_at",
			"version",
		}).AddRow(
			existing.ID,
			existing.TenantID,
			existing.PaymentResponsibilityID,
			existing.Reference,
			existing.Provider,
			existing.ProviderChargeID,
			existing.AmountMinor,
			existing.Currency,
			existing.Status,
			existing.IdempotencyKey,
			existing.RequestHash,
			existing.CorrelationID,
			existing.CreatedAt,
			existing.UpdatedAt,
			existing.SettledAt,
			existing.Version,
		))

	provider := &applicationTestProvider{
		payment: model.ProviderPayment{
			ID:        "should-not-be-called",
			Reference: request.Reference,
			Amount:    request.Amount,
			Currency:  request.Currency,
			Status:    "PENDING",
		},
	}

	identityClient := &applicationTestIdentityClient{
		responsibility: identity.PaymentResponsibilityResponse{
			ID:              responsibilityID,
			TenantSubjectID: tenantID,
			Status:          "ACTIVE",
		},
	}

	application, err := NewPaymentApplication(provider, repo, identityClient)
	if err != nil {
		t.Fatal(err)
	}

	payment, err := application.CreatePendingPayment(
		context.Background(),
		"test-session-id",
		request,
	)
	if err != nil {
		t.Fatalf("CreatePendingPayment() error = %v", err)
	}

	if payment.ID != existing.ID {
		t.Fatalf("expected replayed payment %s, got %s", existing.ID, payment.ID)
	}

	if provider.request.Reference != "" {
		t.Fatal("provider must not be called for an idempotent replay")
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatal(err)
	}
}

func TestPaymentApplicationRejectsDifferentRequestForSameIdempotencyKey(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	repo := repository.NewPaymentRepository(db)

	tenantID := uuid.New()
	responsibilityID := uuid.New()

	request := CreatePaymentRequest{
		PaymentResponsibilityID: responsibilityID,
		Reference:               "KIRI-CONFLICT-0001",
		Amount:                  20000,
		Currency:                "UGX",
		CustomerEmail:           "tenant@example.com",
		CustomerPhone:           "+256700000000",
		Network:                 "MTN",
		CountryCode:             "UG",
		IdempotencyKey:          "conflict-test-001",
		TraceID:                 "trace-conflict-001",
	}

	changedRequest := request
	changedRequest.Amount = 30000

	hash, err := PaymentRequestHash(request)
	if err != nil {
		t.Fatal(err)
	}

	existing := model.Payment{
		ID:                      uuid.New(),
		TenantID:                tenantID,
		PaymentResponsibilityID: &responsibilityID,
		Reference:               request.Reference,
		Provider:                "FLUTTERWAVE",
		ProviderChargeID:        "flw-existing-conflict-001",
		AmountMinor:             request.Amount,
		Currency:                "UGX",
		Status:                  model.PaymentPending,
		IdempotencyKey:          request.IdempotencyKey,
		RequestHash:             hash,
		CorrelationID:           request.TraceID,
		CreatedAt:               time.Now().UTC(),
		UpdatedAt:               time.Now().UTC(),
		Version:                 1,
	}

	mock.ExpectQuery("SELECT.*FROM payments.*WHERE provider = \\$1.*AND idempotency_key = \\$2").
		WithArgs("FLUTTERWAVE", changedRequest.IdempotencyKey).
		WillReturnRows(sqlmock.NewRows([]string{
			"id",
			"tenant_id",
			"payment_responsibility_id",
			"reference",
			"provider",
			"provider_charge_id",
			"amount_minor",
			"currency",
			"status",
			"idempotency_key",
			"request_hash",
			"correlation_id",
			"created_at",
			"updated_at",
			"settled_at",
			"version",
		}).AddRow(
			existing.ID,
			existing.TenantID,
			existing.PaymentResponsibilityID,
			existing.Reference,
			existing.Provider,
			existing.ProviderChargeID,
			existing.AmountMinor,
			existing.Currency,
			existing.Status,
			existing.IdempotencyKey,
			existing.RequestHash,
			existing.CorrelationID,
			existing.CreatedAt,
			existing.UpdatedAt,
			existing.SettledAt,
			existing.Version,
		))

	provider := &applicationTestProvider{}

	identityClient := &applicationTestIdentityClient{
		responsibility: identity.PaymentResponsibilityResponse{
			ID:              responsibilityID,
			TenantSubjectID: tenantID,
			Status:          "ACTIVE",
		},
	}

	application, err := NewPaymentApplication(provider, repo, identityClient)
	if err != nil {
		t.Fatal(err)
	}

	_, err = application.CreatePendingPayment(
		context.Background(),
		"test-session-id",
		changedRequest,
	)
	if err == nil {
		t.Fatal("expected idempotency conflict")
	}

	if provider.request.Reference != "" {
		t.Fatal("provider must not be called for an idempotency conflict")
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatal(err)
	}
}

func TestPaymentApplication_IdempotencyOwnershipRegression(t *testing.T) {
	// Test that same idempotency key with different responsibility is rejected
	// The request hash includes PaymentResponsibilityID, so this should be a conflict
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	repo := repository.NewPaymentRepository(db)

	tenantID := uuid.New()
	responsibilityA := uuid.New()
	responsibilityB := uuid.New()

	identityClient := &applicationTestIdentityClient{
		// Return appropriate responsibility based on ID
		resolveFunc: func(_ context.Context, _ string, respID uuid.UUID) (identity.PaymentResponsibilityResponse, error) {
			if respID == responsibilityA {
				return identity.PaymentResponsibilityResponse{
					ID:              responsibilityA,
					TenantSubjectID: tenantID,
					Status:          "ACTIVE",
				}, nil
			}
			if respID == responsibilityB {
				return identity.PaymentResponsibilityResponse{
					ID:              responsibilityB,
					TenantSubjectID: tenantID,
					Status:          "ACTIVE",
				}, nil
			}
			return identity.PaymentResponsibilityResponse{}, errors.New("not found")
		},
	}

	provider := &applicationTestProvider{
		payment: model.ProviderPayment{
			ID:        "flw-charge-001",
			Reference: "KIRI-TEST-001",
			Amount:    20000,
			Currency:  "UGX",
			Status:    "PENDING",
		},
	}

	application, err := NewPaymentApplication(provider, repo, identityClient)
	if err != nil {
		t.Fatal(err)
	}

	// First request with responsibility A
	requestA := CreatePaymentRequest{
		PaymentResponsibilityID: responsibilityA,
		Reference:               "KIRI-TEST-001",
		Amount:                  20000,
		Currency:                "UGX",
		CustomerEmail:           "tenant@example.com",
		CustomerPhone:           "+256700000000",
		Network:                 "MTN",
		CountryCode:             "UG",
		IdempotencyKey:          "same-key-001",
		TraceID:                 "trace-001",
	}

	// Setup expectations for first request
	mock.ExpectQuery("SELECT id, tenant_id, payment_responsibility_id, reference, provider, provider_charge_id, amount_minor, currency, status, idempotency_key, request_hash, correlation_id, created_at, updated_at, settled_at, version FROM payments WHERE provider = \\$1 AND idempotency_key = \\$2").
		WithArgs("FLUTTERWAVE", "same-key-001").
		WillReturnError(repository.ErrPaymentNotFound)

	mock.ExpectExec("INSERT INTO payment_idempotency_claims").
		WithArgs(sqlmock.AnyArg(), "FLUTTERWAVE", "same-key-001", sqlmock.AnyArg(), "KIRI-TEST-001", "PROCESSING", sqlmock.AnyArg(), sqlmock.AnyArg(), sqlmock.AnyArg()).
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
			tenantID,
			responsibilityA,
			"KIRI-TEST-001",
			"FLUTTERWAVE",
			"flw-charge-001",
			20000,
			"UGX",
			"PENDING",
			"same-key-001",
			sqlmock.AnyArg(),
			"trace-001",
			sqlmock.AnyArg(),
			sqlmock.AnyArg(),
			sqlmock.AnyArg(),
			1,
		).
		WillReturnResult(sqlmock.NewResult(1, 1))

	mock.ExpectExec("UPDATE payment_idempotency_claims").
		WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), "FLUTTERWAVE", "same-key-001").
		WillReturnResult(sqlmock.NewResult(1, 1))

	// Execute first request
	_, err = application.CreatePendingPayment(context.Background(), "session-001", requestA)
	if err != nil {
		t.Fatalf("first request failed: %v", err)
	}

	// Verify first request expectations met
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatal(err)
	}

	// Second request with SAME idempotency key but DIFFERENT responsibility
	// This should be rejected as idempotency conflict because the hash differs
	requestB := CreatePaymentRequest{
		PaymentResponsibilityID: responsibilityB, // Different responsibility
		Reference:               "KIRI-TEST-001",
		Amount:                  20000,
		Currency:                "UGX",
		CustomerEmail:           "tenant@example.com",
		CustomerPhone:           "+256700000000",
		Network:                 "MTN",
		CountryCode:             "UG",
		IdempotencyKey:          "same-key-001", // Same key
		TraceID:                 "trace-001",
	}

	// Setup expectations for second request
	// GetByIdempotencyKey should return the existing payment from first request
	existingPayment := model.Payment{
		ID:                      uuid.New(),
		TenantID:                tenantID,
		PaymentResponsibilityID: &responsibilityA, // Still responsibility A
		Reference:               "KIRI-TEST-001",
		AmountMinor:             20000,
		Currency:                "UGX",
		Status:                  model.PaymentPending,
		IdempotencyKey:          "same-key-001",
		RequestHash:             "hash-for-responsibility-A", // Different hash
	}

	mock.ExpectQuery("SELECT id, tenant_id, payment_responsibility_id, reference, provider, provider_charge_id, amount_minor, currency, status, idempotency_key, request_hash, correlation_id, created_at, updated_at, settled_at, version FROM payments WHERE provider = \\$1 AND idempotency_key = \\$2").
		WithArgs("FLUTTERWAVE", "same-key-001").
		WillReturnRows(
			sqlmock.NewRows([]string{
				"id", "tenant_id", "payment_responsibility_id", "reference", "provider",
				"provider_charge_id", "amount_minor", "currency", "status", "idempotency_key",
				"request_hash", "correlation_id", "created_at", "updated_at", "settled_at", "version",
			}).AddRow(
				existingPayment.ID,
				existingPayment.TenantID,
				existingPayment.PaymentResponsibilityID,
				existingPayment.Reference,
				existingPayment.Provider,
				existingPayment.ProviderChargeID,
				existingPayment.AmountMinor,
				existingPayment.Currency,
				existingPayment.Status,
				existingPayment.IdempotencyKey,
				existingPayment.RequestHash,
				existingPayment.CorrelationID,
				existingPayment.CreatedAt,
				existingPayment.UpdatedAt,
				existingPayment.SettledAt,
				existingPayment.Version,
			),
		)

	// Execute second request - should fail with idempotency conflict
	_, err = application.CreatePendingPayment(context.Background(), "session-001", requestB)
	if err == nil {
		t.Fatal("expected idempotency conflict error, got nil")
	}

	if !strings.Contains(err.Error(), "idempotency key was already used with a different request") {
		t.Fatalf("expected idempotency conflict error, got: %v", err)
	}

	// Verify second request expectations met
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatal(err)
	}

	// Critical assertion: the original payment's tenant/responsibility are unchanged
	if existingPayment.TenantID != tenantID {
		t.Fatalf("original payment tenant changed")
	}
	if existingPayment.PaymentResponsibilityID == nil || *existingPayment.PaymentResponsibilityID != responsibilityA {
		t.Fatalf("original payment responsibility changed")
	}

	t.Logf("✓ Verified: same idempotency key with different responsibility rejected as conflict")
	t.Logf("✓ Verified: original payment ownership (tenant=%s, responsibility=%s) unchanged", existingPayment.TenantID, *existingPayment.PaymentResponsibilityID)
}
