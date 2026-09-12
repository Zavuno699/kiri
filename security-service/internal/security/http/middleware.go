package httpsecurity

import (
	"net/http"

	security "github.com/kirilock/backend/security-service/internal/security"
)

func Authenticate(
	authenticator security.Authenticator,
	next http.Handler,
) http.Handler {
	return security.Middleware(authenticator)(next)
}

func RequireAuthenticated(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if _, err := security.RequirePrincipal(r.Context()); err != nil {
			http.Error(w, "authentication required", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func RequireTenant(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if _, err := security.RequireTenant(r.Context()); err != nil {
			http.Error(w, "tenant identity required", http.StatusForbidden)
			return
		}

		next.ServeHTTP(w, r)
	})
}
