package types

import "testing"

func TestNewID(t *testing.T) {
	id := NewID()

	if id.Empty() {
		t.Fatal("expected generated ID")
	}

	parsed, err := ParseID(id.String())

	if err != nil {
		t.Fatalf("expected generated ID to parse: %v", err)
	}

	if parsed != id {
		t.Fatalf("expected parsed ID %q, got %q", id, parsed)
	}
}

func TestParseIDRejectsInvalidValue(t *testing.T) {
	if _, err := ParseID("not-an-id"); err == nil {
		t.Fatal("expected invalid ID to be rejected")
	}
}
