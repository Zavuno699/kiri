package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/google/uuid"
	sharedhttp "github.com/kirilock/backend/shared/http"
	"github.com/kirilock/backend/shared/validation"

	"github.com/kirilock/backend/identity-service/internal/middleware"
	"github.com/kirilock/backend/identity-service/internal/model"
	"github.com/kirilock/backend/identity-service/internal/service"
)

type PaymentHandler struct {
	paymentService *service.PaymentService
	validator      *validation.Validator
}

type CreatePaymentAccountRequest struct {
	AccountName        string                `json:"account_name" validate:"required"`
	Provider           model.PaymentProvider `json:"provider" validate:"required"`
	ProviderAccountID  string                `json:"provider_account_id"`
	ProviderCustomerID string                `json:"provider_customer_id"`
	Currency           string                `json:"currency"`
	Notes              string                `json:"notes"`
}

type CreatePaymentResponsibilityRequest struct {
	TenantSubjectID         uuid.UUID `json:"tenant_subject_id" validate:"required"`
	PaymentAccountID        uuid.UUID `json:"payment_account_id" validate:"required"`
	TenancyID               uuid.UUID `json:"tenancy_id" validate:"required"`
	ResponsibleForRent      bool      `json:"responsible_for_rent"`
	ResponsibleForUtilities bool      `json:"responsible_for_utilities"`
	ResponsibleForFees      bool      `json:"responsible_for_fees"`
	MonthlyRentAmountMinor  int64     `json:"monthly_rent_amount_minor"`
	Notes                   string    `json:"notes"`
}

type PaymentAccountResponse struct {
	ID                 uuid.UUID                  `json:"id"`
	LandlordProfileID  uuid.UUID                  `json:"landlord_profile_id"`
	AccountName        string                     `json:"account_name"`
	Provider           model.PaymentProvider      `json:"provider"`
	ProviderAccountID  string                     `json:"provider_account_id"`
	ProviderCustomerID string                     `json:"provider_customer_id"`
	Status             model.PaymentAccountStatus `json:"status"`
	Currency           string                     `json:"currency"`
	Notes              string                     `json:"notes"`
	CreatedAt          time.Time                  `json:"created_at"`
	UpdatedAt          time.Time                  `json:"updated_at"`
}

type PaymentResponsibilityResponse struct {
	ID                      uuid.UUID                         `json:"id"`
	TenantSubjectID         uuid.UUID                         `json:"tenant_subject_id"`
	PaymentAccountID        uuid.UUID                         `json:"payment_account_id"`
	TenancyID               uuid.UUID                         `json:"tenancy_id"`
	Status                  model.PaymentResponsibilityStatus `json:"status"`
	ResponsibleForRent      bool                              `json:"responsible_for_rent"`
	ResponsibleForUtilities bool                              `json:"responsible_for_utilities"`
	ResponsibleForFees      bool                              `json:"responsible_for_fees"`
	MonthlyRentAmountMinor  int64                             `json:"monthly_rent_amount_minor"`
	Notes                   string                            `json:"notes"`
	CreatedAt               time.Time                         `json:"created_at"`
	UpdatedAt               time.Time                         `json:"updated_at"`
}

func NewPaymentHandler(paymentService *service.PaymentService) (*PaymentHandler, error) {
	if paymentService == nil {
		return nil, errors.New("payment service is required")
	}

	return &PaymentHandler{
		paymentService: paymentService,
		validator:      validation.New(),
	}, nil
}

