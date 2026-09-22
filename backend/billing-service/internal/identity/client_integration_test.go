package identity

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestValidateSession_IdentityServiceContract(t *testing.T) {
	// This integration-style test verifies the exact contract with identity-service /me
	// Identity-service expects the raw session ID in the Authorization header (no Bearer prefix)

	var receivedAuthHeader string
	var receivedSessionID string

	// Fake identity-service server that mimics the real /me endpoint
	fakeIdentityService := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/me" {
			t.Errorf("expected path /me, got %s", r.URL.Path)
		}

		// Capture the Authorization header as received
		receivedAuthHeader = r.Header.Get("Authorization")
		receivedSessionID = receivedAuthHeader // identity-service uses the raw header value as session ID

		// Simulate identity-service behavior
		if receivedSessionID == "valid-session-id" {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(IdentityServiceResponse{
				SubjectID:    "test-subject-id",
				Email:        "test@example.com",
				Roles:        []string{"tenant"},
				IsAdmin:      false,
				IsSuperAdmin: false,
			})
		} else if receivedSessionID == "invalid-session-id" {
			w.WriteHeader(http.StatusUnauthorized)
		} else {
			w.WriteHeader(http.StatusInternalServerError)
		}
	}))
	defer fakeIdentityService.Close()

	client := NewClient(fakeIdentityService.URL)

	// Test 1: Valid session should succeed
	subject, err := client.ValidateSession(context.Background(), "valid-session-id")
	if err != nil {
		t.Fatalf("expected success for valid session, got error: %v", err)
	}

	if subject.SubjectID != "test-subject-id" {
		t.Errorf("expected subject ID 'test-subject-id', got '%s'", subject.SubjectID)
	}

	// Verify the Authorization header was sent as raw session ID (no Bearer prefix)
	if receivedAuthHeader != "valid-session-id" {
		t.Errorf("expected Authorization header to be raw session ID 'valid-session-id', got '%s'", receivedAuthHeader)
	}

	// Test 2: Invalid session should return error
	_, err = client.ValidateSession(context.Background(), "invalid-session-id")
	if err == nil {
		t.Fatal("expected error for invalid session")
	}

	if err.Error() != "invalid session" {
		t.Errorf("expected 'invalid session' error, got '%v'", err)
	}

	// Test 3: Empty session ID should return error
	_, err = client.ValidateSession(context.Background(), "")
	if err == nil {
		t.Fatal("expected error for empty session ID")
	}
}

func TestValidateSession_BearerPrefixWouldFail(t *testing.T) {
	// This test proves that if we re-introduce the Bearer prefix bug, the test will fail
	// This demonstrates the importance of the integration test

	var receivedAuthHeader string

	fakeIdentityService := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		receivedAuthHeader = r.Header.Get("Authorization")

		// Identity-service treats the ENTIRE Authorization header as the session ID
		// If we send "Bearer valid-session-id", it will look for that exact string
		if receivedAuthHeader == "valid-session-id" {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(IdentityServiceResponse{
				SubjectID:    "test-subject-id",
				Email:        "test@example.com",
				Roles:        []string{"tenant"},
				IsAdmin:      false,
				IsSuperAdmin: false,
			})
		} else {
			// If we send "Bearer valid-session-id", this will fail
			w.WriteHeader(http.StatusUnauthorized)
		}
	}))
	defer fakeIdentityService.Close()

	client := NewClient(fakeIdentityService.URL)

	// With the correct implementation (no Bearer prefix), this should succeed
	subject, err := client.ValidateSession(context.Background(), "valid-session-id")
	if err != nil {
		t.Fatalf("expected success without Bearer prefix, got error: %v", err)
	}

	if subject.SubjectID != "test-subject-id" {
		t.Errorf("expected subject ID 'test-subject-id', got '%s'", subject.SubjectID)
	}

	// Verify no Bearer prefix was added
	if receivedAuthHeader != "valid-session-id" {
		t.Errorf("test would fail if Bearer prefix is re-introduced: got '%s'", receivedAuthHeader)
	}
}
