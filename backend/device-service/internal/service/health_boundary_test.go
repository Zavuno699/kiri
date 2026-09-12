package service

import (
	"testing"
	"time"
)

func TestDeviceHealthBoundaryInactiveRuntime(t *testing.T) {
	health := NewDeviceRuntimeHealth()
	boundary := NewDeviceHealthBoundary(health)

	status := boundary.Status()

	if status.Healthy {
		t.Fatal("expected unhealthy status")
	}

	if !status.StartedAt.IsZero() {
		t.Fatal("expected empty startup timestamp")
	}
}

func TestDeviceHealthBoundaryActiveRuntime(t *testing.T) {
	health := NewDeviceRuntimeHealth()
	boundary := NewDeviceHealthBoundary(health)

	started := time.Now()

	health.MarkStarted(started)

	status := boundary.Status()

	if !status.Healthy {
		t.Fatal("expected healthy status")
	}

	if !status.StartedAt.Equal(started) {
		t.Fatal("unexpected startup timestamp")
	}
}

func TestDeviceHealthBoundaryAfterStop(t *testing.T) {
	health := NewDeviceRuntimeHealth()
	boundary := NewDeviceHealthBoundary(health)

	health.MarkStarted(time.Now())
	health.MarkStopped()

	status := boundary.Status()

	if status.Healthy {
		t.Fatal("expected unhealthy status after stop")
	}
}
