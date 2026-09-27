package handler

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"

	"github.com/kirilock/backend/billing-service/internal/identity"
	"github.com/kirilock/backend/billing-service/internal/model"
	"github.com/kirilock/backend/billing-service/internal/repository"
	"github.com/kirilock/backend/billing-service/internal/service"
	"github.com/kirilock/backend/shared/validation"
)

// paymentCreator is the interface for creating payments, allowing the handler to use a fake in tests
type paymentCreator interface {
	CreatePendingPayment(ctx context.Context, sessionID string, request service.CreatePaymentRequest) (model.Payment, error)
}

type PaymentApplicationHandler struct {
	validator   *validation.Validator
	application paymentCreator
}

func NewPaymentApplicationHandler(
	validator *validation.Validator,
	application paymentCreator,
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

	// Extract session ID from Authorization header for identity-service call
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "authorization header is required", http.StatusUnauthorized)
		return
	}

	// Accept both "Bearer <session-id>" and raw session ID
	var sessionID string
	if len(authHeader) >= 7 && authHeader[:7] == "Bearer " {
		sessionID = authHeader[7:]
	} else {
		sessionID = authHeader
	}

	if sessionID == "" {
		http.Error(w, "session ID is required", http.StatusUnauthorized)
		return
	}

	payment, err := h.application.CreatePendingPayment(
		r.Context(),
		sessionID,
		request,
	)
	if err != nil {
		// Return appropriate status code based on error type using sentinel errors
		if errors.Is(err, identity.ErrInvalidSession) || err.Error() == "session ID is required" {
			http.Error(w, err.Error(), http.StatusUnauthorized)
		} else if errors.Is(err, identity.ErrForbidden) {
			http.Error(w, err.Error(), http.StatusForbidden)
		} else if errors.Is(err, identity.ErrResponsibilityNotFound) {
			http.Error(w, err.Error(), http.StatusNotFound)
		} else if errors.Is(err, identity.ErrResponsibilityConflict) || err.Error() == "payment responsibility is not active" || errors.Is(err, repository.ErrIdempotencyConflict) || err.Error() == "idempotency key was already used with a different request" {
			http.Error(w, err.Error(), http.StatusConflict)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	_ = json.NewEncoder(w).Encode(payment)
}
