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
