package service

import (
	"context"
	"testing"
)

func newTestDeviceHealthHTTPRuntime() *DeviceHealthHTTPRuntime {
	runtime := NewDeviceRuntimeHealth()

	composition := NewDeviceHealthHTTPComposition(runtime)

	adapter := NewDeviceHealthHTTPAdapter(
		composition.Boundary,
	)

	handler := NewDeviceHealthHTTPHandler(adapter)

	router := NewDeviceHealthHTTPRouter(handler)

	server := NewDeviceHealthHTTPServerComposition(router)

	lifecycle := NewDeviceHealthHTTPLifecycle(server)

	return NewDeviceHealthHTTPRuntime(lifecycle)
}

func TestDeviceHealthHTTPRuntimeStartStop(t *testing.T) {
	runtime := newTestDeviceHealthHTTPRuntime()

	if err := runtime.Start(context.Background()); err != nil {
		t.Fatalf("runtime start failed: %v", err)
	}

	if err := runtime.Stop(context.Background()); err != nil {
		t.Fatalf("runtime stop failed: %v", err)
	}
}

func TestDeviceHealthHTTPRuntimeDelegatesLifecycleOwnership(t *testing.T) {
	runtime := newTestDeviceHealthHTTPRuntime()

	if runtime.Lifecycle == nil {
		t.Fatal("expected lifecycle ownership")
	}

	if err := runtime.Stop(context.Background()); err == nil {
		t.Fatal("expected lifecycle validation through runtime boundary")
	}
}
