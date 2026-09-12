package http

import (
	"context"
	"errors"

	"github.com/google/uuid"
)

type Principal struct {
	TenantID uuid.UUID
}

type principalContextKey struct{}

func WithPrincipal(ctx context.Context, principal Principal) context.Context {
	return context.WithValue(ctx, principalContextKey{}, principal)
}

func PrincipalFromContext(ctx context.Context) (Principal, error) {
	value := ctx.Value(principalContextKey{})

	principal, ok := value.(Principal)
	if !ok || principal.TenantID == uuid.Nil {
		return Principal{}, errors.New("authenticated principal is missing")
	}

	return principal, nil
}
