package flutterwave

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync/atomic"
	"testing"
	"time"
)

func TestNewClientValidation(t *testing.T) {
	tests := []struct {
		name string
		cfg  Config
	}{
		{
			name: "missing base URL",
			cfg: Config{
				ClientID:     "id",
				ClientSecret: "secret",
			},
		},
		{
			name: "missing client ID",
			cfg: Config{
				BaseURL:      "http://localhost",
				ClientSecret: "secret",
			},
		},
		{
			name: "missing client secret",
			cfg: Config{
				BaseURL:  "http://localhost",
				ClientID: "id",
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if _, err := NewClient(tt.cfg); err == nil {
				t.Fatal("expected configuration error")
			}
		})
	}
}

func TestAccessTokenCaching(t *testing.T) {
	var calls atomic.Int32

	tokenServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		calls.Add(1)

		if r.Method != http.MethodPost {
			t.Fatalf("unexpected method: %s", r.Method)
		}

		if got := r.Header.Get("Content-Type"); got != "application/x-www-form-urlencoded" {
			t.Fatalf("unexpected content type: %s", got)
		}

		_ = r.ParseForm()

		if r.Form.Get("client_id") != "client-id" {
			t.Fatalf("unexpected client id")
		}

		if r.Form.Get("client_secret") != "client-secret" {
			t.Fatalf("unexpected client secret")
		}

		if r.Form.Get("grant_type") != "client_credentials" {
			t.Fatalf("unexpected grant type")
		}

		_ = json.NewEncoder(w).Encode(tokenResponse{
			AccessToken: "test-token",
			ExpiresIn:   600,
			TokenType:   "Bearer",
		})
	}))
	defer tokenServer.Close()

	client, err := NewClient(Config{
		BaseURL:      "http://example.test",
		ClientID:     "client-id",
		ClientSecret: "client-secret",
		Timeout:      5 * time.Second,
	})
	if err != nil {
		t.Fatal(err)
	}

	client.httpClient = tokenServer.Client()

	// Temporarily point the token URL indirectly by replacing the request
	// path through a custom transport.
	client.httpClient.Transport = rewriteTokenTransport{
		base: tokenServer.Client().Transport,
		url:  tokenServer.URL,
	}

	ctx := context.Background()

	token1, err := client.accessToken(ctx)
	if err != nil {
		t.Fatal(err)
	}

	token2, err := client.accessToken(ctx)
	if err != nil {
		t.Fatal(err)
	}

	if token1 != "test-token" || token2 != "test-token" {
		t.Fatalf("unexpected tokens: %q %q", token1, token2)
	}

	if got := calls.Load(); got != 1 {
		t.Fatalf("expected exactly one token request, got %d", got)
	}
}

type rewriteTokenTransport struct {
	base http.RoundTripper
	url  string
}

func (t rewriteTokenTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	clone := req.Clone(req.Context())

	if strings.Contains(clone.URL.Host, "idp.flutterwave.com") {
		target := req.URL
		target.Scheme = "http"
		parsed, err := http.NewRequest(
			req.Method,
			t.url,
			req.Body,
		)
		if err != nil {
			return nil, err
		}
		clone.URL = parsed.URL
	}

	return t.base.RoundTrip(clone)
}

func TestDoJSONPropagatesHeaders(t *testing.T) {
	var gotIdempotency string
	var gotTrace string
	var gotAuthorization string

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		gotIdempotency = r.Header.Get("X-Idempotency-Key")
		gotTrace = r.Header.Get("X-Trace-Id")
		gotAuthorization = r.Header.Get("Authorization")

		w.Header().Set("Content-Type", "application/json")

		_ = json.NewEncoder(w).Encode(apiEnvelope{
			Status:  "success",
			Message: "ok",
			Data:    json.RawMessage(`{"id":"test"}`),
		})
	}))
	defer server.Close()

	client, err := NewClient(Config{
		BaseURL:      server.URL,
		ClientID:     "client-id",
		ClientSecret: "client-secret",
	})
	if err != nil {
		t.Fatal(err)
	}

	client.cachedAccessToken = "cached-token"
	client.tokenExpiry = time.Now().Add(time.Hour)

	_, status, err := client.doJSON(
		context.Background(),
		http.MethodPost,
		"/test",
		map[string]any{"hello": "world"},
		"idem-123456789",
		"trace-123456789",
	)
	if err != nil {
		t.Fatal(err)
	}

	if status != http.StatusOK {
		t.Fatalf("unexpected status: %d", status)
	}

	if gotIdempotency != "idem-123456789" {
		t.Fatalf("unexpected idempotency key: %s", gotIdempotency)
	}

	if gotTrace != "trace-123456789" {
		t.Fatalf("unexpected trace ID: %s", gotTrace)
	}

	if gotAuthorization != "Bearer cached-token" {
		t.Fatalf("unexpected authorization: %s", gotAuthorization)
	}
}

func TestDoJSONRejectsMalformedSuccess(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"message":"missing status"}`))
	}))
	defer server.Close()

	client, err := NewClient(Config{
		BaseURL:      server.URL,
		ClientID:     "id",
		ClientSecret: "secret",
	})
	if err != nil {
		t.Fatal(err)
	}

	client.cachedAccessToken = "token"
	client.tokenExpiry = time.Now().Add(time.Hour)

	_, _, err = client.doJSON(
		context.Background(),
		http.MethodPost,
		"/test",
		map[string]string{},
		"idem-123456789",
		"trace-123456789",
	)
	if err == nil {
		t.Fatal("expected malformed response error")
	}
}

func TestDoJSONRejectsProviderError(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusBadRequest)

		_ = json.NewEncoder(w).Encode(apiEnvelope{
			Status:  "failed",
			Message: "invalid request",
		})
	}))
	defer server.Close()

	client, err := NewClient(Config{
		BaseURL:      server.URL,
		ClientID:     "id",
		ClientSecret: "secret",
	})
	if err != nil {
		t.Fatal(err)
	}

	client.cachedAccessToken = "token"
	client.tokenExpiry = time.Now().Add(time.Hour)

	_, status, err := client.doJSON(
		context.Background(),
		http.MethodPost,
		"/test",
		map[string]string{},
		"idem-123456789",
		"trace-123456789",
	)
	if err == nil {
		t.Fatal("expected provider error")
	}

	if status != http.StatusBadRequest {
		t.Fatalf("unexpected status: %d", status)
	}
}
