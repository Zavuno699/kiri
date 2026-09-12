package handler

import (
	"encoding/json"
	"errors"
	"net/http"

	httpx "github.com/kirilock/backend/shared/http"

	"github.com/kirilock/backend/billing-service/internal/service"
	"github.com/kirilock/backend/shared/validation"
)

type PaymentApplicationHandler struct {
	validator   *validation.Validator
	application *service.PaymentApplication
}

func NewPaymentApplicationHandler(
	validator *validation.Validator,
	application *service.PaymentApplication,
) (*PaymentApplicationHandler, error) {
	if validator == nil {
		return nil, errors.New("validator is required")
	}
	if application == nil {
		return nil, errors.New("payment application is required")
	}

	return &PaymentApplicationHandler{
		validator:   validator,
		application: application,
	}, nil
}

func (h *PaymentApplicationHandler) RegisterRoutes(mux *http.ServeMux) {
	mux.Handle("POST /api/v1/payments", h)
}

func (h *PaymentApplicationHandler) ServeHTTP(
	w http.ResponseWriter,
	r *http.Request,
) {
	var request service.CreatePaymentRequest

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()

	if err := decoder.Decode(&request); err != nil {
		http.Error(w, "invalid JSON request", http.StatusBadRequest)
		return
	}

	validationResult := h.validator.Struct(request)
	if !validationResult.Valid {
		http.Error(w, "request validation failed", http.StatusUnprocessableEntity)
		return
	}

	principal, err := httpx.PrincipalFromContext(r.Context())
	if err != nil {
		http.Error(w, "tenant identity is required", http.StatusUnauthorized)
		return
	}

	tenantID := principal.TenantID

	payment, err := h.application.CreatePendingPayment(
		r.Context(),
		tenantID,
		request,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	_ = json.NewEncoder(w).Encode(payment)
}
