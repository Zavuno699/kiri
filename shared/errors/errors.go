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
	Code      Code                `json:"code"`
	Message   string              `json:"message"`
	RequestID string              `json:"request_id,omitempty"`
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
