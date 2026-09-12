#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> Restoring KiriLock validation contract"

###############################################################################
# Validator
#
# IMPORTANT:
#
# Existing KiriLock contract:
#
#     result := v.Struct(payload)
#
#     if !result.Valid { ... }
#
# Therefore Struct MUST return Result.
#
# Validate is retained as the same structured-validation operation.
# Error(value) provides an explicit Go error when required by callers.
###############################################################################

cat > shared/validation/validation.go <<'EOF'
package validation

import (
	"reflect"
	"regexp"
	"strings"

	"github.com/go-playground/validator/v10"
)

var e164Pattern = regexp.MustCompile(`^\+[1-9][0-9]{7,14}$`)

// Result is the canonical KiriLock validation result.
//
// Valid is true when the complete structure satisfies all registered
// validation rules.
//
// Fields contains validation failures keyed by the JSON field name.
type Result struct {
	Valid  bool
	Fields FieldErrors
}

// Validator owns the validation rules used by KiriLock contracts.
type Validator struct {
	engine *validator.Validate
}

// New creates a KiriLock validator with the standard validation rules.
func New() *Validator {
	v := validator.New()

	// Use JSON field names in validation errors.
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

	// E.164 international telephone number format.
	if err := v.RegisterValidation("e164", func(fl validator.FieldLevel) bool {
		return e164Pattern.MatchString(fl.Field().String())
	}); err != nil {
		panic(err)
	}

	return &Validator{
		engine: v,
	}
}

// Struct validates a request structure.
//
// This method is part of the existing KiriLock contract and therefore returns
// Result rather than error.
func (v *Validator) Struct(value any) Result {
	return v.Validate(value)
}

// Validate validates a value and returns all field-level failures.
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

// Error converts validation into a standard Go error.
//
// This is intentionally separate from Struct so the established KiriLock
// Result API remains unchanged.
func (v *Validator) Error(value any) error {
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
# Remove tests that incorrectly assumed Struct() returns error.
#
# The original validation_test.go is authoritative and already tests Struct().
###############################################################################

python3 - <<'PY'
from pathlib import Path

path = Path("shared/validation/contract_test.go")
text = path.read_text()

start = text.find("func TestStructReturnsNilForValidPayload(")

if start != -1:
    text = text[:start].rstrip() + "\n"

path.write_text(text)
PY

###############################################################################
# Ensure NormalizeEmail retains the established (string, error) contract.
###############################################################################

cat > shared/validation/normalize.go <<'EOF'
package validation

import (
	"fmt"
	"net/mail"
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

// NormalizeEmail validates and canonicalizes an email address.
//
// KiriLock deliberately performs conservative normalization:
//
//   - surrounding whitespace is removed
//   - the address is converted to lowercase
//   - provider-specific transformations are NOT performed
func NormalizeEmail(value string) (string, error) {
	value = strings.TrimSpace(value)

	if value == "" {
		return "", fmt.Errorf("email address is empty")
	}

	parsed, err := mail.ParseAddress(value)
	if err != nil {
		return "", fmt.Errorf("invalid email address: %w", err)
	}

	// KiriLock contracts require an address rather than display-name syntax:
	//
	//     User <user@example.com>
	//
	// is therefore rejected.
	if parsed.Address != value {
		return "", fmt.Errorf("email must contain only an email address")
	}

	return strings.ToLower(parsed.Address), nil
}

// NormalizePhone removes common presentation characters while preserving
// the leading international '+'.
//
// E.164 validation is performed separately.
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
# Test the explicit error adapter.
###############################################################################

cat >> shared/validation/validation_test.go <<'EOF'

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
EOF

###############################################################################
# Format.
###############################################################################

echo "==> Formatting"
gofmt -w \
    shared/validation \
    shared/http \
    tests/contract

###############################################################################
# Verify signatures.
###############################################################################

echo "==> Verifying API signatures"

grep -nE \
    '^type Result struct|^func \(v \*Validator\) Struct|^func \(v \*Validator\) Validate|^func \(v \*Validator\) Error|^func NormalizeEmail' \
    shared/validation/validation.go \
    shared/validation/normalize.go

###############################################################################
# Dependencies.
###############################################################################

echo "==> Tidying modules"
go mod tidy

###############################################################################
# Full tests.
###############################################################################

echo "==> Running tests"
go test ./...

###############################################################################
# Race detector.
###############################################################################

echo "==> Running race detector"
go test -race ./...

###############################################################################
# Static analysis.
###############################################################################

echo "==> Running vet"
go vet ./...

###############################################################################
# Build.
###############################################################################

echo "==> Building API server"
mkdir -p bin
go build -o bin/kirilock-api ./cmd/kirilock-api

###############################################################################
# Final result.
###############################################################################

echo
echo "=============================================="
echo " KiriLock VALIDATION CONTRACT PASSED"
echo "=============================================="
echo
echo "Verified:"
echo "  Struct() -> Result           OK"
echo "  Validate() -> Result         OK"
echo "  Result.Valid                 OK"
echo "  Result.Fields                OK"
echo "  Error() -> error             OK"
echo "  NormalizeEmail -> (string,error) OK"
echo "  NormalizePhone               OK"
echo "  Unit tests                   OK"
echo "  Race detector                OK"
echo "  go vet                       OK"
echo "  API build                    OK"
echo
ls -lh bin/kirilock-api
