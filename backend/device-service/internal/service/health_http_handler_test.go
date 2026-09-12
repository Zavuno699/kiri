package service

import (
	"testing"
	"time"
)

func TestDeviceHealthHTTPHandlerLiveness(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()

	composition := NewDeviceHealthHTTPComposition(runtime)

	adapter := NewDeviceHealthHTTPAdapter(
		composition.Boundary,
	)

	handler := NewDeviceHealthHTTPHandler(adapter)

	response := handler.Liveness()

	if response.Code != 200 {
		t.Fatalf("expected 200, got %d", response.Code)
	}

	if response.Body != "ok" {
		t.Fatalf("expected ok body, got %s", response.Body)
	}
}

func TestDeviceHealthHTTPHandlerReadinessHealthy(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()
	runtime.MarkStarted(time.Now())

	composition := NewDeviceHealthHTTPComposition(runtime)

	adapter := NewDeviceHealthHTTPAdapter(
		composition.Boundary,
	)

	handler := NewDeviceHealthHTTPHandler(adapter)

	response, err := handler.Readiness()

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if response.Code != 200 {
		t.Fatalf("expected 200, got %d", response.Code)
	}

	if response.Body != "ok" {
		t.Fatalf("expected ok body, got %s", response.Body)
	}

	if !response.Checks["runtime"] {
		t.Fatal("expected runtime check")
	}
}

func TestDeviceHealthHTTPHandlerReadinessFailed(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()

	composition := NewDeviceHealthHTTPComposition(runtime)

	adapter := NewDeviceHealthHTTPAdapter(
		composition.Boundary,
	)

	handler := NewDeviceHealthHTTPHandler(adapter)

	response, err := handler.Readiness()

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if response.Code != 503 {
		t.Fatalf("expected 503, got %d", response.Code)
	}

	if response.Body != "failed" {
		t.Fatalf("expected failed body, got %s", response.Body)
	}
}
