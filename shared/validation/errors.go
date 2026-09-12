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
