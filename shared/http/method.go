package http

import "net/http"

func RequireMethod(method string, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != method {
			w.Header().Set("Allow", method)

			WriteError(
				w,
				http.StatusMethodNotAllowed,
				"METHOD_NOT_ALLOWED",
				"HTTP method is not allowed for this endpoint",
				RequestID(r.Context()),
				nil,
			)

			return
		}

		next.ServeHTTP(w, r)
	})
}
