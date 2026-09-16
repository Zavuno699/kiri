package model

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type PropertyStatus string

const (
	PropertyActive              PropertyStatus = "ACTIVE"
	PropertyInactive            PropertyStatus = "INACTIVE"
	PropertySuspended           PropertyStatus = "SUSPENDED"
	PropertyPendingVerification PropertyStatus = "PENDING_VERIFICATION"
)

type Property struct {
	ID                uuid.UUID
	LandlordProfileID uuid.UUID
	PropertyName      string
	PropertyType      string
	AddressLine1      string
	AddressLine2      string
	City              string
	State             string
	PostalCode        string
	Country           string
	Timezone          string
	Status            PropertyStatus
	TotalUnits        int
	Description       string
	CreatedAt         time.Time
	UpdatedAt         time.Time
	Version           int
}

func (p Property) Validate() error {
	if p.ID == uuid.Nil {
		return errors.New("id is required")
	}
	if p.LandlordProfileID == uuid.Nil {
		return errors.New("landlord_profile_id is required")
	}
	if p.PropertyName == "" {
		return errors.New("property_name is required")
	}
	if p.AddressLine1 == "" {
		return errors.New("address_line1 is required")
	}
	if p.City == "" {
		return errors.New("city is required")
	}
	if p.State == "" {
		return errors.New("state is required")
	}
	if p.PostalCode == "" {
		return errors.New("postal_code is required")
	}

	switch p.Status {
	case PropertyActive, PropertyInactive, PropertySuspended, PropertyPendingVerification:
		// Valid
	default:
		return errors.New("invalid property status")
	}

	if p.TotalUnits < 0 {
		return errors.New("total_units must be >= 0")
	}

	if p.Version < 1 {
		return errors.New("version must be >= 1")
	}

	return nil
}

func (p Property) IsActive() bool {
	return p.Status == PropertyActive
}
