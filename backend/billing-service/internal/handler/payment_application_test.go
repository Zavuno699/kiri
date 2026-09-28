package handler

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/google/uuid"

	"github.com/kirilock/backend/billing-service/internal/identity"
	"github.com/kirilock/backend/billing-service/internal/model"
	"github.com/kirilock/backend/billing-service/internal/repository"
	"github.com/kirilock/backend/billing-service/internal/service"
	"github.com/kirilock/backend/shared/validation"
)

// fakePaymentCreator is a fake implementation of paymentCreator for testing
type fakePaymentCreator struct {
	createFunc func(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error)
}

func (f *fakePaymentCreator) CreatePendingPayment(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error) {
	if f.createFunc != nil {
		return f.createFunc(ctx, sessionID, request)
	}
	return model.Payment{}, nil
}

func TestPaymentApplicationHandler_ErrorCodeMapping(t *testing.T) {
	validator := validation.New()
	responsibilityID := uuid.New()

	// Create a valid request struct
	validRequest := service.CreatePaymentRequest{
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

	validRequestBody, err := json.Marshal(validRequest)
	if err != nil {
		t.Fatalf("failed to marshal request: %v", err)
	}

	tests := []struct {
		name           string
		createFunc     func(context.Context, string, service.CreatePaymentRequest) (model.Payment, error)
		expectedStatus int
	}{
		{
			name: "invalid session returns 401",
			createFunc: func(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error) {
				return model.Payment{}, fmt.Errorf("invalid session: %w", identity.ErrInvalidSession)
			},
			expectedStatus: http.StatusUnauthorized,
		},
		{
			name: "forbidden returns 403",
			createFunc: func(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error) {
				return model.Payment{}, fmt.Errorf("forbidden: %w", identity.ErrForbidden)
			},
			expectedStatus: http.StatusForbidden,
		},
		{
			name: "responsibility not found returns 404",
			createFunc: func(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error) {
				return model.Payment{}, fmt.Errorf("payment responsibility not found: %w", identity.ErrResponsibilityNotFound)
			},
			expectedStatus: http.StatusNotFound,
		},
		{
			name: "responsibility conflict returns 409",
			createFunc: func(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error) {
				return model.Payment{}, fmt.Errorf("payment responsibility conflict: %w", identity.ErrResponsibilityConflict)
			},
			expectedStatus: http.StatusConflict,
		},
		{
			name: "payment responsibility not active returns 409",
			createFunc: func(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error) {
				return model.Payment{}, errors.New("payment responsibility is not active")
			},
			expectedStatus: http.StatusConflict,
		},
		{
			name: "idempotency conflict returns 409",
			createFunc: func(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error) {
				return model.Payment{}, fmt.Errorf("idempotency key was already used with a different request: %w", repository.ErrIdempotencyConflict)
			},
			expectedStatus: http.StatusConflict,
		},
		{
			name: "idempotency conflict string returns 409",
			createFunc: func(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error) {
				return model.Payment{}, errors.New("idempotency key was already used with a different request")
			},
			expectedStatus: http.StatusConflict,
		},
		{
			name: "idempotency claimed returns 409",
			createFunc: func(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error) {
				return model.Payment{}, repository.ErrIdempotencyClaimed
			},
			expectedStatus: http.StatusConflict,
		},
		{
			name: "unexpected error returns 500",
			createFunc: func(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error) {
				return model.Payment{}, errors.New("something unexpected")
			},
			expectedStatus: http.StatusInternalServerError,
		},
		{
			name: "success returns 201",
			createFunc: func(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error) {
				return model.Payment{
					ID:                      uuid.New(),
					TenantID:                uuid.New(),
					PaymentResponsibilityID: &responsibilityID,
					Reference:               request.Reference,
					AmountMinor:             request.Amount,
					Currency:                request.Currency,
					Status:                  model.PaymentPending,
				}, nil
			},
			expectedStatus: http.StatusCreated,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			fake := &fakePaymentCreator{createFunc: tt.createFunc}
			handler, err := NewPaymentApplicationHandler(validator, fake)
			if err != nil {
				t.Fatalf("NewPaymentApplicationHandler: %v", err)
			}

			req := httptest.NewRequest("POST", "/api/v1/payments", strings.NewReader(string(validRequestBody)))
			req.Header.Set("Authorization", "Bearer test-session-id")
			w := httptest.NewRecorder()

			handler.ServeHTTP(w, req)

			if w.Code != tt.expectedStatus {
				t.Errorf("expected status %d, got %d: %s", tt.expectedStatus, w.Code, w.Body.String())
			}
		})
	}
}

