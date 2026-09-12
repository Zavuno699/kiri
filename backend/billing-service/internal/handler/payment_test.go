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
