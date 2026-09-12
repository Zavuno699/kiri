#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> Fixing KiriLock validation contract"

###############################################################################
# NormalizeEmail
#
# Existing KiriLock tests expect:
#
#     value, err := NormalizeEmail(...)
#
# Therefore this function must return (string, error).
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
// Canonicalization performed here is deliberately conservative:
//   - trim surrounding whitespace
//   - lowercase the complete address
//
// We do not apply provider-specific transformations such as removing dots
// or stripping "+" aliases.
func NormalizeEmail(value string) (string, error) {
	value = strings.TrimSpace(value)

	if value == "" {
		return "", fmt.Errorf("email address is empty")
	}

	parsed, err := mail.ParseAddress(value)
	if err != nil {
		return "", fmt.Errorf("invalid email address: %w", err)
	}

	// Reject display-name syntax such as:
	//
	//     User <user@example.com>
	//
	// because KiriLock API contracts require an email address, not a
	// display-name/mailbox combination.
	if parsed.Address != value {
		return "", fmt.Errorf("email must contain only an email address")
	}

	normalized := strings.ToLower(parsed.Address)

	return normalized, nil
}

// NormalizePhone removes common presentation characters while preserving the
// international '+' prefix.
//
// Validation remains responsible for determining whether the resulting value
// is a valid E.164 number.
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
# Remove the duplicate TestNormalizeEmail introduced by the previous script.
#
# The original shared/validation/validation_test.go already owns this test.
###############################################################################

python3 - <<'PY'
from pathlib import Path

path = Path("shared/validation/contract_test.go")
text = path.read_text()

start = text.find("func TestNormalizeEmail(")

if start != -1:
    text = text[:start].rstrip() + "\n"

path.write_text(text)
PY

###############################################################################
# Format.
###############################################################################

echo "==> Formatting"
gofmt -w \
    shared/validation \
    shared/http \
    tests/contract

###############################################################################
# Check the important API signatures before compiling.
###############################################################################

echo "==> Checking validation API"

grep -nE '^type Result struct|^func \(v \*Validator\) Validate|^func \(v \*Validator\) Struct|^func NormalizeEmail' \
    shared/validation/validation.go \
    shared/validation/normalize.go

###############################################################################
# Dependencies.
###############################################################################

echo "==> Tidying Go modules"
go mod tidy

###############################################################################
# Tests.
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
# Final verification.
###############################################################################

echo
echo "=============================================="
echo " KiriLock VALIDATION CONTRACT PASSED"
echo "=============================================="
echo
echo "Verified:"
echo "  Validator.Result API        OK"
echo "  Result.Valid                OK"
echo "  Result.Fields               OK"
echo "  NormalizeEmail(value,error) OK"
echo "  NormalizePhone              OK"
echo "  HTTP error contract         OK"
echo "  Unit tests                  OK"
echo "  Race detector               OK"
echo "  go vet                      OK"
echo "  API build                   OK"
echo
ls -lh bin/kirilock-api
