package service

import (
	"context"
	"testing"
)

func newTestDeviceHealthHTTPBootstrap() *DeviceHealthHTTPBootstrap {
	runtime := NewDeviceRuntimeHealth()

	composition := NewDeviceHealthHTTPComposition(runtime)

	adapter := NewDeviceHealthHTTPAdapter(
		composition.Boundary,
	)

	handler := NewDeviceHealthHTTPHandler(adapter)

	router := NewDeviceHealthHTTPRouter(handler)

	server := NewDeviceHealthHTTPServerComposition(router)

	lifecycle := NewDeviceHealthHTTPLifecycle(server)

	httpRuntime := NewDeviceHealthHTTPRuntime(lifecycle)

	return NewDeviceHealthHTTPBootstrap(httpRuntime)
}

func TestDeviceHealthHTTPBootstrapStartStop(t *testing.T) {
	bootstrap := newTestDeviceHealthHTTPBootstrap()

	if err := bootstrap.Start(context.Background()); err != nil {
		t.Fatalf("bootstrap start failed: %v", err)
	}

	if err := bootstrap.Stop(context.Background()); err != nil {
		t.Fatalf("bootstrap stop failed: %v", err)
	}
}

func TestDeviceHealthHTTPBootstrapOwnsRuntime(t *testing.T) {
	bootstrap := newTestDeviceHealthHTTPBootstrap()

	if bootstrap.Runtime == nil {
		t.Fatal("expected HTTP runtime ownership")
	}

	if bootstrap.Runtime.Lifecycle == nil {
		t.Fatal("expected lifecycle ownership")
	}
}
