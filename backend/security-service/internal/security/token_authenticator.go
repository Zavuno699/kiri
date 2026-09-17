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

type SubjectRepository interface {
	GetBySubjectID(context.Context, string) (Subject, error)
}

type SessionRepository interface {
	GetBySessionID(context.Context, string) (Session, error)
}

type Session struct {
	ID           string
	SubjectID    string
	CredentialID string
	SessionID    string
	RevocationID string
	IssuedAt     time.Time
	ExpiresAt    time.Time
}

type Subject struct {
	ID           string
	SubjectID    string
	Email        string
	Roles        []string
	IsAdmin      bool
	IsSuperAdmin bool
}

type TokenAuthenticator struct {
	secret         []byte
	credentialRepo CredentialRepository
	revocationRepo RevocationRepository
	subjectRepo    SubjectRepository
	sessionRepo    SessionRepository
}

func NewTokenAuthenticator(
	secret string,
	credentialRepo CredentialRepository,
	revocationRepo RevocationRepository,
	subjectRepo SubjectRepository,
	sessionRepo SessionRepository,
) *TokenAuthenticator {
	return &TokenAuthenticator{
		secret:         []byte(secret),
		credentialRepo: credentialRepo,
		revocationRepo: revocationRepo,
		subjectRepo:    subjectRepo,
		sessionRepo:    sessionRepo,
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

	if a.sessionRepo != nil {
		session, err := a.sessionRepo.GetBySessionID(ctx, token)
		if err == nil {
			if now.After(session.ExpiresAt) {
				return Principal{}, ErrUnauthorized
			}
			if a.revocationRepo != nil {
				if a.revocationRepo.IsRevoked(ctx, session.RevocationID, now) {
					return Principal{}, ErrUnauthorized
				}
			}
		}
	}

	// Fail-closed: require subject resolution for authorization
	if a.subjectRepo == nil {
		return Principal{}, errors.New("subject repository required for authorization")
	}

	subject, err := a.subjectRepo.GetBySubjectID(ctx, credential.IdentityID)
	if err != nil {
		return Principal{}, errors.New("subject not found")
	}

	roles := subject.Roles
	if subject.IsSuperAdmin {
		roles = append(roles, string(RoleSuperAdmin))
	}

	return Principal{
		Subject:     credential.IdentityID,
		TenantID:    "",
		Roles:       roles,
		Permissions: []string{},
	}, nil
}
