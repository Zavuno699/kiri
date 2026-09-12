package service

import (
	"testing"
	"time"
)

func TestDeviceHealthHTTPAdapterLivenessOK(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()

	composition := NewDeviceHealthHTTPComposition(runtime)

	adapter := NewDeviceHealthHTTPAdapter(
		composition.Boundary,
	)

	response := adapter.Liveness()

	if response.Code != 200 {
		t.Fatalf("expected 200, got %d", response.Code)
	}

	if response.Status != "ok" {
		t.Fatalf("expected ok, got %s", response.Status)
	}
}

func TestDeviceHealthHTTPAdapterReadinessOK(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()
	runtime.MarkStarted(time.Now())

	composition := NewDeviceHealthHTTPComposition(runtime)

	adapter := NewDeviceHealthHTTPAdapter(
		composition.Boundary,
	)

	response, err := adapter.Readiness()

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if response.Code != 200 {
		t.Fatalf("expected 200, got %d", response.Code)
	}

	if !response.Checks["runtime"] {
		t.Fatal("expected runtime check")
	}
}

func TestDeviceHealthHTTPAdapterReadinessFailed(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()

	composition := NewDeviceHealthHTTPComposition(runtime)

	adapter := NewDeviceHealthHTTPAdapter(
		composition.Boundary,
	)

	response, err := adapter.Readiness()

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if response.Code != 503 {
		t.Fatalf("expected 503, got %d", response.Code)
	}

	if response.Status != "failed" {
		t.Fatalf("expected failed, got %s", response.Status)
	}
}