func TestPaymentApplicationHandler_BadJSON(t *testing.T) {
	fake := &fakePaymentCreator{
		createFunc: func(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error) {
			return model.Payment{}, nil
		},
	}
	handler, err := NewPaymentApplicationHandler(validation.New(), fake)
	if err != nil {
		t.Fatalf("NewPaymentApplicationHandler: %v", err)
	}

	req := httptest.NewRequest("POST", "/api/v1/payments", strings.NewReader(`{"invalid json`))
	req.Header.Set("Authorization", "Bearer test-session-id")
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("expected 400, got %d: %s", w.Code, w.Body.String())
	}
}

func TestPaymentApplicationHandler_ValidationFailure(t *testing.T) {
	fake := &fakePaymentCreator{
		createFunc: func(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error) {
			return model.Payment{}, nil
		},
	}
	handler, err := NewPaymentApplicationHandler(validation.New(), fake)
	if err != nil {
		t.Fatalf("NewPaymentApplicationHandler: %v", err)
	}

	// Missing required field
	invalidBody := `{
		"reference": "KIRI-TEST-001",
		"amount": 20000,
		"currency": "UGX"
	}`

	req := httptest.NewRequest("POST", "/api/v1/payments", strings.NewReader(invalidBody))
	req.Header.Set("Authorization", "Bearer test-session-id")
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	if w.Code != http.StatusUnprocessableEntity {
		t.Errorf("expected 422, got %d: %s", w.Code, w.Body.String())
	}
}

