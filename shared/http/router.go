package http

import (
	"net/http"
)

func NewRouter(
	service string,
	readiness ReadinessChecker,
) http.Handler {
	mux := http.NewServeMux()

	mux.Handle(
		"GET /api/v1/health",
		HealthHandler(service),
	)

	mux.Handle(
		"GET /api/v1/ready",
		ReadinessHandler(service, readiness),
	)

	// Explicit API version root.
	mux.HandleFunc(
		"GET /api/v1",
		func(w http.ResponseWriter, r *http.Request) {
			WriteJSON(w, http.StatusOK, map[string]any{
				"service": service,
				"version": "v1",
			})
		},
	)

	handler := http.Handler(mux)

	handler = Recover(handler)
	handler = SecurityHeaders(handler)
	handler = RequestMetadata(handler)
	handler = RequireJSON(handler)

	return handler
}
