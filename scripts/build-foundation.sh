#!/usr/bin/env bash

set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "=============================================="
echo " KiriLock Go Foundation"
echo "=============================================="

echo
echo "==> Go environment"
go version
go env GOOS GOARCH

# ------------------------------------------------------------
# Dependencies
# ------------------------------------------------------------

echo
echo "==> Installing foundational dependencies"

go get github.com/go-playground/validator/v10
go get github.com/google/uuid
go get github.com/shopspring/decimal
go get golang.org/x/sync

# ------------------------------------------------------------
# Directory structure
# ------------------------------------------------------------

echo
echo "==> Creating foundation directories"

mkdir -p \
    shared/config \
    shared/errors \
    shared/events \
    shared/http \
    shared/logging \
    shared/metadata \
    shared/types \
    shared/validation

# ------------------------------------------------------------
# Metadata
# ------------------------------------------------------------

cat > shared/metadata/metadata.go <<'EOF'
package metadata

import "time"

// Metadata contains common lifecycle information for KiriLock
// resources.
//
// Version represents the application-level version of the resource.
// It is deliberately separate from database transaction/version
// mechanisms.
type Metadata struct {
	ID            string    `json:"id"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
	Version       int       `json:"version"`
	CorrelationID string    `json:"correlation_id,omitempty"`
}
EOF

# ------------------------------------------------------------
# Strongly typed IDs
# ------------------------------------------------------------

cat > shared/types/id.go <<'EOF'
package types

import (
	"errors"
	"strings"

	"github.com/google/uuid"
)

var ErrInvalidID = errors.New("invalid ID")

// ID is the canonical KiriLock identifier.
//
// IDs are represented as UUIDs at the wire/storage boundary while
// remaining a distinct Go type inside the application.
type ID string

func NewID() ID {
	return ID(uuid.NewString())
}

func ParseID(value string) (ID, error) {
	value = strings.TrimSpace(value)

	if value == "" {
		return "", ErrInvalidID
	}

	if _, err := uuid.Parse(value); err != nil {
		return "", ErrInvalidID
	}

	return ID(value), nil
}

func (id ID) String() string {
	return string(id)
}

func (id ID) Empty() bool {
	return strings.TrimSpace(string(id)) == ""
}
EOF

# ------------------------------------------------------------
# Validation
# ------------------------------------------------------------

cat > shared/validation/validation.go <<'EOF'
package validation

import (
	"errors"
	"fmt"
	"net/mail"
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
)

var (
	ErrInvalidInput = errors.New("invalid input")
)

type FieldErrors map[string][]string

type Result struct {
	Valid  bool
	Fields FieldErrors
}

type Validator struct {
	engine *validator.Validate
}

func New() *Validator {
	v := validator.New()

	// Use JSON field names in validation errors.
	v.RegisterTagNameFunc(func(field reflect.StructField) string {
		name := strings.Split(field.Tag.Get("json"), ",")[0]

		if name == "" || name == "-" {
			return field.Name
		}

		return name
	})

	return &Validator{
		engine: v,
	}
}

func (v *Validator) Struct(value any) Result {
	err := v.engine.Struct(value)

	if err == nil {
		return Result{
			Valid:  true,
			Fields: nil,
		}
	}

	fields := FieldErrors{}

	var validationErrors validator.ValidationErrors

	if !errors.As(err, &validationErrors) {
		fields["_"] = []string{err.Error()}

		return Result{
			Valid:  false,
			Fields: fields,
		}
	}

	for _, fieldErr := range validationErrors {
		field := fieldErr.Field()

		fields[field] = append(
			fields[field],
			message(fieldErr),
		)
	}

	return Result{
		Valid:  false,
		Fields: fields,
	}
}

func (v *Validator) MustStruct(value any) error {
	result := v.Struct(value)

	if result.Valid {
		return nil
	}

	return fmt.Errorf("%w: %v", ErrInvalidInput, result.Fields)
}

func message(err validator.FieldError) string {
	switch err.Tag() {
	case "required":
		return "is required"

	case "email":
		return "must be a valid email address"

	case "gte":
		return fmt.Sprintf("must be greater than or equal to %s", err.Param())

	case "lte":
		return fmt.Sprintf("must be less than or equal to %s", err.Param())

	case "min":
		return fmt.Sprintf("must contain at least %s characters/items", err.Param())

	case "max":
		return fmt.Sprintf("must contain at most %s characters/items", err.Param())

	case "oneof":
		return fmt.Sprintf("must be one of: %s", err.Param())

	case "uuid4":
		return "must be a valid UUIDv4"

	default:
		return "is invalid"
	}
}

// NormalizeEmail provides deterministic email normalization.
//
// Normalization is intentionally separate from validation.
func NormalizeEmail(value string) (string, error) {
	value = strings.TrimSpace(value)

	if value == "" {
		return "", ErrInvalidInput
	}

	parsed, err := mail.ParseAddress(value)

	if err != nil {
		return "", ErrInvalidInput
	}

	if parsed.Address != value {
		return "", ErrInvalidInput
	}

	return strings.ToLower(value), nil
}
EOF

# ------------------------------------------------------------
# Structured errors
# ------------------------------------------------------------

cat > shared/errors/errors.go <<'EOF'
package errors

import "net/http"

type Code string

const (
	CodeValidation   Code = "VALIDATION_ERROR"
	CodeUnauthorized Code = "UNAUTHORIZED"
	CodeForbidden    Code = "FORBIDDEN"
	CodeNotFound     Code = "NOT_FOUND"
	CodeConflict     Code = "CONFLICT"
	CodeIdempotency  Code = "IDEMPOTENCY_ERROR"
	CodeDomain       Code = "DOMAIN_ERROR"
	CodeInternal     Code = "INTERNAL_ERROR"
	CodeUnavailable  Code = "SERVICE_UNAVAILABLE"
)

type APIError struct {
	Code      Code               `json:"code"`
	Message   string             `json:"message"`
	RequestID string             `json:"request_id,omitempty"`
	Fields    map[string][]string `json:"fields,omitempty"`
}

func (e APIError) Error() string {
	return string(e.Code) + ": " + e.Message
}

func (e APIError) HTTPStatus() int {
	switch e.Code {
	case CodeValidation:
		return http.StatusBadRequest

	case CodeUnauthorized:
		return http.StatusUnauthorized

	case CodeForbidden:
		return http.StatusForbidden

	case CodeNotFound:
		return http.StatusNotFound

	case CodeConflict, CodeIdempotency:
		return http.StatusConflict

	case CodeUnavailable:
		return http.StatusServiceUnavailable

	default:
		return http.StatusInternalServerError
	}
}
EOF

# ------------------------------------------------------------
# Event envelope
# ------------------------------------------------------------

cat > shared/events/envelope.go <<'EOF'
package events

import "time"

type EventMetadata struct {
	EventID       string    `json:"event_id"`
	EventType     string    `json:"event_type"`
	EventVersion  int       `json:"event_version"`
	OccurredAt    time.Time `json:"occurred_at"`
	CorrelationID string    `json:"correlation_id"`
	CausationID   string    `json:"causation_id,omitempty"`
	Producer      string    `json:"producer"`
}

type EventEnvelope struct {
	Metadata EventMetadata `json:"metadata"`
	TenantID string        `json:"tenant_id,omitempty"`
	DeviceID string        `json:"device_id,omitempty"`
	Payload  any           `json:"payload"`
}
EOF

# ------------------------------------------------------------
# Strict JSON HTTP decoding
# ------------------------------------------------------------

cat > shared/http/json.go <<'EOF'
package http

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
)

const maxJSONBodySize = 1 << 20 // 1 MiB

var (
	ErrEmptyBody       = errors.New("request body is empty")
	ErrInvalidJSON     = errors.New("request body contains invalid JSON")
	ErrUnknownField    = errors.New("request contains an unknown field")
	ErrMultipleJSON    = errors.New("request contains multiple JSON values")
	ErrRequestTooLarge = errors.New("request body is too large")
)

func DecodeJSON(w http.ResponseWriter, r *http.Request, destination any) error {
	if r.Body == nil {
		return ErrEmptyBody
	}

	r.Body = http.MaxBytesReader(
		w,
		r.Body,
		maxJSONBodySize,
	)

	decoder := json.NewDecoder(r.Body)

	// Critical: reject fields that are not part of the request schema.
	decoder.DisallowUnknownFields()

	// Preserve JSON numbers instead of silently converting them
	// through float64.
	decoder.UseNumber()

	if err := decoder.Decode(destination); err != nil {
		if errors.Is(err, io.EOF) {
			return ErrEmptyBody
		}

		var maxBytesError *http.MaxBytesError

		if errors.As(err, &maxBytesError) {
			return ErrRequestTooLarge
		}

		return ErrInvalidJSON
	}

	// Exactly one JSON value is permitted.
	var extra any

	if err := decoder.Decode(&extra); err != io.EOF {
		if err == nil {
			return ErrMultipleJSON
		}

		return ErrInvalidJSON
	}

	return nil
}
EOF

# ------------------------------------------------------------
# Request metadata
# ------------------------------------------------------------

cat > shared/http/request.go <<'EOF'
package http

import (
	"context"

	"github.com/google/uuid"
)

type contextKey string

const (
	requestIDKey     contextKey = "kirilock.request_id"
	correlationIDKey contextKey = "kirilock.correlation_id"
)

func RequestID(ctx context.Context) string {
	value, _ := ctx.Value(requestIDKey).(string)
	return value
}

func CorrelationID(ctx context.Context) string {
	value, _ := ctx.Value(correlationIDKey).(string)
	return value
}

func WithRequestMetadata(
	ctx context.Context,
	requestID string,
	correlationID string,
) context.Context {
	if requestID == "" {
		requestID = uuid.NewString()
	}

	if correlationID == "" {
		correlationID = requestID
	}

	ctx = context.WithValue(ctx, requestIDKey, requestID)
	ctx = context.WithValue(ctx, correlationIDKey, correlationID)

	return ctx
}
EOF

# ------------------------------------------------------------
# Configuration
# ------------------------------------------------------------

cat > shared/config/config.go <<'EOF'
package config

import (
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Config struct {
	App AppConfig
	HTTP HTTPConfig
}

type AppConfig struct {
	Name        string
	Environment string
}

type HTTPConfig struct {
	Host string
	Port int
}

func Load() (Config, error) {
	cfg := Config{
		App: AppConfig{
			Name:        getEnv("APP_NAME", "kirilock"),
			Environment: getEnv("APP_ENV", "development"),
		},
		HTTP: HTTPConfig{
			Host: getEnv("HTTP_HOST", "0.0.0.0"),
		},
	}

	port, err := strconv.Atoi(getEnv("HTTP_PORT", "8080"))

	if err != nil {
		return Config{}, fmt.Errorf("invalid HTTP_PORT: %w", err)
	}

	if port < 1 || port > 65535 {
		return Config{}, errors.New("HTTP_PORT must be between 1 and 65535")
	}

	cfg.HTTP.Port = port

	if strings.TrimSpace(cfg.App.Name) == "" {
		return Config{}, errors.New("APP_NAME cannot be empty")
	}

	if strings.TrimSpace(cfg.App.Environment) == "" {
		return Config{}, errors.New("APP_ENV cannot be empty")
	}

	return cfg, nil
}

func getEnv(key string, fallback string) string {
	value, exists := os.LookupEnv(key)

	if !exists || strings.TrimSpace(value) == "" {
		return fallback
	}

	return strings.TrimSpace(value)
}
EOF

# ------------------------------------------------------------
# Foundation tests
# ------------------------------------------------------------

cat > shared/types/id_test.go <<'EOF'
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
EOF

cat > shared/validation/validation_test.go <<'EOF'
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
EOF

# ------------------------------------------------------------
# Formatting
# ------------------------------------------------------------

echo
echo "==> Formatting Go source"
gofmt -w \
    shared/metadata \
    shared/types \
    shared/validation \
    shared/errors \
    shared/events \
    shared/http \
    shared/config

# ------------------------------------------------------------
# Dependency resolution
# ------------------------------------------------------------

echo
echo "==> Tidying Go module"
go mod tidy

# ------------------------------------------------------------
# Verification
# ------------------------------------------------------------

echo
echo "==> Running tests"
go test ./...

echo
echo "==> Running vet"
go vet ./...

echo
echo "=============================================="
echo " KiriLock Go Foundation PASSED"
echo "=============================================="
