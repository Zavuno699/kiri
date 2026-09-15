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
	ErrInvalidTokenFormat        = errors.New("invalid token format")
	ErrCredentialNotFound        = errors.New("credential not found")
)

type TokenAuthenticator struct {
	secret            []byte
	credentialRegistry *CredentialRegistry
}

func NewTokenAuthenticator(
	secret string,
	credentialRegistry *CredentialRegistry,
) *TokenAuthenticator {
	return &TokenAuthenticator{
		secret:            []byte(secret),
		credentialRegistry: credentialRegistry,
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

	credential, ok := a.credentialRegistry.Get(fingerprint)
	if !ok {
		return Principal{}, ErrCredentialNotFound
	}

	now := time.Now().UTC()
	if err := credential.Usable(now); err != nil {
		return Principal{}, err
	}

	return Principal{
		Subject:  credential.IdentityID,
		TenantID: "",
		Roles:    []string{},
		Permissions: []string{},
	}, nil
}
