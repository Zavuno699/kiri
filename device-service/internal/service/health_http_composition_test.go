package service

import (
	"testing"
	"time"
)

func TestDeviceHealthHTTPCompositionHealthyRuntime(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()
	runtime.MarkStarted(time.Now())

	composition := NewDeviceHealthHTTPComposition(runtime)

	response, err := composition.Boundary.Readiness()

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if response.Status != "ok" {
		t.Fatalf("expected ok response, got %s", response.Status)
	}

	if !response.Checks["runtime"] {
		t.Fatal("expected runtime health check")
	}
}

func TestDeviceHealthHTTPCompositionInactiveRuntime(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()

	composition := NewDeviceHealthHTTPComposition(runtime)

	response, err := composition.Boundary.Readiness()

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if response.Status != "failed" {
		t.Fatalf("expected failed response, got %s", response.Status)
	}
}

func TestDeviceHealthHTTPCompositionLivenessIndependent(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()

	composition := NewDeviceHealthHTTPComposition(runtime)

	response := composition.Boundary.Liveness()

	if response.Status != "ok" {
		t.Fatalf("expected liveness ok, got %s", response.Status)
	}
}
