package service

import (
	"testing"
	"time"
)

func TestDeviceHealthHTTPBoundaryLiveness(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()

	health := NewDeviceHealthReadiness(
		NewDeviceHealthComposition(
			NewDeviceHealthBoundary(runtime),
		).Aggregator,
	)

	httpBoundary := NewDeviceHealthHTTPBoundary(health)

	response := httpBoundary.Liveness()

	if response.Status != "ok" {
		t.Fatalf("expected ok liveness, got %s", response.Status)
	}
}

func TestDeviceHealthHTTPBoundaryReadinessHealthy(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()
	runtime.MarkStarted(time.Now())

	health := NewDeviceHealthReadiness(
		NewDeviceHealthComposition(
			NewDeviceHealthBoundary(runtime),
		).Aggregator,
	)

	httpBoundary := NewDeviceHealthHTTPBoundary(health)

	response, err := httpBoundary.Readiness()

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if response.Status != "ok" {
		t.Fatalf("expected ok readiness, got %s", response.Status)
	}

	if !response.Checks["runtime"] {
		t.Fatal("expected runtime check")
	}
}

func TestDeviceHealthHTTPBoundaryReadinessFailed(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()

	health := NewDeviceHealthReadiness(
		NewDeviceHealthComposition(
			NewDeviceHealthBoundary(runtime),
		).Aggregator,
	)

	httpBoundary := NewDeviceHealthHTTPBoundary(health)

	response, err := httpBoundary.Readiness()

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if response.Status != "failed" {
		t.Fatalf("expected failed readiness, got %s", response.Status)
	}
}
