package handler

import "net/http"

func RegisterPaymentReconciliationRoute(
	mux *http.ServeMux,
	handler *PaymentReconciliationHandler,
) error {
	if mux == nil {
		return ErrNilHTTPMux
	}

	if handler == nil {
		return ErrNilPaymentReconciliationHandler
	}

	mux.Handle(
		"POST /api/v1/payments/reconcile",
		http.HandlerFunc(handler.Reconcile),
	)

	return nil
}
