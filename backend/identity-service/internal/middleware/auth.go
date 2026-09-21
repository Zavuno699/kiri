package middleware

import (
	"context"
	"net/http"

	"github.com/google/uuid"
	"github.com/kirilock/backend/identity-service/internal/client"
	"github.com/kirilock/backend/identity-service/internal/repository"
)

// CORSMiddleware adds CORS headers for development
func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Allow all origins for development
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

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
	useLocalSession bool
}

func NewAuthMiddleware(authClient *client.AuthClient) *AuthMiddleware {
	return &AuthMiddleware{
		authClient:      authClient,
		useLocalSession: false,
	}
}

func NewLocalSessionAuthMiddleware(sessionRepo repository.SessionRepository, subjectRepo repository.SubjectRepository) *AuthMiddleware {
	return &AuthMiddleware{
		sessionRepo:     sessionRepo,
		subjectRepo:     subjectRepo,
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

	// Validate session (checks expiry and revocation via repository query)
	session, err := m.sessionRepo.GetBySessionID(ctx, sessionID)
	if err != nil {
		return client.Principal{}, err
	}

	// Get subject from session using the subject's UUID ID
	subject, err := m.subjectRepo.GetByID(ctx, uuid.MustParse(session.SubjectID))
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
