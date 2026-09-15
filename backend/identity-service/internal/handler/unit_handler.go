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

type UnitHandler struct {
	unitService *service.UnitService
	validator   *validation.Validator
}

type CreateUnitRequest struct {
	PropertyID  uuid.UUID `json:"property_id" validate:"required"`
	UnitNumber  string    `json:"unit_number" validate:"required"`
	UnitType    string    `json:"unit_type"`
	FloorNumber int       `json:"floor_number"`
	SquareFeet  int       `json:"square_feet"`
	Bedrooms    int       `json:"bedrooms"`
	Bathrooms   int       `json:"bathrooms"`
	Description string    `json:"description"`
	Amenities   []string  `json:"amenities"`
}

type UpdateUnitRequest struct {
	UnitNumber  string   `json:"unit_number" validate:"required"`
	UnitType    string   `json:"unit_type"`
	FloorNumber int      `json:"floor_number"`
	SquareFeet  int      `json:"square_feet"`
	Bedrooms    int      `json:"bedrooms"`
	Bathrooms   int      `json:"bathrooms"`
	Description string   `json:"description"`
	Amenities   []string `json:"amenities"`
}

type UnitResponse struct {
	ID          uuid.UUID       `json:"id"`
	PropertyID  uuid.UUID       `json:"property_id"`
	UnitNumber  string          `json:"unit_number"`
	UnitType    string          `json:"unit_type"`
	FloorNumber int             `json:"floor_number"`
	SquareFeet  int             `json:"square_feet"`
	Bedrooms    int             `json:"bedrooms"`
	Bathrooms   int             `json:"bathrooms"`
	Lifecycle   model.UnitLifecycle `json:"lifecycle"`
	Description string          `json:"description"`
	Amenities   []string        `json:"amenities"`
	CreatedAt   time.Time       `json:"created_at"`
	UpdatedAt   time.Time       `json:"updated_at"`
}

func NewUnitHandler(unitService *service.UnitService) (*UnitHandler, error) {
	if unitService == nil {
		return nil, errors.New("unit service is required")
	}

	return &UnitHandler{
		unitService: unitService,
		validator:   validation.New(),
	}, nil
}

