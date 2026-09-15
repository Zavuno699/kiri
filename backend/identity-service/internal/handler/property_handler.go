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

type PropertyHandler struct {
	propertyService *service.PropertyService
	validator       *validation.Validator
}

type CreatePropertyRequest struct {
	PropertyName string `json:"property_name" validate:"required"`
	PropertyType string `json:"property_type"`
	AddressLine1 string `json:"address_line1" validate:"required"`
	AddressLine2 string `json:"address_line2"`
	City         string `json:"city" validate:"required"`
	State        string `json:"state" validate:"required"`
	PostalCode   string `json:"postal_code" validate:"required"`
	Country      string `json:"country"`
	Description  string `json:"description"`
}

type UpdatePropertyRequest struct {
	PropertyName string `json:"property_name" validate:"required"`
	PropertyType string `json:"property_type"`
	AddressLine1 string `json:"address_line1" validate:"required"`
	AddressLine2 string `json:"address_line2"`
	City         string `json:"city" validate:"required"`
	State        string `json:"state" validate:"required"`
	PostalCode   string `json:"postal_code" validate:"required"`
	Country      string `json:"country"`
	Description  string `json:"description"`
}

type PropertyResponse struct {
	ID              uuid.UUID        `json:"id"`
	LandlordProfileID uuid.UUID      `json:"landlord_profile_id"`
	PropertyName     string          `json:"property_name"`
	PropertyType     string          `json:"property_type"`
	AddressLine1     string          `json:"address_line1"`
	AddressLine2     string          `json:"address_line2"`
	City             string          `json:"city"`
	State            string          `json:"state"`
	PostalCode       string          `json:"postal_code"`
	Country          string          `json:"country"`
	Status           model.PropertyStatus `json:"status"`
	TotalUnits       int             `json:"total_units"`
	Description      string          `json:"description"`
	CreatedAt        time.Time       `json:"created_at"`
	UpdatedAt        time.Time       `json:"updated_at"`
}

func NewPropertyHandler(propertyService *service.PropertyService) (*PropertyHandler, error) {
	if propertyService == nil {
		return nil, errors.New("property service is required")
	}

	return &PropertyHandler{
		propertyService: propertyService,
		validator:       validation.New(),
	}, nil
}

func (h *PropertyHandler) CreateProperty(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req CreatePropertyRequest
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

	property := model.Property{
		PropertyName: req.PropertyName,
		PropertyType: req.PropertyType,
		AddressLine1: req.AddressLine1,
		AddressLine2: req.AddressLine2,
		City:         req.City,
		State:        req.State,
		PostalCode:   req.PostalCode,
		Country:      req.Country,
		Description:  req.Description,
	}

	created, err := h.propertyService.CreateProperty(r.Context(), subjectID, property)
	if err != nil {
		if err == service.ErrLandlordNotAuthorized {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := PropertyResponse{
		ID:              created.ID,
		LandlordProfileID: created.LandlordProfileID,
		PropertyName:     created.PropertyName,
		PropertyType:     created.PropertyType,
		AddressLine1:     created.AddressLine1,
		AddressLine2:     created.AddressLine2,
		City:             created.City,
		State:            created.State,
		PostalCode:       created.PostalCode,
		Country:          created.Country,
		Status:           created.Status,
		TotalUnits:       created.TotalUnits,
		Description:      created.Description,
		CreatedAt:        created.CreatedAt,
		UpdatedAt:        created.UpdatedAt,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *PropertyHandler) GetProperty(w http.ResponseWriter, r *http.Request) {
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

	propertyID := r.URL.Query().Get("property_id")
	if propertyID == "" {
		http.Error(w, "property_id required", http.StatusBadRequest)
		return
	}

	id, err := uuid.Parse(propertyID)
	if err != nil {
		http.Error(w, "invalid property id", http.StatusBadRequest)
		return
	}

	property, err := h.propertyService.GetProperty(r.Context(), subjectID, id)
	if err != nil {
		if err == service.ErrUnauthorizedProperty {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	response := PropertyResponse{
		ID:              property.ID,
		LandlordProfileID: property.LandlordProfileID,
		PropertyName:     property.PropertyName,
		PropertyType:     property.PropertyType,
		AddressLine1:     property.AddressLine1,
		AddressLine2:     property.AddressLine2,
		City:             property.City,
		State:            property.State,
		PostalCode:       property.PostalCode,
		Country:          property.Country,
		Status:           property.Status,
		TotalUnits:       property.TotalUnits,
		Description:      property.Description,
		CreatedAt:        property.CreatedAt,
		UpdatedAt:        property.UpdatedAt,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *PropertyHandler) GetLandlordProperties(w http.ResponseWriter, r *http.Request) {
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

	properties, err := h.propertyService.GetLandlordProperties(r.Context(), subjectID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var responses []PropertyResponse
	for _, property := range properties {
		responses = append(responses, PropertyResponse{
			ID:              property.ID,
			LandlordProfileID: property.LandlordProfileID,
			PropertyName:     property.PropertyName,
			PropertyType:     property.PropertyType,
			AddressLine1:     property.AddressLine1,
			AddressLine2:     property.AddressLine2,
			City:             property.City,
			State:            property.State,
			PostalCode:       property.PostalCode,
			Country:          property.Country,
			Status:           property.Status,
			TotalUnits:       property.TotalUnits,
			Description:      property.Description,
			CreatedAt:        property.CreatedAt,
			UpdatedAt:        property.UpdatedAt,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(responses)
}

func (h *PropertyHandler) UpdateProperty(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req UpdatePropertyRequest
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

	propertyID := r.URL.Query().Get("property_id")
	if propertyID == "" {
		http.Error(w, "property_id required", http.StatusBadRequest)
		return
	}

	id, err := uuid.Parse(propertyID)
	if err != nil {
		http.Error(w, "invalid property id", http.StatusBadRequest)
		return
	}

	property := model.Property{
		ID:          id,
		PropertyName: req.PropertyName,
		PropertyType: req.PropertyType,
		AddressLine1: req.AddressLine1,
		AddressLine2: req.AddressLine2,
		City:         req.City,
		State:        req.State,
		PostalCode:   req.PostalCode,
		Country:      req.Country,
		Description:  req.Description,
	}

	if err := h.propertyService.UpdateProperty(r.Context(), subjectID, property); err != nil {
		if err == service.ErrUnauthorizedProperty {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *PropertyHandler) ActivateProperty(w http.ResponseWriter, r *http.Request) {
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

	propertyID := r.URL.Query().Get("property_id")
	if propertyID == "" {
		http.Error(w, "property_id required", http.StatusBadRequest)
		return
	}

	id, err := uuid.Parse(propertyID)
	if err != nil {
		http.Error(w, "invalid property id", http.StatusBadRequest)
		return
	}

	if err := h.propertyService.ActivateProperty(r.Context(), subjectID, id); err != nil {
		if err == service.ErrUnauthorizedProperty {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
