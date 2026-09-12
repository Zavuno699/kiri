package handler

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"io"
	"net/http"

	"github.com/kirilock/backend/billing-service/internal/model"
	"github.com/kirilock/backend/billing-service/internal/service"
	khttp "github.com/kirilock/backend/shared/http"
	"github.com/kirilock/backend/shared/validation"
)

const maxPaymentBodySize = 16 * 1024

type PaymentHandler struct {
	validator *validation.Validator
	service   *service.PaymentService
}

func NewPaymentHandler(
	validator *validation.Validator,
	service *service.PaymentService,
) *PaymentHandler {
	return &PaymentHandler{
		validator: validator,
		service:   service,
	}
}

func (h *PaymentHandler) ServeHTTP(
	w http.ResponseWriter,
	r *http.Request,
) {
	if r.Method != http.MethodPost {
		khttp.WriteError(
			w,
			http.StatusMethodNotAllowed,
			"METHOD_NOT_ALLOWED",
			"method not allowed",
			khttp.RequestID(r.Context()),
			nil,
		)
		return
	}

	body, err := io.ReadAll(
		http.MaxBytesReader(w, r.Body, maxPaymentBodySize),
	)
	if err != nil {
		if errors.Is(err, http.ErrBodyReadAfterClose) {
			khttp.WriteError(
				w,
				http.StatusBadRequest,
				"INVALID_REQUEST",
				"request body could not be read",
				khttp.RequestID(r.Context()),
				nil,
			)
			return
		}

		khttp.WriteError(
			w,
			http.StatusRequestEntityTooLarge,
			"REQUEST_TOO_LARGE",
			"request body is too large",
			khttp.RequestID(r.Context()),
			nil,
		)
		return
	}

	decoder := json.NewDecoder(bytes.NewReader(body))
	decoder.DisallowUnknownFields()

	var request model.PaymentRequest

	if err := decoder.Decode(&request); err != nil {
		khttp.WriteError(
			w,
			http.StatusBadRequest,
			"INVALID_JSON",
			"request body contains invalid JSON",
			khttp.RequestID(r.Context()),
			nil,
		)
		return
	}

	// Exactly one JSON value is permitted.
	var trailing any
	if err := decoder.Decode(&trailing); err != io.EOF {
		khttp.WriteError(
			w,
			http.StatusBadRequest,
			"INVALID_JSON",
			"request body must contain exactly one JSON object",
			khttp.RequestID(r.Context()),
			nil,
		)
		return
	}

	result := h.validator.Struct(request)

	if !result.Valid {
		khttp.WriteError(
			w,
			http.StatusUnprocessableEntity,
			"VALIDATION_ERROR",
			"request validation failed",
			khttp.RequestID(r.Context()),
			result.Fields,
		)
		return
	}

	fingerprint := requestFingerprint(request)

	payment, replayed, err := h.service.Create(
		request,
		fingerprint,
	)

	if err != nil {
		if errors.Is(err, service.ErrIdempotencyConflict) {
			khttp.WriteError(
				w,
				http.StatusConflict,
				"IDEMPOTENCY_CONFLICT",
				"idempotency key was already used with a different request",
				khttp.RequestID(r.Context()),
				nil,
			)
			return
		}

		khttp.WriteError(
			w,
			http.StatusInternalServerError,
			"INTERNAL_ERROR",
			"an internal error occurred",
			khttp.RequestID(r.Context()),
			nil,
		)
		return
	}

	status := http.StatusCreated

	if replayed {
		status = http.StatusOK
	}

	khttp.WriteJSON(
		w,
		status,
		payment,
	)
}

func requestFingerprint(request model.PaymentRequest) string {
	payload, _ := json.Marshal(request)

	sum := sha256.Sum256(payload)

	return hex.EncodeToString(sum[:])
}

// RegisterRoutes registers billing-owned HTTP endpoints.
//
// Route ownership remains inside the billing service while the application
// process remains responsible for composing the global HTTP server.
func (h *PaymentHandler) RegisterRoutes(mux *http.ServeMux) {
	mux.Handle(
		"POST /api/v1/payments",
		h,
	)
}
