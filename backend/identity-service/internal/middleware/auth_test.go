package middleware

import (
	"context"
	"errors"
	"net/http"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/kirilock/backend/identity-service/internal/repository"
	"github.com/stretchr/testify/assert"
)

func TestAuthMiddleware(t *testing.T) {
	t.Run("missing authorization header returns 401", func(t *testing.T) {
		middleware := NewLocalSessionAuthMiddleware(nil, nil, nil)
		nextCalled := false
		next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			nextCalled = true
		})

		handler := middleware.Authenticate(next)
		req := &http.Request{}
		w := &mockResponseWriter{}

		handler.ServeHTTP(w, req)

		assert.False(t, nextCalled)
		assert.Equal(t, http.StatusUnauthorized, w.status)
	})

	t.Run("revoked session is rejected", func(t *testing.T) {
		// Setup mock session repository that returns error for revoked sessions
		mockSessionRepo := &mockSessionRepository{
			sessions: map[string]repository.Session{
				"revoked-session-id": {
					SessionID: "revoked-session-id",
					SubjectID: uuid.New().String(),
					ExpiresAt: time.Now().UTC().Add(time.Hour),
				},
			},
			revoked: map[string]bool{
				"revoked-session-id": true,
			},
		}

		middleware := NewLocalSessionAuthMiddleware(mockSessionRepo, nil, nil)
		nextCalled := false
		next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			nextCalled = true
		})

		handler := middleware.Authenticate(next)
		req := &http.Request{
			Header: http.Header{"Authorization": []string{"revoked-session-id"}},
		}
		w := &mockResponseWriter{}

		handler.ServeHTTP(w, req)

		assert.False(t, nextCalled)
		assert.Equal(t, http.StatusUnauthorized, w.status)
	})

	t.Run("expired session is rejected", func(t *testing.T) {
		// Setup mock session repository with expired session
		mockSessionRepo := &mockSessionRepository{
			sessions: map[string]repository.Session{
				"expired-session-id": {
					SessionID: "expired-session-id",
					SubjectID: uuid.New().String(),
					ExpiresAt: time.Now().UTC().Add(-time.Hour), // Expired 1 hour ago
				},
			},
		}

		middleware := NewLocalSessionAuthMiddleware(mockSessionRepo, nil, nil)
		nextCalled := false
		next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			nextCalled = true
		})

		handler := middleware.Authenticate(next)
		req := &http.Request{
			Header: http.Header{"Authorization": []string{"expired-session-id"}},
		}
		w := &mockResponseWriter{}

		handler.ServeHTTP(w, req)

		assert.False(t, nextCalled)
		assert.Equal(t, http.StatusUnauthorized, w.status)
	})
}

// Mock session repository for testing
type mockSessionRepository struct {
	sessions map[string]repository.Session
	revoked  map[string]bool
}

func (m *mockSessionRepository) Create(ctx context.Context, session repository.Session) error {
	m.sessions[session.SessionID] = session
	return nil
}

func (m *mockSessionRepository) GetBySessionID(ctx context.Context, sessionID string) (repository.Session, error) {
	if m.revoked[sessionID] {
		return repository.Session{}, errors.New("session not found or revoked")
	}
	session, exists := m.sessions[sessionID]
	if !exists {
		return repository.Session{}, errors.New("session not found or revoked")
	}
	return session, nil
}

func (m *mockSessionRepository) GetByRevocationID(ctx context.Context, revocationID string) (repository.Session, error) {
	return repository.Session{}, errors.New("session not found")
}

func (m *mockSessionRepository) Revoke(ctx context.Context, sessionID string, revokedAt time.Time) error {
	m.revoked[sessionID] = true
	return nil
}

func (m *mockSessionRepository) RevokeBySubjectID(ctx context.Context, subjectID string, revokedAt time.Time) error {
	for sessionID := range m.sessions {
		if m.sessions[sessionID].SubjectID == subjectID {
			m.revoked[sessionID] = true
		}
	}
	return nil
}

type mockResponseWriter struct {
	status int
	body   []byte
}

func (w *mockResponseWriter) Header() http.Header {
	return http.Header{}
}

func (w *mockResponseWriter) Write(b []byte) (int, error) {
	w.body = b
	return len(b), nil
}

func (w *mockResponseWriter) WriteHeader(statusCode int) {
	w.status = statusCode
}