func (h *UnitHandler) CreateUnit(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req CreateUnitRequest
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

	unit := model.Unit{
		PropertyID:  req.PropertyID,
		UnitNumber:  req.UnitNumber,
		UnitType:    req.UnitType,
		FloorNumber: req.FloorNumber,
		SquareFeet:  req.SquareFeet,
		Bedrooms:    req.Bedrooms,
		Bathrooms:   req.Bathrooms,
		Description: req.Description,
		Amenities:   req.Amenities,
	}

	created, err := h.unitService.CreateUnit(r.Context(), subjectID, unit)
	if err != nil {
		if err == service.ErrLandlordNotAuthorized || err == service.ErrUnauthorizedProperty {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := UnitResponse{
		ID:          created.ID,
		PropertyID:  created.PropertyID,
		UnitNumber:  created.UnitNumber,
		UnitType:    created.UnitType,
		FloorNumber: created.FloorNumber,
		SquareFeet:  created.SquareFeet,
		Bedrooms:    created.Bedrooms,
		Bathrooms:   created.Bathrooms,
		Lifecycle:   created.Lifecycle,
		Description: created.Description,
		Amenities:   created.Amenities,
		CreatedAt:   created.CreatedAt,
		UpdatedAt:   created.UpdatedAt,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *UnitHandler) GetUnit(w http.ResponseWriter, r *http.Request) {
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

	unitID := r.URL.Query().Get("unit_id")
	if unitID == "" {
		http.Error(w, "unit_id required", http.StatusBadRequest)
		return
	}

	id, err := uuid.Parse(unitID)
	if err != nil {
		http.Error(w, "invalid unit id", http.StatusBadRequest)
		return
	}

	unit, err := h.unitService.GetUnit(r.Context(), subjectID, id)
	if err != nil {
		if err == service.ErrUnauthorizedUnit {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	response := UnitResponse{
		ID:          unit.ID,
		PropertyID:  unit.PropertyID,
		UnitNumber:  unit.UnitNumber,
		UnitType:    unit.UnitType,
		FloorNumber: unit.FloorNumber,
		SquareFeet:  unit.SquareFeet,
		Bedrooms:    unit.Bedrooms,
		Bathrooms:   unit.Bathrooms,
		Lifecycle:   unit.Lifecycle,
		Description: unit.Description,
		Amenities:   unit.Amenities,
		CreatedAt:   unit.CreatedAt,
		UpdatedAt:   unit.UpdatedAt,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *UnitHandler) GetPropertyUnits(w http.ResponseWriter, r *http.Request) {
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

	units, err := h.unitService.GetPropertyUnits(r.Context(), subjectID, id)
	if err != nil {
		if err == service.ErrUnauthorizedProperty {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var responses []UnitResponse
	for _, unit := range units {
		responses = append(responses, UnitResponse{
			ID:          unit.ID,
			PropertyID:  unit.PropertyID,
			UnitNumber:  unit.UnitNumber,
			UnitType:    unit.UnitType,
			FloorNumber: unit.FloorNumber,
			SquareFeet:  unit.SquareFeet,
			Bedrooms:    unit.Bedrooms,
			Bathrooms:   unit.Bathrooms,
			Lifecycle:   unit.Lifecycle,
			Description: unit.Description,
			Amenities:   unit.Amenities,
			CreatedAt:   unit.CreatedAt,
			UpdatedAt:   unit.UpdatedAt,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(responses)
}

func (h *UnitHandler) GetAvailableUnits(w http.ResponseWriter, r *http.Request) {
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

	units, err := h.unitService.GetAvailableUnits(r.Context(), subjectID, id)
	if err != nil {
		if err == service.ErrUnauthorizedProperty {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var responses []UnitResponse
	for _, unit := range units {
		responses = append(responses, UnitResponse{
			ID:          unit.ID,
			PropertyID:  unit.PropertyID,
			UnitNumber:  unit.UnitNumber,
			UnitType:    unit.UnitType,
			FloorNumber: unit.FloorNumber,
			SquareFeet:  unit.SquareFeet,
			Bedrooms:    unit.Bedrooms,
			Bathrooms:   unit.Bathrooms,
			Lifecycle:   unit.Lifecycle,
			Description: unit.Description,
			Amenities:   unit.Amenities,
			CreatedAt:   unit.CreatedAt,
			UpdatedAt:   unit.UpdatedAt,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(responses)
}

func (h *UnitHandler) UpdateUnit(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req UpdateUnitRequest
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

	unitID := r.URL.Query().Get("unit_id")
	if unitID == "" {
		http.Error(w, "unit_id required", http.StatusBadRequest)
		return
	}

	id, err := uuid.Parse(unitID)
	if err != nil {
		http.Error(w, "invalid unit id", http.StatusBadRequest)
		return
	}

	unit := model.Unit{
		ID:          id,
		UnitNumber:  req.UnitNumber,
		UnitType:    req.UnitType,
		FloorNumber: req.FloorNumber,
		SquareFeet:  req.SquareFeet,
		Bedrooms:    req.Bedrooms,
		Bathrooms:   req.Bathrooms,
		Description: req.Description,
		Amenities:   req.Amenities,
	}

	if err := h.unitService.UpdateUnit(r.Context(), subjectID, unit); err != nil {
		if err == service.ErrUnauthorizedUnit {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *UnitHandler) UpdateUnitLifecycle(w http.ResponseWriter, r *http.Request) {
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

	unitID := r.URL.Query().Get("unit_id")
	if unitID == "" {
		http.Error(w, "unit_id required", http.StatusBadRequest)
		return
	}

	id, err := uuid.Parse(unitID)
	if err != nil {
		http.Error(w, "invalid unit id", http.StatusBadRequest)
		return
	}

	lifecycle := r.URL.Query().Get("lifecycle")
	if lifecycle == "" {
		http.Error(w, "lifecycle required", http.StatusBadRequest)
		return
	}

	if err := h.unitService.UpdateUnitLifecycle(r.Context(), subjectID, id, model.UnitLifecycle(lifecycle)); err != nil {
		if err == service.ErrUnauthorizedUnit {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
