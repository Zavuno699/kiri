package http

import (
	"net/http"
	"strings"
)

func RequireJSON(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		contentType := r.Header.Get("Content-Type")

		if r.Method == http.MethodGet ||
			r.Method == http.MethodHead ||
			r.Method == http.MethodOptions {
			next.ServeHTTP(w, r)
			return
		}

		mediaType := strings.TrimSpace(
			strings.Split(contentType, ";")[0],
		)

		if mediaType != "application/json" {
			WriteError(
				w,
				http.StatusUnsupportedMediaType,
				"UNSUPPORTED_MEDIA_TYPE",
				"Content-Type must be application/json",
				RequestID(r.Context()),
				nil,
			)

			return
		}

		next.ServeHTTP(w, r)
	})
}
