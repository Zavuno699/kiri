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
