package security

import (
	"errors"
	"strings"
)

type IdentityType string

const (
	IdentityTenant   IdentityType = "tenant"
	IdentityLandlord IdentityType = "landlord"
	IdentityService  IdentityType = "service"
	IdentityDevice   IdentityType = "device"
	IdentityOperator IdentityType = "operator"
)

type Identity struct {
	ID          string
	Type        IdentityType
	DisplayName string
	Active      bool
}

var (
	ErrInvalidIdentity  = errors.New("invalid identity")
	ErrInactiveIdentity = errors.New("inactive identity")
)

func (i Identity) Validate() error {
	if strings.TrimSpace(i.ID) == "" {
		return ErrInvalidIdentity
	}

	switch i.Type {
	case IdentityTenant,
		IdentityLandlord,
		IdentityService,
		IdentityDevice,
		IdentityOperator:
	default:
		return ErrInvalidIdentity
	}

	return nil
}

func (i Identity) EnsureActive() error {
	if err := i.Validate(); err != nil {
		return err
	}

	if !i.Active {
		return ErrInactiveIdentity
	}

	return nil
}
