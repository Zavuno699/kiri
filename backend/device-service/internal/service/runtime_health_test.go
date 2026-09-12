package service

import (
	"testing"
	"time"
)

func TestDeviceRuntimeHealthStartsInactive(t *testing.T) {
	health := NewDeviceRuntimeHealth()

	if health.Healthy() {
		t.Fatal("expected runtime to start inactive")
	}
}

func TestDeviceRuntimeHealthMarksStarted(t *testing.T) {
	health := NewDeviceRuntimeHealth()

	now := time.Now()

	health.MarkStarted(now)

	if !health.Healthy() {
		t.Fatal("expected runtime to be healthy")
	}

	started, err := health.StartedAt()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if !started.Equal(now) {
		t.Fatal("unexpected startup timestamp")
	}
}

func TestDeviceRuntimeHealthMarksStopped(t *testing.T) {
	health := NewDeviceRuntimeHealth()

	health.MarkStarted(time.Now())
	health.MarkStopped()

	if health.Healthy() {
		t.Fatal("expected runtime to be inactive")
	}
}

func TestDeviceRuntimeHealthStartedAtRequiresRunningState(t *testing.T) {
	health := NewDeviceRuntimeHealth()

	_, err := health.StartedAt()

	if err == nil {
		t.Fatal("expected inactive runtime error")
	}
}
