package validation

import (
	"testing"

	"github.com/google/uuid"
)

type contractPayload struct {
	Phone    string `json:"phone" validate:"required,e164"`
	Amount   int64  `json:"amount" validate:"required,gte=20000"`
	Currency string `json:"currency" validate:"required,oneof=UGX USD"`
	Request  string `json:"request" validate:"required,uuid4"`
}

func TestValidateReturnsValidResult(t *testing.T) {
	v := New()

	payload := contractPayload{
		Phone:    "+256700000000",
		Amount:   20000,
		Currency: "UGX",
		Request:  uuid.NewString(),
	}

	result := v.Validate(payload)

	if !result.Valid {
		t.Fatalf(
			"expected valid result, got fields: %#v",
			result.Fields,
		)
	}

	if len(result.Fields) != 0 {
		t.Fatalf(
			"expected no validation fields, got %#v",
			result.Fields,
		)
	}
}

func TestValidateReturnsFieldErrors(t *testing.T) {
	v := New()

	payload := contractPayload{
		Phone:    "0700000000",
		Amount:   100,
		Currency: "EUR",
		Request:  "not-a-uuid",
	}

	result := v.Validate(payload)

	if result.Valid {
		t.Fatal("expected invalid result")
	}

	expectedFields := []string{
		"phone",
		"amount",
		"currency",
		"request",
	}

	for _, field := range expectedFields {
		if _, ok := result.Fields[field]; !ok {
			t.Fatalf(
				"expected validation error for field %q, got %#v",
				field,
				result.Fields,
			)
		}
	}
}
