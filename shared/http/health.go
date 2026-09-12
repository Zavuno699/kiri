package http

import (
	"net/http"
	"time"
)

type HealthResponse struct {
	Status    string    `json:"status"`
	Service   string    `json:"service"`
	Timestamp time.Time `json:"timestamp"`
}

type ReadinessChecker interface {
	Ready() bool
}

type StaticReadiness struct {
	ready bool
}

func NewStaticReadiness(ready bool) *StaticReadiness {
	return &StaticReadiness{
		ready: ready,
	}
}

func (r *StaticReadiness) Ready() bool {
	return r.ready
}

func HealthHandler(service string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		WriteJSON(w, http.StatusOK, HealthResponse{
			Status:    "ok",
			Service:   service,
			Timestamp: time.Now().UTC(),
		})
	})
}

func ReadinessHandler(
	service string,
	checker ReadinessChecker,
) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !checker.Ready() {
			WriteJSON(w, http.StatusServiceUnavailable, HealthResponse{
				Status:    "not_ready",
				Service:   service,
				Timestamp: time.Now().UTC(),
			})

			return
		}

		WriteJSON(w, http.StatusOK, HealthResponse{
			Status:    "ready",
			Service:   service,
			Timestamp: time.Now().UTC(),
		})
	})
}
