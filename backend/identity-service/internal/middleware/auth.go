package middleware

import (
	"context"
	"errors"
	"net/http"
	"time"

	"github.com/kirilock/backend/identity-service/internal/client"
	"github.com/kirilock/backend/identity-service/internal/repository"
	"github.com/kirilock/backend/identity-service/internal/service"
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
	authClient      *client.AuthClient
	sessionRepo     repository.SessionRepository
	subjectRepo     repository.SubjectRepository
	sessionService  *service.SessionService
	useLocalSession bool
}

func NewAuthMiddleware(authClient *client.AuthClient) *AuthMiddleware {
	return &AuthMiddleware{
		authClient:      authClient,
		useLocalSession: false,
	}
}

func NewLocalSessionAuthMiddleware(sessionRepo repository.SessionRepository, subjectRepo repository.SubjectRepository, sessionService *service.SessionService) *AuthMiddleware {
	return &AuthMiddleware{
		sessionRepo:     sessionRepo,
		subjectRepo:     subjectRepo,
		sessionService:  sessionService,
		useLocalSession: true,
	}
}

func (m *AuthMiddleware) Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "authentication required", http.StatusUnauthorized)
			return
		}

		var principal client.Principal
		var err error

		if m.useLocalSession {
			// Validate session locally using session_id
			principal, err = m.authenticateSession(r.Context(), authHeader)
		} else {
			// Use security-service token validation
			principal, err = m.authClient.Authenticate(r.Context(), authHeader)
		}

		if err != nil {
			http.Error(w, "authentication failed", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r.WithContext(WithPrincipal(r.Context(), principal)))
	})
}

func (m *AuthMiddleware) authenticateSession(ctx context.Context, sessionID string) (client.Principal, error) {
	if m.sessionRepo == nil || m.subjectRepo == nil {
		return client.Principal{}, http.ErrNotSupported
	}

	// Validate session (checks revocation via repository query)
	session, err := m.sessionRepo.GetBySessionID(ctx, sessionID)
	if err != nil {
		return client.Principal{}, err
	}

	// Check session expiry
	now := time.Now().UTC()
	if now.After(session.ExpiresAt) {
		return client.Principal{}, errors.New("session expired")
	}

	// Get subject from session
	subject, err := m.subjectRepo.GetBySubjectID(ctx, session.SubjectID)
	if err != nil {
		return client.Principal{}, err
	}

	return client.Principal{
		Subject:     subject.SubjectID,
		TenantID:    "",
		Roles:       subject.Roles,
		Permissions: []string{},
	}, nil
}
