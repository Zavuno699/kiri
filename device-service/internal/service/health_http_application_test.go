package service

import (
	"context"
	"testing"
)

func newTestDeviceHealthHTTPApplication() *DeviceHealthHTTPApplication {
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

	bootstrap := NewDeviceHealthHTTPBootstrap(httpRuntime)

	return NewDeviceHealthHTTPApplication(bootstrap)
}

func TestDeviceHealthHTTPApplicationStartStop(t *testing.T) {
	app := newTestDeviceHealthHTTPApplication()

	if err := app.Start(context.Background()); err != nil {
		t.Fatalf("application start failed: %v", err)
	}

	if err := app.Stop(context.Background()); err != nil {
		t.Fatalf("application stop failed: %v", err)
	}
}

func TestDeviceHealthHTTPApplicationOwnershipChain(t *testing.T) {
	app := newTestDeviceHealthHTTPApplication()

	if app.Bootstrap == nil {
		t.Fatal("expected bootstrap ownership")
	}

	if app.Bootstrap.Runtime == nil {
		t.Fatal("expected runtime ownership")
	}

	if app.Bootstrap.Runtime.Lifecycle == nil {
		t.Fatal("expected lifecycle ownership")
	}
}
