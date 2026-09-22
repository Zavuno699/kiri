package middleware

import (
	"context"
	"errors"
	"net/http"
)

type authenticatedSubjectKey struct{}

// AuthenticatedSubject represents the authenticated user from identity-service
type AuthenticatedSubject struct {
	SubjectID    string
	Email        string
	Roles        []string
	IsAdmin      bool
	IsSuperAdmin bool
}

// WithAuthenticatedSubject sets the authenticated subject in the request context
func WithAuthenticatedSubject(ctx context.Context, subject AuthenticatedSubject) context.Context {
	return context.WithValue(ctx, authenticatedSubjectKey{}, subject)
}

// AuthenticatedSubjectFromContext retrieves the authenticated subject from the request context
func AuthenticatedSubjectFromContext(ctx context.Context) (AuthenticatedSubject, error) {
	value := ctx.Value(authenticatedSubjectKey{})
	subject, ok := value.(AuthenticatedSubject)
	if !ok || subject.SubjectID == "" {
		return AuthenticatedSubject{}, errors.New("authenticated subject is missing")
	}
	return subject, nil
}

// IdentityClient is the interface for session validation
type IdentityClient interface {
	ValidateSession(ctx context.Context, sessionID string) (AuthenticatedSubject, error)
}

// AuthenticationMiddleware validates sessions via identity-service
type AuthenticationMiddleware struct {
	identityClient IdentityClient
}

// NewAuthenticationMiddleware creates a new authentication middleware
func NewAuthenticationMiddleware(identityClient IdentityClient) *AuthenticationMiddleware {
	return &AuthenticationMiddleware{
		identityClient: identityClient,
	}
}

// Authenticate validates the session and populates the authenticated subject context
func (m *AuthenticationMiddleware) Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Extract session ID from Authorization header
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "missing authorization header", http.StatusUnauthorized)
			return
		}

		// Accept both "Bearer <session-id>" and raw session ID
		// This matches the platform contract (raw session ID) while supporting Bearer-style callers
		var sessionID string
		if len(authHeader) >= 7 && authHeader[:7] == "Bearer " {
			sessionID = authHeader[7:]
		} else {
			sessionID = authHeader
		}

		if sessionID == "" {
			http.Error(w, "missing session ID", http.StatusUnauthorized)
			return
		}

		// Validate session with identity-service
		subject, err := m.identityClient.ValidateSession(r.Context(), sessionID)
		if err != nil {
			http.Error(w, "invalid session", http.StatusUnauthorized)
			return
		}

		// Populate authenticated subject context
		ctx := WithAuthenticatedSubject(r.Context(), subject)

		// Call next handler with authenticated context
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
