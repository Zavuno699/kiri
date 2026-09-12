package security

import (
	"context"
	"net/http"
)

type Authenticator interface {
	Authenticate(context.Context, *http.Request) (Principal, error)
}

func Middleware(authenticator Authenticator) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			principal, err := authenticator.Authenticate(r.Context(), r)
			if err != nil {
				http.Error(w, "authentication required", http.StatusUnauthorized)
				return
			}

			next.ServeHTTP(
				w,
				r.WithContext(WithPrincipal(r.Context(), principal)),
			)
		})
	}
}
