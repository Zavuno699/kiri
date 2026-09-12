package http

import (
	"context"
	"net/http"

	"github.com/google/uuid"
)

const (
	HeaderRequestID     = "X-Request-ID"
	HeaderCorrelationID = "X-Correlation-ID"
)

func RequestMetadata(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestID := sanitizeIDHeader(r.Header.Get(HeaderRequestID))
		correlationID := sanitizeIDHeader(r.Header.Get(HeaderCorrelationID))

		if requestID == "" {
			requestID = uuid.NewString()
		}

		if correlationID == "" {
			correlationID = requestID
		}

		ctx := context.WithValue(
			r.Context(),
			requestIDKey,
			requestID,
		)

		ctx = context.WithValue(
			ctx,
			correlationIDKey,
			correlationID,
		)

		w.Header().Set(HeaderRequestID, requestID)
		w.Header().Set(HeaderCorrelationID, correlationID)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func sanitizeIDHeader(value string) string {
	if len(value) > 128 {
		return ""
	}

	for _, r := range value {
		switch {
		case r >= 'a' && r <= 'z':
		case r >= 'A' && r <= 'Z':
		case r >= '0' && r <= '9':
		case r == '-', r == '_', r == '.', r == ':':
		default:
			return ""
		}
	}

	return value
}
