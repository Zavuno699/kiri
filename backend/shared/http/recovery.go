package http

import (
	"log"
	"net/http"
)

func Recover(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if recovered := recover(); recovered != nil {
				log.Printf(
					"panic recovered request_id=%s value=%v",
					RequestID(r.Context()),
					recovered,
				)

				WriteError(
					w,
					http.StatusInternalServerError,
					"INTERNAL_ERROR",
					"An internal server error occurred",
					RequestID(r.Context()),
					nil,
				)
			}
		}()

		next.ServeHTTP(w, r)
	})
}
