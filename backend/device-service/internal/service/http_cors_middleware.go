package service

import (
	"net/http"
	"os"
	"strings"
)

type DeviceHTTPCORSMiddleware struct {
	Next http.Handler
}

func NewDeviceHTTPCORSMiddleware(
	next http.Handler,
) *DeviceHTTPCORSMiddleware {
	return &DeviceHTTPCORSMiddleware{
		Next: next,
	}
}

func (m *DeviceHTTPCORSMiddleware) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	// Read allowed origins from environment, fallback to localhost dev origins
	allowedOrigins := os.Getenv("CORS_ALLOWED_ORIGINS")
	if allowedOrigins == "" {
		// Safe dev fallback: only allow localhost frontend
		allowedOrigins = "http://localhost:5173,http://localhost:3000"
	}

	origin := request.Header.Get("Origin")
	if origin != "" {
		// Split on commas, trim spaces, and check for exact match
		allowedOriginsList := strings.Split(allowedOrigins, ",")
		allowed := false
		for _, allowedOrigin := range allowedOriginsList {
			allowedOrigin = strings.TrimSpace(allowedOrigin)
			if allowedOrigin == origin {
				allowed = true
				break
			}
		}
		if allowed {
			writer.Header().Set("Access-Control-Allow-Origin", origin)
			writer.Header().Set("Vary", "Origin")
		}
	}

	writer.Header().Set(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization, X-Request-ID",
	)

	writer.Header().Set(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS",
	)

	if request.Method == http.MethodOptions {
		writer.WriteHeader(http.StatusNoContent)
		return
	}

	m.Next.ServeHTTP(
		writer,
		request,
	)
}
