package handler

import "errors"

var (
	ErrNilHTTPMux                      = errors.New("http mux is required")
	ErrNilPaymentReconciliationHandler = errors.New("payment reconciliation handler is required")
)
