package service

import (
	"context"
	"testing"
)

func newTestDeviceHealthHTTPLifecycle() *DeviceHealthHTTPLifecycle {
	runtime := NewDeviceRuntimeHealth()

	composition := NewDeviceHealthHTTPComposition(runtime)

	adapter := NewDeviceHealthHTTPAdapter(
		composition.Boundary,
	)

	handler := NewDeviceHealthHTTPHandler(adapter)

	router := NewDeviceHealthHTTPRouter(handler)

	server := NewDeviceHealthHTTPServerComposition(router)

	return NewDeviceHealthHTTPLifecycle(server)
}

func TestDeviceHealthHTTPLifecycleStartStop(t *testing.T) {
	lifecycle := newTestDeviceHealthHTTPLifecycle()

	if err := lifecycle.Start(context.Background()); err != nil {
		t.Fatalf("start failed: %v", err)
	}

	if err := lifecycle.Stop(context.Background()); err != nil {
		t.Fatalf("stop failed: %v", err)
	}
}

func TestDeviceHealthHTTPLifecycleRejectsDuplicateStart(t *testing.T) {
	lifecycle := newTestDeviceHealthHTTPLifecycle()

	if err := lifecycle.Start(context.Background()); err != nil {
		t.Fatalf("initial start failed: %v", err)
	}

	if err := lifecycle.Start(context.Background()); err == nil {
		t.Fatal("expected duplicate start rejection")
	}
}

func TestDeviceHealthHTTPLifecycleRejectsInvalidStop(t *testing.T) {
	lifecycle := newTestDeviceHealthHTTPLifecycle()

	if err := lifecycle.Stop(context.Background()); err == nil {
		t.Fatal("expected invalid stop rejection")
	}
}
