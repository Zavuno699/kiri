package security

import (
	"context"
	"errors"
	"strings"
)

type Principal struct {
	Subject     string
	TenantID    string
	Roles       []string
	Permissions []string
}

type principalContextKey struct{}

func WithPrincipal(ctx context.Context, principal Principal) context.Context {
	return context.WithValue(ctx, principalContextKey{}, principal)
}

func PrincipalFromContext(ctx context.Context) (Principal, bool) {
	principal, ok := ctx.Value(principalContextKey{}).(Principal)
	return principal, ok
}

func RequirePrincipal(ctx context.Context) (Principal, error) {
	principal, ok := PrincipalFromContext(ctx)
	if !ok {
		return Principal{}, errors.New("authenticated principal is required")
	}

	if strings.TrimSpace(principal.Subject) == "" {
		return Principal{}, errors.New("principal subject is required")
	}

	return principal, nil
}

func RequireTenant(ctx context.Context) (Principal, error) {
	principal, err := RequirePrincipal(ctx)
	if err != nil {
		return Principal{}, err
	}

	if strings.TrimSpace(principal.TenantID) == "" {
		return Principal{}, errors.New("tenant identity is required")
	}

	return principal, nil
}
