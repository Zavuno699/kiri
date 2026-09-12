package service

import "testing"

func TestDeviceHealthHTTPRouterRoutes(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()

	composition := NewDeviceHealthHTTPComposition(runtime)

	adapter := NewDeviceHealthHTTPAdapter(
		composition.Boundary,
	)

	handler := NewDeviceHealthHTTPHandler(adapter)

	router := NewDeviceHealthHTTPRouter(handler)

	if len(router.Routes) != 2 {
		t.Fatalf("expected 2 routes, got %d", len(router.Routes))
	}

	if router.Routes[0].Method != "GET" {
		t.Fatalf("expected GET method")
	}

	if router.Routes[0].Path != "/health/live" {
		t.Fatalf("unexpected liveness path: %s", router.Routes[0].Path)
	}

	if router.Routes[1].Path != "/health/ready" {
		t.Fatalf("unexpected readiness path: %s", router.Routes[1].Path)
	}
}

func TestDeviceHealthHTTPRouterOwnsHandlerReference(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()

	composition := NewDeviceHealthHTTPComposition(runtime)

	adapter := NewDeviceHealthHTTPAdapter(
		composition.Boundary,
	)

	handler := NewDeviceHealthHTTPHandler(adapter)

	router := NewDeviceHealthHTTPRouter(handler)

	if router.Handler != handler {
		t.Fatal("router did not preserve handler ownership")
	}
}
