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
