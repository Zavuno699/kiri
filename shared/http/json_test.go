package http

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

type testPayload struct {
	Name string `json:"name"`
}

func TestDecodeJSONRejectsUnknownFields(t *testing.T) {
	req := httptest.NewRequest(
		http.MethodPost,
		"/test",
		strings.NewReader(`{"name":"kirilock","unknown":"field"}`),
	)

	rec := httptest.NewRecorder()

	var payload testPayload

	if err := DecodeJSON(rec, req, &payload); err == nil {
		t.Fatal("expected unknown field to be rejected")
	}
}

func TestDecodeJSONRejectsMultipleValues(t *testing.T) {
	req := httptest.NewRequest(
		http.MethodPost,
		"/test",
		strings.NewReader(`{"name":"one"}{"name":"two"}`),
	)

	rec := httptest.NewRecorder()

	var payload testPayload

	if err := DecodeJSON(rec, req, &payload); err == nil {
		t.Fatal("expected multiple JSON values to be rejected")
	}
}

func TestDecodeJSONAcceptsValidObject(t *testing.T) {
	req := httptest.NewRequest(
		http.MethodPost,
		"/test",
		strings.NewReader(`{"name":"kirilock"}`),
	)

	rec := httptest.NewRecorder()

	var payload testPayload

	if err := DecodeJSON(rec, req, &payload); err != nil {
		t.Fatalf("expected valid JSON, got %v", err)
	}

	if payload.Name != "kirilock" {
		t.Fatalf("unexpected name: %q", payload.Name)
	}
}
