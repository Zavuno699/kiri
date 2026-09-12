#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo
echo "============================================================"
echo " KiriLock Phase 4 — Payment HTTP Contract"
echo "============================================================"
echo

###############################################################################
# 1. Create billing service structure
###############################################################################

mkdir -p \
    billing-service/cmd \
    billing-service/internal/handler \
    billing-service/internal/model \
    billing-service/internal/service

###############################################################################
# 2. Payment model
###############################################################################

cat > billing-service/internal/model/payment.go <<'EOF'
package model

import (
	"time"

	"github.com/kirilock/backend/tests/contract"
)

type PaymentStatus string

const (
	PaymentStatusAccepted PaymentStatus = "accepted"
)

type PaymentResult struct {
	PaymentID      string        `json:"payment_id"`
	Status         PaymentStatus `json:"status"`
	TenantPhone    string        `json:"tenant_phone"`
	AmountUGX      int64         `json:"amount_ugx"`
	DaysRequested  int           `json:"days_requested"`
	CurrencyCode   string        `json:"currency_code"`
	IdempotencyKey string        `json:"idempotency_key"`
	CreatedAt      time.Time     `json:"created_at"`
}

type PaymentRequest = contract.LeasePaymentPayload
EOF

###############################################################################
# 3. In-memory payment service
#
# This is deliberately NOT a production payment ledger.
# It exists only to prove the HTTP contract and idempotency boundary.
###############################################################################

cat > billing-service/internal/service/payment.go <<'EOF'
package service

import (
	"errors"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/kirilock/backend/billing-service/internal/model"
)

var (
	ErrIdempotencyConflict = errors.New("idempotency key already used with different request")
)

type paymentRecord struct {
	fingerprint string
	result      model.PaymentResult
}

type PaymentService struct {
	mu      sync.Mutex
	records map[string]paymentRecord
}

func NewPaymentService() *PaymentService {
	return &PaymentService{
		records: make(map[string]paymentRecord),
	}
}

func (s *PaymentService) Create(
	request model.PaymentRequest,
	fingerprint string,
) (model.PaymentResult, bool, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	if existing, ok := s.records[request.IdempotencyKey]; ok {
		if existing.fingerprint != fingerprint {
			return model.PaymentResult{}, false, ErrIdempotencyConflict
		}

		return existing.result, true, nil
	}

	result := model.PaymentResult{
		PaymentID:      uuid.NewString(),
		Status:         model.PaymentStatusAccepted,
		TenantPhone:    request.TenantPhone,
		AmountUGX:      request.AmountUGX,
		DaysRequested:  request.DaysRequested,
		CurrencyCode:   request.CurrencyCode,
		IdempotencyKey: request.IdempotencyKey,
		CreatedAt:      time.Now().UTC(),
	}

	s.records[request.IdempotencyKey] = paymentRecord{
		fingerprint: fingerprint,
		result:      result,
	}

	return result, false, nil
}
EOF

###############################################################################
# 4. Payment HTTP handler
#
# Security properties:
# - bounded body
# - DisallowUnknownFields
# - exactly one JSON value
# - structural validation
# - no raw internal errors returned
###############################################################################

cat > billing-service/internal/handler/payment.go <<'EOF'
package handler

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"io"
	"net/http"

	"github.com/kirilock/backend/billing-service/internal/model"
	"github.com/kirilock/backend/billing-service/internal/service"
	khttp "github.com/kirilock/backend/shared/http"
	"github.com/kirilock/backend/shared/validation"
)

const maxPaymentBodySize = 16 * 1024

type PaymentHandler struct {
	validator *validation.Validator
	service   *service.PaymentService
}

func NewPaymentHandler(
	validator *validation.Validator,
	service *service.PaymentService,
) *PaymentHandler {
	return &PaymentHandler{
		validator: validator,
		service:   service,
	}
}

