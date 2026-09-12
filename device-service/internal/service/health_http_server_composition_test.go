package service

import "testing"

func TestDeviceHealthHTTPServerCompositionRouterOwnership(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()

	composition := NewDeviceHealthHTTPComposition(runtime)

	adapter := NewDeviceHealthHTTPAdapter(
		composition.Boundary,
	)

	handler := NewDeviceHealthHTTPHandler(adapter)

	router := NewDeviceHealthHTTPRouter(handler)

	serverComposition := NewDeviceHealthHTTPServerComposition(
		router,
	)

	if serverComposition.Router != router {
		t.Fatal("server composition did not preserve router ownership")
	}
}

func TestDeviceHealthHTTPServerCompositionGraphExists(t *testing.T) {
	runtime := NewDeviceRuntimeHealth()

	healthComposition := NewDeviceHealthHTTPComposition(runtime)

	adapter := NewDeviceHealthHTTPAdapter(
		healthComposition.Boundary,
	)

	handler := NewDeviceHealthHTTPHandler(adapter)

	router := NewDeviceHealthHTTPRouter(handler)

	serverComposition := NewDeviceHealthHTTPServerComposition(router)

	if serverComposition.Router.Handler != handler {
		t.Fatal("transport graph was not preserved")
	}
}
