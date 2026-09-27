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

	// Vary: Origin should still be present even for disallowed origins
	vary := w.Header().Get("Vary")
	if vary != "Origin" {
		t.Errorf("expected Vary header to be Origin even for disallowed origin, got %s", vary)
	}
}

func TestDeviceHTTPCORSMiddleware_DevFallback(t *testing.T) {
	// No env var set, but KIRI_ENV=development should use localhost fallback
	os.Unsetenv("CORS_ALLOWED_ORIGINS")
	os.Setenv("KIRI_ENV", "development")
	defer func() {
		os.Unsetenv("CORS_ALLOWED_ORIGINS")
		os.Unsetenv("KIRI_ENV")
	}()

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
	// No env var set, but KIRI_ENV=development should use localhost fallback
	os.Unsetenv("CORS_ALLOWED_ORIGINS")
	os.Setenv("KIRI_ENV", "development")
	defer func() {
		os.Unsetenv("CORS_ALLOWED_ORIGINS")
		os.Unsetenv("KIRI_ENV")
	}()

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

	// Vary: Origin should still be present even without Origin header
	vary := w.Header().Get("Vary")
	if vary != "Origin" {
		t.Errorf("expected Vary header to be Origin even without Origin header, got %s", vary)
	}
}

func TestDeviceHTTPCORSMiddleware_Preflight_UnmatchedOrigin(t *testing.T) {
	os.Setenv("CORS_ALLOWED_ORIGINS", "https://example.com")
	defer os.Unsetenv("CORS_ALLOWED_ORIGINS")

	middleware := NewDeviceHTTPCORSMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest("OPTIONS", "/test", nil)
	req.Header.Set("Origin", "https://evil.com")
	w := httptest.NewRecorder()

	middleware.ServeHTTP(w, req)

	if w.Code != http.StatusNoContent {
		t.Errorf("expected 204 for OPTIONS, got %d", w.Code)
	}

	// Disallowed origin should not get Access-Control-Allow-Origin
	allowedOrigin := w.Header().Get("Access-Control-Allow-Origin")
	if allowedOrigin != "" {
		t.Errorf("expected no Access-Control-Allow-Origin for disallowed preflight, got %s", allowedOrigin)
	}

	// Vary: Origin should still be present
	vary := w.Header().Get("Vary")
	if vary != "Origin" {
		t.Errorf("expected Vary header to be Origin for preflight, got %s", vary)
	}

	// Other CORS headers should still be set
	allowMethods := w.Header().Get("Access-Control-Allow-Methods")
	if allowMethods != "GET, POST, OPTIONS" {
		t.Errorf("expected Access-Control-Allow-Methods to be GET, POST, OPTIONS, got %s", allowMethods)
	}
}

func TestDeviceHTTPCORSMiddleware_ProductionFailClosed(t *testing.T) {
	// No CORS_ALLOWED_ORIGINS and no KIRI_ENV (production)
	os.Unsetenv("CORS_ALLOWED_ORIGINS")
	os.Unsetenv("KIRI_ENV")
	defer func() {
		os.Unsetenv("CORS_ALLOWED_ORIGINS")
		os.Unsetenv("KIRI_ENV")
	}()

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

	// Production without explicit allowlist should not allow localhost
	allowedOrigin := w.Header().Get("Access-Control-Allow-Origin")
	if allowedOrigin != "" {
		t.Errorf("expected no Access-Control-Allow-Origin in production without explicit allowlist, got %s", allowedOrigin)
	}

	// Vary should still be present
	vary := w.Header().Get("Vary")
	if vary != "Origin" {
		t.Errorf("expected Vary header to be Origin, got %s", vary)
	}
}

func TestDeviceHTTPCORSMiddleware_DevFallback_WithKiriEnv(t *testing.T) {
	// No CORS_ALLOWED_ORIGINS but KIRI_ENV=development
	os.Unsetenv("CORS_ALLOWED_ORIGINS")
	os.Setenv("KIRI_ENV", "development")
	defer func() {
		os.Unsetenv("CORS_ALLOWED_ORIGINS")
		os.Unsetenv("KIRI_ENV")
	}()

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

	// Dev fallback should allow localhost
	allowedOrigin := w.Header().Get("Access-Control-Allow-Origin")
	if allowedOrigin != "http://localhost:5173" {
		t.Errorf("expected Access-Control-Allow-Origin to be http://localhost:5173 in dev, got %s", allowedOrigin)
	}

	vary := w.Header().Get("Vary")
	if vary != "Origin" {
		t.Errorf("expected Vary header to be Origin, got %s", vary)
	}
}

func TestDeviceHTTPCORSMiddleware_ProductionWithExplicitAllowlist(t *testing.T) {
	// Production (no KIRI_ENV) but with explicit allowlist
	os.Setenv("CORS_ALLOWED_ORIGINS", "https://kirilock.com")
	os.Unsetenv("KIRI_ENV")
	defer func() {
		os.Unsetenv("CORS_ALLOWED_ORIGINS")
		os.Unsetenv("KIRI_ENV")
	}()

	middleware := NewDeviceHTTPCORSMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest("GET", "/test", nil)
	req.Header.Set("Origin", "https://kirilock.com")
	w := httptest.NewRecorder()

	middleware.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", w.Code)
	}

	// Explicit allowlist should work in production
	allowedOrigin := w.Header().Get("Access-Control-Allow-Origin")
	if allowedOrigin != "https://kirilock.com" {
		t.Errorf("expected Access-Control-Allow-Origin to be https://kirilock.com, got %s", allowedOrigin)
	}

	vary := w.Header().Get("Vary")
	if vary != "Origin" {
		t.Errorf("expected Vary header to be Origin, got %s", vary)
	}
}
