package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"strings"

	"github.com/kirilock/backend/billing-service/internal/service"
)

type PaymentReconciliationHandler struct {
	application *service.PaymentReconciliationApplication
}

func NewPaymentReconciliationHandler(
	application *service.PaymentReconciliationApplication,
) (*PaymentReconciliationHandler, error) {
	if application == nil {
		return nil, errors.New("payment reconciliation application is required")
	}

	return &PaymentReconciliationHandler{
		application: application,
	}, nil
}

func (h *PaymentReconciliationHandler) Reconcile(
	w http.ResponseWriter,
	r *http.Request,
) {
	reference := strings.TrimSpace(
		r.URL.Query().Get("reference"),
	)

	if reference == "" {
		http.Error(
			w,
			"reference is required",
			http.StatusBadRequest,
		)
		return
	}

	payment, err := h.application.Reconcile(
		r.Context(),
		reference,
	)
	if err != nil {
		switch {
		case errors.Is(
			err,
			service.ErrPaymentReconciliationPending,
		):
			writeJSON(w, http.StatusAccepted, payment)
			return

		case errors.Is(
			err,
			service.ErrPaymentReconciliationFailed,
		):
			writeJSON(w, http.StatusConflict, payment)
			return
		}

		http.Error(
			w,
			err.Error(),
			http.StatusBadGateway,
		)
		return
	}

	writeJSON(w, http.StatusOK, payment)
}

func writeJSON(
	w http.ResponseWriter,
	status int,
	value any,
) {
	w.Header().Set(
		"Content-Type",
		"application/json",
	)
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(value)
}
