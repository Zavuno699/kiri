package service

import (
	"context"
	"testing"
)

func TestDeviceHealthHTTPCompositionBuildsCompleteGraph(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()

	composition := NewDeviceHealthHTTPComposition(
		runtime,
	)

	if composition == nil {
		t.Fatal("composition is nil")
	}

	if composition.Boundary == nil {
		t.Fatal("http boundary is nil")
	}

	if composition.Application == nil {
		t.Fatal("application is nil")
	}
}

func TestDeviceHealthHTTPCompositionPreservesHealthReadiness(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()

	composition := NewDeviceHealthHTTPComposition(
		runtime,
	)

	response, err := composition.Boundary.Readiness()

	if err != nil {
		t.Fatal(err)
	}

	if response.Status != "failed" {
		t.Fatalf("expected failed readiness status, got %s", response.Status)
	}
}

func TestDeviceHealthHTTPCompositionLifecycleDelegation(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()

	composition := NewDeviceHealthHTTPComposition(
		runtime,
	)

	ctx := context.Background()

	if err := composition.Start(ctx); err != nil {
		t.Fatal(err)
	}

	if err := composition.Stop(ctx); err != nil {
		t.Fatal(err)
	}
}
