package middleware

import (
	"context"
	"net/http"

	"github.com/kirilock/backend/identity-service/internal/client"
)

type principalContextKey struct{}

func WithPrincipal(ctx context.Context, principal client.Principal) context.Context {
	return context.WithValue(ctx, principalContextKey{}, principal)
}

func PrincipalFromContext(ctx context.Context) (client.Principal, error) {
	principal, ok := ctx.Value(principalContextKey{}).(client.Principal)
	if !ok {
		return client.Principal{}, http.ErrNotSupported
	}
	return principal, nil
}

type AuthMiddleware struct {
	authClient *client.AuthClient
}

func NewAuthMiddleware(authClient *client.AuthClient) *AuthMiddleware {
	return &AuthMiddleware{
		authClient: authClient,
	}
}

func (m *AuthMiddleware) Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "authentication required", http.StatusUnauthorized)
			return
		}

		principal, err := m.authClient.Authenticate(r.Context(), authHeader)
		if err != nil {
			http.Error(w, "authentication failed", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r.WithContext(WithPrincipal(r.Context(), principal)))
	})
}
