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
