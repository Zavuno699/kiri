package validation

import "testing"

type testRequest struct {
	Name  string `json:"name" validate:"required,min=2,max=100"`
	Email string `json:"email" validate:"required,email"`
}

func TestValidation(t *testing.T) {
	v := New()

	result := v.Struct(testRequest{
		Name:  "",
		Email: "invalid",
	})

	if result.Valid {
		t.Fatal("expected validation failure")
	}

	if len(result.Fields) != 2 {
		t.Fatalf("expected 2 field errors, got %d", len(result.Fields))
	}
}

func TestNormalizeEmail(t *testing.T) {
	value, err := NormalizeEmail(" USER@Example.COM ")

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if value != "user@example.com" {
		t.Fatalf("unexpected normalized email: %s", value)
	}
}

func TestValidationErrorAdapter(t *testing.T) {
	v := New()

	err := v.Error(testRequest{
		Name:  "",
		Email: "invalid",
	})

	if err == nil {
		t.Fatal("expected validation error")
	}

	if !Is(err) {
		t.Fatalf("expected validation.Error, got %T", err)
	}
}
