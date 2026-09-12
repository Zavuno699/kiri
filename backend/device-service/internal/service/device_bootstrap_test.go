package service

import "testing"

func TestDeviceBootstrapRequiresLifecycle(t *testing.T) {
	_, err := NewDeviceBootstrap(nil)

	if err == nil {
		t.Fatal("expected lifecycle validation error")
	}
}

func TestDeviceBootstrapReturnsInjectedLifecycle(t *testing.T) {
	lifecycle := &DeviceOutboxLifecycle{}

	bootstrap, err := NewDeviceBootstrap(lifecycle)

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if bootstrap.Lifecycle() != lifecycle {
		t.Fatal("bootstrap did not preserve injected lifecycle")
	}
}
