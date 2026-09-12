package security

import (
	"net/http"
	"strings"
)

type TenantIDResolver func(*http.Request) (string, bool)

func RequireTenantMatch(
	resolve TenantIDResolver,
	next http.Handler,
) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		principal, ok := PrincipalFromContext(r.Context())
		if !ok {
			http.Error(w, "authentication required", http.StatusUnauthorized)
			return
		}

		if strings.TrimSpace(principal.TenantID) == "" {
			http.Error(w, "tenant identity required", http.StatusForbidden)
			return
		}

		requestTenant, ok := resolve(r)
		if !ok || strings.TrimSpace(requestTenant) == "" {
			http.Error(w, "tenant identity required", http.StatusBadRequest)
			return
		}

		if requestTenant != principal.TenantID {
			http.Error(w, "tenant access denied", http.StatusForbidden)
			return
		}

		next.ServeHTTP(w, r)
	})
}
