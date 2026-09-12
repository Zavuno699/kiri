#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> Repairing KiriLock contract foundation"

###############################################################################
# 1. Remove the duplicate HTTP error implementation introduced by the
#    previous contract script.
###############################################################################

if [[ -f shared/http/errors.go ]]; then
    echo "==> Removing duplicate shared/http/errors.go"
    rm -f shared/http/errors.go
fi

###############################################################################
# 2. Restore/extend the validation API without breaking the existing tests.
#
#    We support BOTH:
#
#      Validator.Validate(value) -> Result
#
#    and
#
#      Validator.Struct(value) -> error
#
#    This gives us a convenient Pydantic-like result API while retaining
#    idiomatic Go error handling.
###############################################################################

cat > shared/validation/validation.go <<'EOF'
package validation

import (
	"reflect"
	"regexp"
	"strings"

	"github.com/go-playground/validator/v10"
)

var (
	e164Pattern = regexp.MustCompile(`^\+[1-9][0-9]{7,14}$`)
)

type Result struct {
	Valid  bool
	Fields FieldErrors
}

type Validator struct {
	engine *validator.Validate
}

func New() *Validator {
	v := validator.New()

	v.RegisterTagNameFunc(func(field reflect.StructField) string {
		name := strings.Split(field.Tag.Get("json"), ",")[0]

		if name == "-" {
			return field.Name
		}

		if name == "" {
			return field.Name
		}

		return name
	})

	if err := v.RegisterValidation("e164", func(fl validator.FieldLevel) bool {
		return e164Pattern.MatchString(fl.Field().String())
	}); err != nil {
		panic(err)
	}

	return &Validator{
		engine: v,
	}
}

// Validate returns a structured validation result.
//
// This is useful when the caller wants to inspect all validation failures
// without immediately converting them into an error response.
func (v *Validator) Validate(value any) Result {
	if err := v.engine.Struct(value); err != nil {
		validationErr := From(err)

		return Result{
			Valid:  false,
			Fields: validationErr.Fields,
		}
	}

	return Result{
		Valid:  true,
		Fields: nil,
	}
}

// Struct provides idiomatic Go error-based validation.
func (v *Validator) Struct(value any) error {
	result := v.Validate(value)

	if result.Valid {
		return nil
	}

	return &Error{
		Fields: result.Fields,
	}
}
EOF

###############################################################################
# 3. Validation errors.
###############################################################################

cat > shared/validation/errors.go <<'EOF'
package validation

import (
	"errors"
	"fmt"
	"strings"

	"github.com/go-playground/validator/v10"
)

type FieldErrors map[string][]string

type Error struct {
	Fields FieldErrors
}

func (e *Error) Error() string {
	return "request validation failed"
}

func Is(err error) bool {
	var target *Error

	return errors.As(err, &target)
}

func From(err error) *Error {
	if err == nil {
		return nil
	}

	var validationErrs validator.ValidationErrors

	if !errors.As(err, &validationErrs) {
		return &Error{
			Fields: FieldErrors{
				"_": {"request failed validation"},
			},
		}
	}

	fields := make(FieldErrors)

	for _, fieldErr := range validationErrs {
		field := fieldErr.Field()
		message := messageFor(fieldErr)

		fields[field] = append(fields[field], message)
	}

	return &Error{
		Fields: fields,
	}
}

func messageFor(e validator.FieldError) string {
	switch e.Tag() {
	case "required":
		return "is required"

	case "email":
		return "must be a valid email address"

	case "e164":
		return "must be a valid E.164 phone number"

	case "uuid4":
		return "must be a valid UUIDv4"

	case "gte":
		return fmt.Sprintf(
			"must be greater than or equal to %s",
			e.Param(),
		)

	case "lte":
		return fmt.Sprintf(
			"must be less than or equal to %s",
			e.Param(),
		)

	case "min":
		return fmt.Sprintf(
			"must contain at least %s characters",
			e.Param(),
		)

	case "max":
		return fmt.Sprintf(
			"must contain at most %s characters",
			e.Param(),
		)

	case "oneof":
		return fmt.Sprintf(
			"must be one of: %s",
			strings.ReplaceAll(e.Param(), " ", ", "),
		)

	default:
		return fmt.Sprintf(
			"failed validation rule %q",
			e.Tag(),
		)
	}
}
EOF

###############################################################################
# 4. Normalization.
###############################################################################

cat > shared/validation/normalize.go <<'EOF'
package validation

import (
	"strings"
	"unicode"
)

// Trim removes leading and trailing Unicode whitespace.
func Trim(value string) string {
	return strings.TrimSpace(value)
}

// Upper canonicalizes a string to uppercase after trimming whitespace.
func Upper(value string) string {
	return strings.ToUpper(strings.TrimSpace(value))
}

// Lower canonicalizes a string to lowercase after trimming whitespace.
func Lower(value string) string {
	return strings.ToLower(strings.TrimSpace(value))
}