func TestPaymentApplicationHandler_MissingAuthHeader(t *testing.T) {
	fake := &fakePaymentCreator{
		createFunc: func(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error) {
			return model.Payment{}, nil
		},
	}
	handler, err := NewPaymentApplicationHandler(validation.New(), fake)
	if err != nil {
		t.Fatalf("NewPaymentApplicationHandler: %v", err)
	}

	validRequest := service.CreatePaymentRequest{
		PaymentResponsibilityID: uuid.New(),
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

	validRequestBody, err := json.Marshal(validRequest)
	if err != nil {
		t.Fatalf("failed to marshal request: %v", err)
	}

	req := httptest.NewRequest("POST", "/api/v1/payments", strings.NewReader(string(validRequestBody)))
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	if w.Code != http.StatusUnauthorized {
		t.Errorf("expected 401, got %d: %s", w.Code, w.Body.String())
	}
}

func TestPaymentApplicationHandler_SessionIDRequired(t *testing.T) {
	fake := &fakePaymentCreator{
		createFunc: func(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error) {
			return model.Payment{}, nil
		},
	}
	handler, err := NewPaymentApplicationHandler(validation.New(), fake)
	if err != nil {
		t.Fatalf("NewPaymentApplicationHandler: %v", err)
	}

	validRequest := service.CreatePaymentRequest{
		PaymentResponsibilityID: uuid.New(),
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

	validRequestBody, err := json.Marshal(validRequest)
	if err != nil {
		t.Fatalf("failed to marshal request: %v", err)
	}

	req := httptest.NewRequest("POST", "/api/v1/payments", strings.NewReader(string(validRequestBody)))
	req.Header.Set("Authorization", "Bearer ") // Empty Bearer token
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	if w.Code != http.StatusUnauthorized {
		t.Errorf("expected 401, got %d: %s", w.Code, w.Body.String())
	}
}

func TestPaymentApplicationHandler_SnakeCaseJSONDecodes(t *testing.T) {
	fake := &fakePaymentCreator{
		createFunc: func(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error) {
			// Verify the request was decoded correctly
			if request.Reference != "KIRI-TEST-001" {
				t.Errorf("expected Reference 'KIRI-TEST-001', got '%s'", request.Reference)
			}
			if request.Amount != 20000 {
				t.Errorf("expected Amount 20000, got %d", request.Amount)
			}
			if request.Currency != "UGX" {
				t.Errorf("expected Currency 'UGX', got '%s'", request.Currency)
			}
			if request.CustomerEmail != "tenant@example.com" {
				t.Errorf("expected CustomerEmail 'tenant@example.com', got '%s'", request.CustomerEmail)
			}
			if request.CustomerPhone != "+256700000000" {
				t.Errorf("expected CustomerPhone '+256700000000', got '%s'", request.CustomerPhone)
			}
			if request.Network != "MTN" {
				t.Errorf("expected Network 'MTN', got '%s'", request.Network)
			}
			if request.CountryCode != "UG" {
				t.Errorf("expected CountryCode 'UG', got '%s'", request.CountryCode)
			}
			if request.IdempotencyKey != "test-key-001" {
				t.Errorf("expected IdempotencyKey 'test-key-001', got '%s'", request.IdempotencyKey)
			}
			if request.TraceID != "trace-001" {
				t.Errorf("expected TraceID 'trace-001', got '%s'", request.TraceID)
			}
			return model.Payment{
				ID:                      uuid.New(),
				TenantID:                uuid.New(),
				PaymentResponsibilityID: &request.PaymentResponsibilityID,
				Reference:               request.Reference,
				AmountMinor:             request.Amount,
				Currency:                request.Currency,
				Status:                  model.PaymentPending,
			}, nil
		},
	}
	handler, err := NewPaymentApplicationHandler(validation.New(), fake)
	if err != nil {
		t.Fatalf("NewPaymentApplicationHandler: %v", err)
	}

	// Snake_case JSON body (actual API contract)
	snakeCaseBody := `{
		"payment_responsibility_id": "00000000-0000-0000-0000-000000000001",
		"reference": "KIRI-TEST-001",
		"amount": 20000,
		"currency": "UGX",
		"customer_email": "tenant@example.com",
		"customer_phone": "+256700000000",
		"network": "MTN",
		"country_code": "UG",
		"idempotency_key": "test-key-001",
		"trace_id": "trace-001"
	}`

	req := httptest.NewRequest("POST", "/api/v1/payments", strings.NewReader(snakeCaseBody))
	req.Header.Set("Authorization", "Bearer test-session-id")
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	// Should decode successfully and reach the fake, returning 201
	if w.Code != http.StatusCreated {
		t.Errorf("expected 201, got %d: %s", w.Code, w.Body.String())
	}
}

func TestPaymentApplicationHandler_UnknownFieldRejected(t *testing.T) {
	fake := &fakePaymentCreator{
		createFunc: func(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error) {
			return model.Payment{}, nil
		},
	}
	handler, err := NewPaymentApplicationHandler(validation.New(), fake)
	if err != nil {
		t.Fatalf("NewPaymentApplicationHandler: %v", err)
	}

	// Valid snake_case body with an unknown field
	bodyWithUnknownField := `{
		"payment_responsibility_id": "00000000-0000-0000-0000-000000000001",
		"reference": "KIRI-TEST-001",
		"amount": 20000,
		"currency": "UGX",
		"unknown_field": "should be rejected"
	}`

	req := httptest.NewRequest("POST", "/api/v1/payments", strings.NewReader(bodyWithUnknownField))
	req.Header.Set("Authorization", "Bearer test-session-id")
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	// DisallowUnknownFields should reject the unknown field with 400
	if w.Code != http.StatusBadRequest {
		t.Errorf("expected 400 for unknown field, got %d: %s", w.Code, w.Body.String())
	}
}
