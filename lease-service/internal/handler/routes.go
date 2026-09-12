package handler

import (
	"net/http"

	"github.com/kirilock/backend/lease-service/internal/service"
)

func RegisterRoutes(
	mux *http.ServeMux,
	_ *service.LeaseService,
) {
	mux.HandleFunc("GET /api/v1/leases/health", func(
		w http.ResponseWriter,
		_ *http.Request,
	) {
		w.WriteHeader(http.StatusNoContent)
	})
}