func (h *PaymentHandler) ServeHTTP(
	w http.ResponseWriter,
	r *http.Request,
) {
	if r.Method != http.MethodPost {
		khttp.WriteError(
			w,
			http.StatusMethodNotAllowed,
			"METHOD_NOT_ALLOWED",
			"method not allowed",
			khttp.RequestID(r.Context()),
			nil,
		)
		return
	}

	body, err := io.ReadAll(
		http.MaxBytesReader(w, r.Body, maxPaymentBodySize),
	)
	if err != nil {
		if errors.Is(err, http.ErrBodyReadAfterClose) {
			khttp.WriteError(
				w,
				http.StatusBadRequest,
				"INVALID_REQUEST",
				"request body could not be read",
				khttp.RequestID(r.Context()),
				nil,
			)
			return
		}

		khttp.WriteError(
			w,
			http.StatusRequestEntityTooLarge,
			"REQUEST_TOO_LARGE",
			"request body is too large",
			khttp.RequestID(r.Context()),
			nil,
		)
		return
	}

	decoder := json.NewDecoder(bytes.NewReader(body))
	decoder.DisallowUnknownFields()

	var request model.PaymentRequest

	if err := decoder.Decode(&request); err != nil {
		khttp.WriteError(
			w,
			http.StatusBadRequest,
			"INVALID_JSON",
			"request body contains invalid JSON",
			khttp.RequestID(r.Context()),
			nil,
		)
		return
	}

	// Exactly one JSON value is permitted.
	var trailing any
	if err := decoder.Decode(&trailing); err != io.EOF {
		khttp.WriteError(
			w,
			http.StatusBadRequest,
			"INVALID_JSON",
			"request body must contain exactly one JSON object",
			khttp.RequestID(r.Context()),
			nil,
		)
		return
	}

	result := h.validator.Struct(request)

	if !result.Valid {
		khttp.WriteError(
			w,
			http.StatusUnprocessableEntity,
			"VALIDATION_ERROR",
			"request validation failed",
			khttp.RequestID(r.Context()),
			result.Fields,
		)
		return
	}

	fingerprint := requestFingerprint(request)

	payment, replayed, err := h.service.Create(
		request,
		fingerprint,
	)

	if err != nil {
		if errors.Is(err, service.ErrIdempotencyConflict) {
			khttp.WriteError(
				w,
				http.StatusConflict,
				"IDEMPOTENCY_CONFLICT",
				"idempotency key was already used with a different request",
				khttp.RequestID(r.Context()),
				nil,
			)
			return
		}

		khttp.WriteError(
			w,
			http.StatusInternalServerError,
			"INTERNAL_ERROR",
			"an internal error occurred",
			khttp.RequestID(r.Context()),
			nil,
		)
		return
	}

	status := http.StatusCreated

	if replayed {
		status = http.StatusOK
	}

	khttp.WriteJSON(
		w,
		status,
		payment,
	)
}

func requestFingerprint(request model.PaymentRequest) string {
	payload, _ := json.Marshal(request)

	sum := sha256.Sum256(payload)

	return hex.EncodeToString(sum[:])
}
EOF

###############################################################################
# 5. Billing service composition
###############################################################################

cat > billing-service/internal/handler/routes.go <<'EOF'
package handler

import (
	"net/http"

	"github.com/kirilock/backend/shared/validation"
)

func RegisterPaymentRoute(
	mux *http.ServeMux,
	validator *validation.Validator,
	paymentHandler http.Handler,
) {
	mux.Handle(
		"POST /api/v1/payments",
		paymentHandler,
	)

	_ = validator
}
EOF

###############################################################################
# 6. API router extension
#
# Preserve the existing NewRouter API so current tests remain compatible.
###############################################################################

cat > shared/http/api_routes.go <<'EOF'
package http

import (
	"net/http"

	"github.com/kirilock/backend/billing-service/internal/handler"
	"github.com/kirilock/backend/billing-service/internal/service"
	"github.com/kirilock/backend/shared/validation"
)