func (h *PaymentHandler) CreatePaymentAccount(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req CreatePaymentAccountRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	subjectID, err := uuid.Parse(principal.Subject)
	if err != nil {
		http.Error(w, "invalid subject id", http.StatusBadRequest)
		return
	}

	account := model.PaymentAccount{
		AccountName:        req.AccountName,
		Provider:           req.Provider,
		ProviderAccountID:  req.ProviderAccountID,
		ProviderCustomerID: req.ProviderCustomerID,
		Currency:           req.Currency,
		Notes:              req.Notes,
	}

	created, err := h.paymentService.CreatePaymentAccount(r.Context(), subjectID, account)
	if err != nil {
		if err == service.ErrLandlordNotAuthorized {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := PaymentAccountResponse{
		ID:                 created.ID,
		LandlordProfileID:  created.LandlordProfileID,
		AccountName:        created.AccountName,
		Provider:           created.Provider,
		ProviderAccountID:  created.ProviderAccountID,
		ProviderCustomerID: created.ProviderCustomerID,
		Status:             created.Status,
		Currency:           created.Currency,
		Notes:              created.Notes,
		CreatedAt:          created.CreatedAt,
		UpdatedAt:          created.UpdatedAt,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *PaymentHandler) GetPaymentAccount(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	subjectID, err := uuid.Parse(principal.Subject)
	if err != nil {
		http.Error(w, "invalid subject id", http.StatusBadRequest)
		return
	}

	accountID := r.URL.Query().Get("account_id")
	if accountID == "" {
		http.Error(w, "account_id required", http.StatusBadRequest)
		return
	}

	id, err := uuid.Parse(accountID)
	if err != nil {
		http.Error(w, "invalid account id", http.StatusBadRequest)
		return
	}

	account, err := h.paymentService.GetPaymentAccount(r.Context(), subjectID, id)
	if err != nil {
		if err == service.ErrUnauthorizedPayment {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	response := PaymentAccountResponse{
		ID:                 account.ID,
		LandlordProfileID:  account.LandlordProfileID,
		AccountName:        account.AccountName,
		Provider:           account.Provider,
		ProviderAccountID:  account.ProviderAccountID,
		ProviderCustomerID: account.ProviderCustomerID,
		Status:             account.Status,
		Currency:           account.Currency,
		Notes:              account.Notes,
		CreatedAt:          account.CreatedAt,
		UpdatedAt:          account.UpdatedAt,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *PaymentHandler) GetLandlordPaymentAccounts(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	subjectID, err := uuid.Parse(principal.Subject)
	if err != nil {
		http.Error(w, "invalid subject id", http.StatusBadRequest)
		return
	}

	accounts, err := h.paymentService.GetLandlordPaymentAccounts(r.Context(), subjectID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var responses []PaymentAccountResponse
	for _, account := range accounts {
		responses = append(responses, PaymentAccountResponse{
			ID:                 account.ID,
			LandlordProfileID:  account.LandlordProfileID,
			AccountName:        account.AccountName,
			Provider:           account.Provider,
			ProviderAccountID:  account.ProviderAccountID,
			ProviderCustomerID: account.ProviderCustomerID,
			Status:             account.Status,
			Currency:           account.Currency,
			Notes:              account.Notes,
			CreatedAt:          account.CreatedAt,
			UpdatedAt:          account.UpdatedAt,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(responses)
}

func (h *PaymentHandler) ActivatePaymentAccount(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	subjectID, err := uuid.Parse(principal.Subject)
	if err != nil {
		http.Error(w, "invalid subject id", http.StatusBadRequest)
		return
	}

	accountID := r.URL.Query().Get("account_id")
	if accountID == "" {
		http.Error(w, "account_id required", http.StatusBadRequest)
		return
	}

	id, err := uuid.Parse(accountID)
	if err != nil {
		http.Error(w, "invalid account id", http.StatusBadRequest)
		return
	}

	if err := h.paymentService.ActivatePaymentAccount(r.Context(), subjectID, id); err != nil {
		if err == service.ErrUnauthorizedPayment {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *PaymentHandler) CreatePaymentResponsibility(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req CreatePaymentResponsibilityRequest
	if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	if err := h.validator.Error(req); err != nil {
		sharedhttp.WriteValidationError(w, r, err)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	subjectID, err := uuid.Parse(principal.Subject)
	if err != nil {
		http.Error(w, "invalid subject id", http.StatusBadRequest)
		return
	}

	responsibility := model.PaymentResponsibility{
		TenantSubjectID:         req.TenantSubjectID,
		PaymentAccountID:        req.PaymentAccountID,
		TenancyID:               req.TenancyID,
		ResponsibleForRent:      req.ResponsibleForRent,
		ResponsibleForUtilities: req.ResponsibleForUtilities,
		ResponsibleForFees:      req.ResponsibleForFees,
		MonthlyRentAmountMinor:  req.MonthlyRentAmountMinor,
		Notes:                   req.Notes,
	}

	created, err := h.paymentService.CreatePaymentResponsibility(r.Context(), subjectID, responsibility)
	if err != nil {
		if err == service.ErrLandlordNotAuthorized || err == service.ErrUnauthorizedPayment {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := PaymentResponsibilityResponse{
		ID:                      created.ID,
		TenantSubjectID:         created.TenantSubjectID,
		PaymentAccountID:        created.PaymentAccountID,
		TenancyID:               created.TenancyID,
		Status:                  created.Status,
		ResponsibleForRent:      created.ResponsibleForRent,
		ResponsibleForUtilities: created.ResponsibleForUtilities,
		ResponsibleForFees:      created.ResponsibleForFees,
		MonthlyRentAmountMinor:  created.MonthlyRentAmountMinor,
		Notes:                   created.Notes,
		CreatedAt:               created.CreatedAt,
		UpdatedAt:               created.UpdatedAt,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *PaymentHandler) GetTenantPaymentResponsibility(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	principal, err := middleware.PrincipalFromContext(r.Context())
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	subjectID, err := uuid.Parse(principal.Subject)
	if err != nil {
		http.Error(w, "invalid subject id", http.StatusBadRequest)
		return
	}

	responsibility, err := h.paymentService.GetTenantPaymentResponsibility(r.Context(), subjectID)
	if err != nil {
		http.Error(w, "payment responsibility not found", http.StatusNotFound)
		return
	}

	response := PaymentResponsibilityResponse{
		ID:                      responsibility.ID,
		TenantSubjectID:         responsibility.TenantSubjectID,
		PaymentAccountID:        responsibility.PaymentAccountID,
		TenancyID:               responsibility.TenancyID,
		Status:                  responsibility.Status,
		ResponsibleForRent:      responsibility.ResponsibleForRent,
		ResponsibleForUtilities: responsibility.ResponsibleForUtilities,
		ResponsibleForFees:      responsibility.ResponsibleForFees,
		MonthlyRentAmountMinor:  responsibility.MonthlyRentAmountMinor,
		Notes:                   responsibility.Notes,
		CreatedAt:               responsibility.CreatedAt,
		UpdatedAt:               responsibility.UpdatedAt,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
