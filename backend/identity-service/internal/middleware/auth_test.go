package middleware

import (
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestAuthMiddleware(t *testing.T) {
	t.Run("missing authorization header returns 401", func(t *testing.T) {
		middleware := NewLocalSessionAuthMiddleware(nil, nil)
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
