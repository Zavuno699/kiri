package security

import (
	"context"
	"errors"
	"net/http"
	"strings"
	"time"
)

var (
	ErrMissingAuthorizationHeader = errors.New("missing authorization header")
	ErrInvalidTokenFormat         = errors.New("invalid token format")
	ErrCredentialNotFound         = errors.New("credential not found")
)

type CredentialRepository interface {
	Get(context.Context, string) (Credential, bool)
}

type RevocationRepository interface {
	IsRevoked(context.Context, string, time.Time) bool
}

type TokenAuthenticator struct {
	secret         []byte
	credentialRepo CredentialRepository
	revocationRepo RevocationRepository
}

func NewTokenAuthenticator(
	secret string,
	credentialRepo CredentialRepository,
	revocationRepo RevocationRepository,
) *TokenAuthenticator {
	return &TokenAuthenticator{
		secret:         []byte(secret),
		credentialRepo: credentialRepo,
		revocationRepo: revocationRepo,
	}
}

func (a *TokenAuthenticator) Authenticate(
	ctx context.Context,
	r *http.Request,
) (Principal, error) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		return Principal{}, ErrMissingAuthorizationHeader
	}

	authHeader = strings.TrimSpace(authHeader)

	token := authHeader
	if strings.HasPrefix(authHeader, "Bearer ") {
		token = strings.TrimPrefix(authHeader, "Bearer ")
		token = strings.TrimSpace(token)
	}

	if token == "" {
		return Principal{}, ErrInvalidTokenFormat
	}

	fingerprint := TokenFingerprint(a.secret, []byte(token))

	credential, ok := a.credentialRepo.Get(ctx, fingerprint)
	if !ok {
		return Principal{}, ErrCredentialNotFound
	}

	now := time.Now().UTC()
	if err := credential.Usable(now); err != nil {
		return Principal{}, err
	}

	if a.revocationRepo != nil {
		if a.revocationRepo.IsRevoked(ctx, credential.IdentityID, now) {
			return Principal{}, ErrUnauthorized
		}
	}

	return Principal{
		Subject:     credential.IdentityID,
		TenantID:    "",
		Roles:       []string{},
		Permissions: []string{},
	}, nil
}
