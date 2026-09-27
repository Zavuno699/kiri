package service

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
)

func TestDeviceHTTPCORSMiddleware_AllowedOrigin(t *testing.T) {
	// Set up allowed origins
	os.Setenv("CORS_ALLOWED_ORIGINS", "https://example.com,https://www.example.com")
	defer os.Unsetenv("CORS_ALLOWED_ORIGINS")

	middleware := NewDeviceHTTPCORSMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest("GET", "/test", nil)
	req.Header.Set("Origin", "https://example.com")
	w := httptest.NewRecorder()

	middleware.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", w.Code)
	}

	allowedOrigin := w.Header().Get("Access-Control-Allow-Origin")
	if allowedOrigin != "https://example.com" {
		t.Errorf("expected Access-Control-Allow-Origin to be https://example.com, got %s", allowedOrigin)
	}

	vary := w.Header().Get("Vary")
	if vary != "Origin" {
		t.Errorf("expected Vary header to be Origin, got %s", vary)
	}
}

func TestDeviceHTTPCORSMiddleware_NotAllowedOrigin(t *testing.T) {
	// Set up allowed origins
	os.Setenv("CORS_ALLOWED_ORIGINS", "https://example.com")
	defer os.Unsetenv("CORS_ALLOWED_ORIGINS")

	middleware := NewDeviceHTTPCORSMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest("GET", "/test", nil)
	req.Header.Set("Origin", "https://evil.com")
	w := httptest.NewRecorder()

	middleware.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", w.Code)
	}

	allowedOrigin := w.Header().Get("Access-Control-Allow-Origin")
	if allowedOrigin != "" {
		t.Errorf("expected no Access-Control-Allow-Origin header for disallowed origin, got %s", allowedOrigin)
	}
}

func TestDeviceHTTPCORSMiddleware_DevFallback(t *testing.T) {
	// No env var set, should use localhost fallback
	os.Unsetenv("CORS_ALLOWED_ORIGINS")

	middleware := NewDeviceHTTPCORSMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest("GET", "/test", nil)
	req.Header.Set("Origin", "http://localhost:5173")
	w := httptest.NewRecorder()

	middleware.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", w.Code)
	}

	allowedOrigin := w.Header().Get("Access-Control-Allow-Origin")
	if allowedOrigin != "http://localhost:5173" {
		t.Errorf("expected Access-Control-Allow-Origin to be http://localhost:5173, got %s", allowedOrigin)
	}
}

func TestDeviceHTTPCORSMiddleware_DevFallback_Rejected(t *testing.T) {
	// No env var set, should use localhost fallback
	os.Unsetenv("CORS_ALLOWED_ORIGINS")

	middleware := NewDeviceHTTPCORSMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest("GET", "/test", nil)
	req.Header.Set("Origin", "https://evil.com")
	w := httptest.NewRecorder()

	middleware.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", w.Code)
	}

	allowedOrigin := w.Header().Get("Access-Control-Allow-Origin")
	if allowedOrigin != "" {
		t.Errorf("expected no Access-Control-Allow-Origin header for disallowed origin, got %s", allowedOrigin)
	}
}

func TestDeviceHTTPCORSMiddleware_Preflight(t *testing.T) {
	os.Setenv("CORS_ALLOWED_ORIGINS", "https://example.com")
	defer os.Unsetenv("CORS_ALLOWED_ORIGINS")

	middleware := NewDeviceHTTPCORSMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest("OPTIONS", "/test", nil)
	req.Header.Set("Origin", "https://example.com")
	w := httptest.NewRecorder()

	middleware.ServeHTTP(w, req)

	if w.Code != http.StatusNoContent {
		t.Errorf("expected 204 for OPTIONS, got %d", w.Code)
	}

	allowedOrigin := w.Header().Get("Access-Control-Allow-Origin")
	if allowedOrigin != "https://example.com" {
		t.Errorf("expected Access-Control-Allow-Origin to be https://example.com, got %s", allowedOrigin)
	}

	allowMethods := w.Header().Get("Access-Control-Allow-Methods")
	if allowMethods != "GET, POST, OPTIONS" {
		t.Errorf("expected Access-Control-Allow-Methods to be GET, POST, OPTIONS, got %s", allowMethods)
	}

	allowHeaders := w.Header().Get("Access-Control-Allow-Headers")
	if allowHeaders != "Content-Type, Authorization, X-Request-ID" {
		t.Errorf("expected Access-Control-Allow-Headers to be Content-Type, Authorization, X-Request-ID, got %s", allowHeaders)
	}
}

func TestDeviceHTTPCORSMiddleware_NoOriginHeader(t *testing.T) {
	os.Setenv("CORS_ALLOWED_ORIGINS", "https://example.com")
	defer os.Unsetenv("CORS_ALLOWED_ORIGINS")

	middleware := NewDeviceHTTPCORSMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest("GET", "/test", nil)
	w := httptest.NewRecorder()

	middleware.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", w.Code)
	}

	// When no Origin header, should not set Access-Control-Allow-Origin
	allowedOrigin := w.Header().Get("Access-Control-Allow-Origin")
	if allowedOrigin != "" {
		t.Errorf("expected no Access-Control-Allow-Origin when no Origin header, got %s", allowedOrigin)
	}
}
