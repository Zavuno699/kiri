#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> Building KiriLock contract/validation foundation"

mkdir -p \
    shared/http \
    shared/validation \
    shared/errors \
    shared/types \
    shared/metadata \
    tests/contract

###############################################################################
# Strict JSON decoding
###############################################################################

cat > shared/http/json.go <<'EOF'
package http

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
)

const MaxJSONBodyBytes int64 = 1 << 20 // 1 MiB

var (
	ErrEmptyBody       = errors.New("request body is empty")
	ErrMalformedJSON   = errors.New("request body contains malformed JSON")
	ErrUnknownField    = errors.New("request body contains an unknown field")
	ErrMultipleObjects = errors.New("request body contains multiple JSON values")
)

func DecodeJSON(w http.ResponseWriter, r *http.Request, dst any) error {
	if r.Body == nil {
		return ErrEmptyBody
	}

	r.Body = http.MaxBytesReader(w, r.Body, MaxJSONBodyBytes)

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()

	if err := decoder.Decode(dst); err != nil {
		if errors.Is(err, io.EOF) {
			return ErrEmptyBody
		}

		var syntaxErr *json.SyntaxError
		if errors.As(err, &syntaxErr) {
			return fmt.Errorf("%w: %v", ErrMalformedJSON, err)
		}

		return err
	}

	var extra any
	if err := decoder.Decode(&extra); err != io.EOF {
		return ErrMultipleObjects
	}

	return nil
}
EOF

###############################################################################
# Validation errors
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

	return &Error{Fields: fields}
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
		return fmt.Sprintf("must be greater than or equal to %s", e.Param())
	case "lte":
		return fmt.Sprintf("must be less than or equal to %s", e.Param())
	case "min":
		return fmt.Sprintf("must contain at least %s characters", e.Param())
	case "max":
		return fmt.Sprintf("must contain at most %s characters", e.Param())
	case "oneof":
		return fmt.Sprintf("must be one of: %s", strings.ReplaceAll(e.Param(), " ", ", "))
	default:
		return fmt.Sprintf("failed validation rule %q", e.Tag())
	}
}
EOF

###############################################################################
# Validation engine
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

	_ = v.RegisterValidation("e164", func(fl validator.FieldLevel) bool {
		return e164Pattern.MatchString(fl.Field().String())
	})

	return &Validator{engine: v}
}

func (v *Validator) Struct(value any) error {
	if err := v.engine.Struct(value); err != nil {
		return From(err)
	}

	return nil
}
EOF

###############################################################################
# Normalization helpers
###############################################################################

cat > shared/validation/normalize.go <<'EOF'
package validation

import "strings"

func Trim(value string) string {
	return strings.TrimSpace(value)
}

func Upper(value string) string {
	return strings.ToUpper(strings.TrimSpace(value))
}

func Lower(value string) string {
	return strings.ToLower(strings.TrimSpace(value))
}

func NormalizePhone(value string) string {
	value = strings.TrimSpace(value)
	value = strings.ReplaceAll(value, " ", "")
	value = strings.ReplaceAll(value, "-", "")

	return value
}
EOF

###############################################################################
# Structured API errors
###############################################################################

cat > shared/http/errors.go <<'EOF'
package http

import (
	"encoding/json"
	"net/http"

	"github.com/kirilock/backend/shared/validation"
)

type ErrorResponse struct {
	Error ErrorBody `json:"error"`
}

type ErrorBody struct {
	Code      string                 `json:"code"`
	Message   string                 `json:"message"`
	RequestID string                 `json:"request_id,omitempty"`
	Fields    validation.FieldErrors `json:"fields,omitempty"`
}

func WriteValidationError(w http.ResponseWriter, r *http.Request, err error) {
	validationErr := validation.From(err)

	WriteError(
		w,
		r,
		http.StatusBadRequest,
		"VALIDATION_ERROR",
		"Request validation failed",
		validationErr.Fields,
	)
}

func WriteError(
	w http.ResponseWriter,
	r *http.Request,
	status int,
	code string,
	message string,
	fields validation.FieldErrors,
) {
	requestID := r.Header.Get("X-Request-ID")

	response := ErrorResponse{
		Error: ErrorBody{
			Code:      code,
			Message:   message,
			RequestID: requestID,
			Fields:    fields,
		},
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	_ = json.NewEncoder(w).Encode(response)
}
EOF

###############################################################################
# Example contract
###############################################################################

mkdir -p tests/contract

cat > tests/contract/payment_contract.go <<'EOF'
package contract

type LeasePaymentPayload struct {
	TenantPhone    string `json:"tenant_phone" validate:"required,e164"`
	AmountUGX      int64  `json:"amount_ugx" validate:"required,gte=20000"`
	DaysRequested  int    `json:"days_requested" validate:"required,gte=1,lte=365"`
	IdempotencyKey string `json:"idempotency_key" validate:"required,uuid4"`
	CurrencyCode   string `json:"currency_code" validate:"required,oneof=UGX USD"`
}
EOF

###############################################################################
# Contract tests
###############################################################################

cat > tests/contract/payment_contract_test.go <<'EOF'
package contract

import (
	"testing"

	"github.com/google/uuid"
	"github.com/kirilock/backend/shared/validation"
)

func TestLeasePaymentPayloadValid(t *testing.T) {
	v := validation.New()

	payload := LeasePaymentPayload{
		TenantPhone:    "+256700000000",
		AmountUGX:      20000,
		DaysRequested:  30,
		IdempotencyKey: uuid.NewString(),
		CurrencyCode:   "UGX",
	}

	if err := v.Struct(payload); err != nil {
		t.Fatalf("expected valid payload, got %v", err)
	}
}

func TestLeasePaymentPayloadRejectsInvalidPhone(t *testing.T) {
	v := validation.New()

	payload := LeasePaymentPayload{
		TenantPhone:    "0700000000",
		AmountUGX:      20000,
		DaysRequested:  30,
		IdempotencyKey: uuid.NewString(),
		CurrencyCode:   "UGX",
	}

	if err := v.Struct(payload); err == nil {
		t.Fatal("expected invalid phone to fail")
	}
}

func TestLeasePaymentPayloadRejectsInvalidAmount(t *testing.T) {
	v := validation.New()

	payload := LeasePaymentPayload{
		TenantPhone:    "+256700000000",
		AmountUGX:      19999,
		DaysRequested:  30,
		IdempotencyKey: uuid.NewString(),
		CurrencyCode:   "UGX",
	}

	if err := v.Struct(payload); err == nil {
		t.Fatal("expected invalid amount to fail")
	}
}

func TestLeasePaymentPayloadRejectsInvalidCurrency(t *testing.T) {
	v := validation.New()

	payload := LeasePaymentPayload{
		TenantPhone:    "+256700000000",
		AmountUGX:      20000,
		DaysRequested:  30,
		IdempotencyKey: uuid.NewString(),
		CurrencyCode:   "EUR",
	}

	if err := v.Struct(payload); err == nil {
		t.Fatal("expected invalid currency to fail")
	}
}
EOF

###############################################################################
# Strict JSON decoder tests
###############################################################################

cat > shared/http/json_test.go <<'EOF'
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
EOF

###############################################################################
# Formatting and verification
###############################################################################

echo "==> Formatting"
gofmt -w \
    shared/http \
    shared/validation \
    tests/contract

echo "==> Tidying modules"
go mod tidy

echo "==> Running tests"
go test ./...

echo "==> Running race detector"
go test -race ./...

echo "==> Running vet"
go vet ./...

echo
echo "=============================================="
echo " KiriLock CONTRACT FOUNDATION PASSED"
echo "=============================================="
