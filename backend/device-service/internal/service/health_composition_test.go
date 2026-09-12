package service

import (
	"testing"
	"time"
)

func TestDeviceHealthCompositionHealthyRuntime(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()

	runtime.MarkStarted(time.Now())

	composition := NewDeviceHealthComposition(
		NewDeviceHealthBoundary(runtime),
	)

	report, err := composition.Aggregator.Health()

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if !report.Healthy {
		t.Fatal("expected healthy aggregate report")
	}

	if !report.Checks["runtime"] {
		t.Fatal("expected runtime provider health")
	}
}

func TestDeviceHealthCompositionStoppedRuntime(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()

	runtime.MarkStarted(time.Now())
	runtime.MarkStopped()

	composition := NewDeviceHealthComposition(
		NewDeviceHealthBoundary(runtime),
	)

	report, err := composition.Aggregator.Health()

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if report.Healthy {
		t.Fatal("expected unhealthy aggregate report")
	}

	if report.Checks["runtime"] {
		t.Fatal("expected runtime provider unhealthy")
	}
}
