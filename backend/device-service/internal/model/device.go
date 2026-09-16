package model

import (
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"
)

type DeviceType string

const (
	DeviceTypePadlock    DeviceType = "PADLOCK"
	DeviceTypeGateway    DeviceType = "GATEWAY"
	DeviceTypeController DeviceType = "CONTROLLER"
)

func (t DeviceType) Validate() error {
	switch t {
	case DeviceTypePadlock, DeviceTypeGateway, DeviceTypeController:
		return nil
	default:
		return errors.New("invalid device type")
	}
}

type DeviceLifecycleState string

const (
	DeviceUnregistered DeviceLifecycleState = "UNREGISTERED"
	DeviceInventoried  DeviceLifecycleState = "INVENTORIED"
	DeviceProvisioned  DeviceLifecycleState = "PROVISIONED"
	DeviceAssigned     DeviceLifecycleState = "ASSIGNED"
	DeviceActive       DeviceLifecycleState = "ACTIVE"
	DeviceSuspended    DeviceLifecycleState = "SUSPENDED"
	DeviceMaintenance  DeviceLifecycleState = "MAINTENANCE"
	DeviceRetired      DeviceLifecycleState = "RETIRED"
)

func (s DeviceLifecycleState) Validate() error {
	switch s {
	case DeviceUnregistered, DeviceInventoried, DeviceProvisioned, DeviceAssigned,
		DeviceActive, DeviceSuspended, DeviceMaintenance, DeviceRetired:
		return nil
	default:
		return errors.New("invalid device lifecycle state")
	}
}

// CanTransitionTo validates if a state transition is allowed
func (s DeviceLifecycleState) CanTransitionTo(newState DeviceLifecycleState) error {
	if s == newState {
		return nil // Allow staying in same state
	}

	validTransitions := map[DeviceLifecycleState][]DeviceLifecycleState{
		DeviceUnregistered: {DeviceInventoried, DeviceRetired},
		DeviceInventoried:  {DeviceProvisioned, DeviceRetired},
		DeviceProvisioned:  {DeviceAssigned, DeviceMaintenance, DeviceRetired},
		DeviceAssigned:     {DeviceActive, DeviceMaintenance, DeviceSuspended, DeviceRetired},
		DeviceActive:       {DeviceSuspended, DeviceMaintenance, DeviceRetired},
		DeviceSuspended:    {DeviceActive, DeviceMaintenance, DeviceRetired},
		DeviceMaintenance:  {DeviceActive, DeviceSuspended, DeviceAssigned, DeviceRetired},
		DeviceRetired:      {}, // Terminal state
	}

	allowed, exists := validTransitions[s]
	if !exists {
		return errors.New("unknown current state")
	}

	for _, allowedState := range allowed {
		if newState == allowedState {
			return nil
		}
	}

	return errors.New("invalid state transition")
}

type ConnectivityState string

const (
	ConnectivityOnline  ConnectivityState = "ONLINE"
	ConnectivityOffline ConnectivityState = "OFFLINE"
	ConnectivityUnknown ConnectivityState = "UNKNOWN"
)

func (s ConnectivityState) Validate() error {
	switch s {
	case ConnectivityOnline, ConnectivityOffline, ConnectivityUnknown:
		return nil
	default:
		return errors.New("invalid connectivity state")
	}
}

type DeviceCapabilities struct {
	RemoteLock       bool `json:"remote_lock"`
	RemoteUnlock     bool `json:"remote_unlock"`
	RemoteFreeze     bool `json:"remote_freeze"`
	TamperDetection  bool `json:"tamper_detection"`
	BatteryTelemetry bool `json:"battery_telemetry"`
	BLE              bool `json:"ble"`
	Cellular         bool `json:"cellular"`
}

type CredentialStatus string

const (
	CredentialNone    CredentialStatus = "NONE"
	CredentialPending CredentialStatus = "PENDING"
	CredentialActive  CredentialStatus = "ACTIVE"
	CredentialRevoked CredentialStatus = "REVOKED"
	CredentialExpired CredentialStatus = "EXPIRED"
)

func (c CredentialStatus) Validate() error {
	switch c {
	case CredentialNone, CredentialPending, CredentialActive, CredentialRevoked, CredentialExpired:
		return nil
	default:
		return errors.New("invalid credential status")
	}
}

type Device struct {
	ID                uuid.UUID            `json:"id"`
	DeviceType        DeviceType           `json:"device_type"`
	SerialNumber      string               `json:"serial_number"`
	Model             string               `json:"model"`
	FirmwareVersion   string               `json:"firmware_version"`
	LifecycleState    DeviceLifecycleState `json:"lifecycle_state"`
	ConnectivityState ConnectivityState    `json:"connectivity_state"`
	GatewayID         *uuid.UUID           `json:"gateway_id,omitempty"`
	Capabilities      DeviceCapabilities   `json:"capabilities"`
	LastHeartbeatAt   *time.Time           `json:"last_heartbeat_at,omitempty"`

	// Credential reference (never the actual secret)
	CredentialReference     *string          `json:"credential_reference,omitempty"`
	CredentialStatus        CredentialStatus `json:"credential_status"`
	CredentialProvisionedAt *time.Time       `json:"credential_provisioned_at,omitempty"`
	CredentialProvisionedBy *uuid.UUID       `json:"credential_provisioned_by,omitempty"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Version   int64     `json:"version"`
}

func (d Device) Validate() error {
	if d.ID == uuid.Nil {
		return errors.New("device ID is required")
	}

	if err := d.DeviceType.Validate(); err != nil {
		return err
	}

	if strings.TrimSpace(d.SerialNumber) == "" {
		return errors.New("serial number is required")
	}

	if strings.TrimSpace(d.Model) == "" {
		return errors.New("device model is required")
	}

	if strings.TrimSpace(d.FirmwareVersion) == "" {
		return errors.New("firmware version is required")
	}

	if err := d.LifecycleState.Validate(); err != nil {
		return err
	}

	if err := d.ConnectivityState.Validate(); err != nil {
		return err
	}

	if d.CreatedAt.IsZero() {
		return errors.New("created_at is required")
	}

	if d.UpdatedAt.IsZero() {
		return errors.New("updated_at is required")
	}

	if d.Version < 1 {
		return errors.New("device version must be at least 1")
	}

	if d.UpdatedAt.Before(d.CreatedAt) {
		return errors.New("updated_at cannot be before created_at")
	}

	if err := d.CredentialStatus.Validate(); err != nil {
		return err
	}

	// If credential status is not NONE, reference must be provided
	if d.CredentialStatus != CredentialNone && (d.CredentialReference == nil || *d.CredentialReference == "") {
		return errors.New("credential reference required when credential status is not NONE")
	}

	// If credential status is ACTIVE or PENDING, provisioned timestamp must be set
	if (d.CredentialStatus == CredentialActive || d.CredentialStatus == CredentialPending) && d.CredentialProvisionedAt == nil {
		return errors.New("credential provisioned timestamp required for active/pending credentials")
	}

	return nil
}