func NewAPIRouter(
	serviceName string,
	readiness ReadinessChecker,
) http.Handler {
	validator := validation.New()
	paymentService := service.NewPaymentService()
	paymentHandler := handler.NewPaymentHandler(
		validator,
		paymentService,
	)

	mux := http.NewServeMux()

	mux.Handle(
		"GET /api/v1/health",
		HealthHandler(serviceName),
	)

	mux.Handle(
		"GET /api/v1/ready",
		ReadinessHandler(serviceName, readiness),
	)

	mux.HandleFunc(
		"GET /api/v1",
		func(w http.ResponseWriter, r *http.Request) {
			WriteJSON(w, http.StatusOK, map[string]any{
				"service": serviceName,
				"version": "v1",
			})
		},
	)

	handler.RegisterPaymentRoute(
		mux,
		validator,
		paymentHandler,
	)

	result := http.Handler(mux)

	result = Recover(result)
	result = SecurityHeaders(result)
	result = RequestMetadata(result)
	result = RequireJSON(result)

	return result
}
EOF

###############################################################################
# 7. Update main to use the API router.
###############################################################################

python3 - <<'PY'
from pathlib import Path

p = Path("cmd/kirilock-api/main.go")
s = p.read_text()

old = '''router := khttp.NewRouter(
		serviceName,
		readiness,
	)'''

new = '''router := khttp.NewAPIRouter(
		serviceName,
		readiness,
	)'''

if old not in s:
    raise SystemExit("expected router construction was not found")

p.write_text(s.replace(old, new))
PY

###############################################################################
# 8. Integration tests
###############################################################################

cat > billing-service/internal/handler/payment_test.go <<'EOF'
package handler

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/kirilock/backend/billing-service/internal/service"
	khttp "github.com/kirilock/backend/shared/http"
	"github.com/kirilock/backend/shared/validation"
)

func newTestHandler() http.Handler {
	return NewPaymentHandler(
		validation.New(),
		service.NewPaymentService(),
	)
}

func validPayload() string {
	return `{
		"tenant_phone": "+256700000000",
		"amount_ugx": 20000,
		"days_requested": 30,
		"idempotency_key": "550e8400-e29b-41d4-a716-446655440000",
		"currency_code": "UGX"
	}`
}

func TestPaymentValidRequest(t *testing.T) {
	req := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/payments",
		strings.NewReader(validPayload()),
	)

	req = req.WithContext(
		khttp.WithRequestMetadata(
			req.Context(),
			"request-test-1",
			"correlation-test-1",
		),
	)

	rec := httptest.NewRecorder()

	newTestHandler().ServeHTTP(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf(
			"expected 201, got %d: %s",
			rec.Code,
			rec.Body.String(),
		)
	}

	if got := rec.Header().Get("Content-Type"); !strings.HasPrefix(
		got,
		"application/json",
	) {
		t.Fatalf("unexpected content type: %q", got)
	}
}

func TestPaymentRejectsMalformedJSON(t *testing.T) {
	req := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/payments",
		strings.NewReader(`{"tenant_phone":`),
	)

	rec := httptest.NewRecorder()

	newTestHandler().ServeHTTP(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", rec.Code)
	}
}

func TestPaymentRejectsUnknownField(t *testing.T) {
	body := validPayload()
	body = strings.TrimSuffix(body, "\n}") + `,
		"unexpected": true
	}`

	req := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/payments",
		strings.NewReader(body),
	)

	rec := httptest.NewRecorder()

	newTestHandler().ServeHTTP(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d: %s", rec.Code, rec.Body.String())
	}
}

func TestPaymentRejectsTrailingJSON(t *testing.T) {
	body := validPayload() + `{"another":"object"}`

	req := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/payments",
		strings.NewReader(body),
	)

	rec := httptest.NewRecorder()

	newTestHandler().ServeHTTP(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", rec.Code)
	}
}

func TestPaymentRejectsInvalidPayload(t *testing.T) {
	body := `{
		"tenant_phone": "0700000000",
		"amount_ugx": 100,
		"days_requested": 0,
		"idempotency_key": "not-a-uuid",
		"currency_code": "EUR"
	}`

	req := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/payments",
		strings.NewReader(body),
	)

	rec := httptest.NewRecorder()

	newTestHandler().ServeHTTP(rec, req)

	if rec.Code != http.StatusUnprocessableEntity {
		t.Fatalf(
			"expected 422, got %d: %s",
			rec.Code,
			rec.Body.String(),
		)
	}

	var response map[string]any

	if err := json.Unmarshal(rec.Body.Bytes(), &response); err != nil {
		t.Fatalf("response is not valid JSON: %v", err)
	}

	if _, ok := response["error"]; !ok {
		t.Fatalf("expected structured error response: %s", rec.Body.String())
	}
}

