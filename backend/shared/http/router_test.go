package http

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHealthEndpoint(t *testing.T) {
	router := NewRouter(
		"kirilock-test",
		NewStaticReadiness(true),
	)

	req := httptest.NewRequest(
		http.MethodGet,
		"/api/v1/health",
		nil,
	)

	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rec.Code)
	}

	if rec.Header().Get(HeaderRequestID) == "" {
		t.Fatal("expected request ID")
	}

	var response HealthResponse

	if err := json.NewDecoder(rec.Body).Decode(&response); err != nil {
		t.Fatalf("invalid JSON response: %v", err)
	}

	if response.Status != "ok" {
		t.Fatalf("expected status ok, got %q", response.Status)
	}
}

func TestReadinessEndpoint(t *testing.T) {
	router := NewRouter(
		"kirilock-test",
		NewStaticReadiness(false),
	)

	req := httptest.NewRequest(
		http.MethodGet,
		"/api/v1/ready",
		nil,
	)

	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusServiceUnavailable {
		t.Fatalf("expected 503, got %d", rec.Code)
	}
}

func TestUnsupportedContentType(t *testing.T) {
	router := NewRouter(
		"kirilock-test",
		NewStaticReadiness(true),
	)

	req := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/test",
		nil,
	)

	req.Header.Set("Content-Type", "text/plain")

	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusUnsupportedMediaType {
		t.Fatalf("expected 415, got %d", rec.Code)
	}
}

func TestRequestIDPropagation(t *testing.T) {
	router := NewRouter(
		"kirilock-test",
		NewStaticReadiness(true),
	)

	req := httptest.NewRequest(
		http.MethodGet,
		"/api/v1/health",
		nil,
	)

	req.Header.Set(HeaderRequestID, "test-request-123")
	req.Header.Set(HeaderCorrelationID, "test-correlation-456")

	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if got := rec.Header().Get(HeaderRequestID); got != "test-request-123" {
		t.Fatalf("unexpected request ID: %q", got)
	}

	if got := rec.Header().Get(HeaderCorrelationID); got != "test-correlation-456" {
		t.Fatalf("unexpected correlation ID: %q", got)
	}
}

func TestInvalidRequestIDIsReplaced(t *testing.T) {
	router := NewRouter(
		"kirilock-test",
		NewStaticReadiness(true),
	)

	req := httptest.NewRequest(
		http.MethodGet,
		"/api/v1/health",
		nil,
	)

	req.Header.Set(HeaderRequestID, "bad value\nforged")

	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Header().Get(HeaderRequestID) == "bad value\nforged" {
		t.Fatal("invalid request ID was accepted")
	}

	if rec.Header().Get(HeaderRequestID) == "" {
		t.Fatal("expected generated request ID")
	}
}
