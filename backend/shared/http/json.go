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