// NormalizeEmail produces a canonical representation suitable for comparison.
//
// We intentionally do NOT perform provider-specific transformations such as
// removing dots from Gmail addresses or stripping plus-addressing. Those are
// not universally valid email semantics.
func NormalizeEmail(value string) string {
	return strings.ToLower(strings.TrimSpace(value))
}

// NormalizePhone removes common presentation characters while preserving the
// international '+' prefix.
//
// Validation is still responsible for determining whether the final value is
// a valid E.164 number.
func NormalizePhone(value string) string {
	value = strings.TrimSpace(value)

	var b strings.Builder
	b.Grow(len(value))

	for _, r := range value {
		switch {
		case r == '+' && b.Len() == 0:
			b.WriteRune(r)

		case unicode.IsDigit(r):
			b.WriteRune(r)

		case unicode.IsSpace(r), r == '-', r == '(', r == ')':
			continue

		default:
			b.WriteRune(r)
		}
	}

	return b.String()
}
EOF

###############################################################################
# 5. HTTP validation response.
#
#    We deliberately do NOT define WriteError here because response.go already
#    owns that API. This avoids duplicate symbols and keeps HTTP error handling
#    centralized.
###############################################################################

cat > shared/http/validation.go <<'EOF'
package http

import (
	"encoding/json"
	nethttp "net/http"

	"github.com/kirilock/backend/shared/validation"
)

type ValidationErrorResponse struct {
	Error ValidationErrorBody `json:"error"`
}

type ValidationErrorBody struct {
	Code      string                 `json:"code"`
	Message   string                 `json:"message"`
	RequestID string                 `json:"request_id,omitempty"`
	Fields    validation.FieldErrors `json:"fields,omitempty"`
}

// WriteValidationError writes the canonical KiriLock validation response.
//
// This is intentionally separate from WriteError because WriteError is the
// generic transport-level error helper already provided by response.go.
func WriteValidationError(
	w nethttp.ResponseWriter,
	r *nethttp.Request,
	err error,
) {
	validationErr := validation.From(err)

	requestID := r.Header.Get("X-Request-ID")

	response := ValidationErrorResponse{
		Error: ValidationErrorBody{
			Code:      "VALIDATION_ERROR",
			Message:   "Request validation failed",
			RequestID: requestID,
			Fields:    validationErr.Fields,
		},
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(nethttp.StatusBadRequest)

	_ = json.NewEncoder(w).Encode(response)
}
EOF

###############################################################################
# 6. Add direct tests for the repaired validation API.
###############################################################################

cat > shared/validation/contract_test.go <<'EOF'
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

func TestStructReturnsNilForValidPayload(t *testing.T) {
	v := New()

	payload := contractPayload{
		Phone:    "+256700000000",
		Amount:   20000,
		Currency: "UGX",
		Request:  uuid.NewString(),
	}

	if err := v.Struct(payload); err != nil {
		t.Fatalf("expected nil error, got %v", err)
	}
}

func TestStructReturnsErrorForInvalidPayload(t *testing.T) {
	v := New()

	payload := contractPayload{
		Phone:    "invalid",
		Amount:   1,
		Currency: "EUR",
		Request:  "invalid",
	}

	if err := v.Struct(payload); err == nil {
		t.Fatal("expected validation error")
	}
}

func TestNormalizeEmail(t *testing.T) {
	got := NormalizeEmail("  User@Example.COM  ")
	want := "user@example.com"

	if got != want {
		t.Fatalf(
			"NormalizeEmail() = %q, want %q",
			got,
			want,
		)
	}
}

func TestNormalizePhone(t *testing.T) {
	got := NormalizePhone("+256 700-000-000")
	want := "+256700000000"

	if got != want {
		t.Fatalf(
			"NormalizePhone() = %q, want %q",
			got,
			want,
		)
	}
}
EOF

###############################################################################
# 7. Formatting.
###############################################################################

echo "==> Formatting"
gofmt -w \
    shared/validation \
    shared/http \
    tests/contract

###############################################################################
# 8. Module consistency.
###############################################################################

echo "==> Tidying Go modules"
go mod tidy

###############################################################################
# 9. Tests.
###############################################################################

echo "==> Running tests"
go test ./...

###############################################################################
# 10. Race detector.
###############################################################################

echo "==> Running race detector"
go test -race ./...

###############################################################################
# 11. Static analysis.
###############################################################################

echo "==> Running vet"
go vet ./...

###############################################################################
# 12. Build.
###############################################################################

echo "==> Building API server"
mkdir -p bin
go build -o bin/kirilock-api ./cmd/kirilock-api

###############################################################################
# 13. Final verification.
###############################################################################

echo
echo "=============================================="
echo " KiriLock CONTRACT FOUNDATION PASSED"
echo "=============================================="
echo
echo "Binary:"
ls -lh bin/kirilock-api
echo
echo "Validation:"
echo "  Strict validation API       OK"
echo "  Structured field errors     OK"
echo "  Email normalization         OK"
echo "  Phone normalization         OK"
echo "  HTTP validation response    OK"
echo "  Strict JSON decoder         OK"
echo "  Race detector               OK"
echo "  go vet                      OK"
echo "  API build                   OK"
echo
