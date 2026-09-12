package http

import (
	"encoding/json"
	nethttp "net/http"
)

type ErrorResponse struct {
	Error APIErrorResponse `json:"error"`
}

type APIErrorResponse struct {
	Code      string              `json:"code"`
	Message   string              `json:"message"`
	RequestID string              `json:"request_id,omitempty"`
	Fields    map[string][]string `json:"fields,omitempty"`
}

func WriteJSON(
	w nethttp.ResponseWriter,
	status int,
	value any,
) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)

	// The response has already been selected as JSON. If encoding
	// unexpectedly fails, the connection cannot safely be rewritten
	// after headers have been sent.
	_ = json.NewEncoder(w).Encode(value)
}

func WriteError(
	w nethttp.ResponseWriter,
	status int,
	code string,
	message string,
	requestID string,
	fields map[string][]string,
) {
	WriteJSON(w, status, ErrorResponse{
		Error: APIErrorResponse{
			Code:      code,
			Message:   message,
			RequestID: requestID,
			Fields:    fields,
		},
	})
}
