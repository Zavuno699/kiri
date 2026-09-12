package handler

import (
	"net/http"

	"github.com/kirilock/backend/shared/validation"
)

func RegisterPaymentRoute(
	mux *http.ServeMux,
	validator *validation.Validator,
	paymentHandler http.Handler,
) {
	mux.Handle(
		"POST /api/v1/payments",
		paymentHandler,
	)

	_ = validator
}
