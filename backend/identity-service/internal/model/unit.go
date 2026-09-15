package model

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type UnitLifecycle string

const (
	UnitAvailable   UnitLifecycle = "AVAILABLE"
	UnitOccupied    UnitLifecycle = "OCCUPIED"
	UnitReserved    UnitLifecycle = "RESERVED"
	UnitMaintenance UnitLifecycle = "MAINTENANCE"
	UnitInactive    UnitLifecycle = "INACTIVE"
)

type Unit struct {
	ID          uuid.UUID
	PropertyID  uuid.UUID
	UnitNumber  string
	UnitType    string
	FloorNumber int
	SquareFeet  int
	Bedrooms    int
	Bathrooms   int
	Lifecycle   UnitLifecycle
	Description string
	Amenities   []string
	CreatedAt   time.Time
	UpdatedAt   time.Time
	Version     int
}

func (u Unit) Validate() error {
	if u.ID == uuid.Nil {
		return errors.New("id is required")
	}
	if u.PropertyID == uuid.Nil {
		return errors.New("property_id is required")
	}
	if u.UnitNumber == "" {
		return errors.New("unit_number is required")
	}

	switch u.Lifecycle {
	case UnitAvailable, UnitOccupied, UnitReserved, UnitMaintenance, UnitInactive:
		// Valid
	default:
		return errors.New("invalid unit lifecycle")
	}

	if u.SquareFeet < 0 {
		return errors.New("square_feet must be >= 0")
	}

	if u.Bedrooms < 0 {
		return errors.New("bedrooms must be >= 0")
	}

	if u.Bathrooms < 0 {
		return errors.New("bathrooms must be >= 0")
	}

	if u.Version < 1 {
		return errors.New("version must be >= 1")
	}

	return nil
}

func (u Unit) IsAvailable() bool {
	return u.Lifecycle == UnitAvailable
}

func (u Unit) IsOccupied() bool {
	return u.Lifecycle == UnitOccupied
}