func TestPaymentIdempotencyReplay(t *testing.T) {
	svc := service.NewPaymentService()

	h := NewPaymentHandler(
		validation.New(),
		svc,
	)

	first := httptest.NewRecorder()

	req1 := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/payments",
		strings.NewReader(validPayload()),
	)

	h.ServeHTTP(first, req1)

	if first.Code != http.StatusCreated {
		t.Fatalf("first request expected 201, got %d", first.Code)
	}

	second := httptest.NewRecorder()

	req2 := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/payments",
		strings.NewReader(validPayload()),
	)

	h.ServeHTTP(second, req2)

	if second.Code != http.StatusOK {
		t.Fatalf("replay expected 200, got %d", second.Code)
	}

	var firstResponse map[string]any
	var secondResponse map[string]any

	if err := json.Unmarshal(first.Body.Bytes(), &firstResponse); err != nil {
		t.Fatal(err)
	}

	if err := json.Unmarshal(second.Body.Bytes(), &secondResponse); err != nil {
		t.Fatal(err)
	}

	if firstResponse["payment_id"] != secondResponse["payment_id"] {
		t.Fatal("idempotent replay returned a different payment ID")
	}
}

func TestPaymentIdempotencyConflict(t *testing.T) {
	svc := service.NewPaymentService()

	h := NewPaymentHandler(
		validation.New(),
		svc,
	)

	firstBody := validPayload()

	first := httptest.NewRecorder()

	req1 := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/payments",
		strings.NewReader(firstBody),
	)

	h.ServeHTTP(first, req1)

	if first.Code != http.StatusCreated {
		t.Fatalf("first request expected 201, got %d", first.Code)
	}

	conflictingBody := strings.Replace(
		firstBody,
		`"amount_ugx": 20000`,
		`"amount_ugx": 40000`,
		1,
	)

	second := httptest.NewRecorder()

	req2 := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/payments",
		strings.NewReader(conflictingBody),
	)

	h.ServeHTTP(second, req2)

	if second.Code != http.StatusConflict {
		t.Fatalf(
			"expected 409, got %d: %s",
			second.Code,
			second.Body.String(),
		)
	}
}
EOF

###############################################################################
# 9. Format
###############################################################################

echo "==> Formatting"
gofmt -w \
	billing-service/internal/model/payment.go \
	billing-service/internal/service/payment.go \
	billing-service/internal/handler/payment.go \
	billing-service/internal/handler/routes.go \
	billing-service/internal/handler/payment_test.go \
	shared/http/api_routes.go \
	cmd/kirilock-api/main.go

###############################################################################
# 10. Tests
###############################################################################

echo "==> Running all tests"
go test ./...

echo "==> Running race detector"
go test -race ./...

echo "==> Running vet"
go vet ./...

###############################################################################
# 11. Build
###############################################################################

echo "==> Building API"
mkdir -p bin
go build -o bin/kirilock-api ./cmd/kirilock-api

echo
echo "============================================================"
echo " KiriLock Phase 4 PASSED"
echo "============================================================"
echo
echo "Payment HTTP contract:"
echo "  POST /api/v1/payments"
echo
echo "Verified:"
echo "  Strict JSON decoding          OK"
echo "  Unknown-field rejection       OK"
echo "  Trailing JSON rejection       OK"
echo "  Body-size boundary            OK"
echo "  Validation → HTTP 422         OK"
echo "  Structured API errors         OK"
echo "  Idempotency replay            OK"
echo "  Idempotency conflict          OK"
echo "  Race detector                 OK"
echo "  go vet                        OK"
echo "  API build                     OK"
echo
ls -lh bin/kirilock-api
