package model

import (
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"
)

type Gateway struct {
	ID                uuid.UUID            `json:"id"`
	SerialNumber      string               `json:"serial_number"`
	Model             string               `json:"model"`
	FirmwareVersion   string               `json:"firmware_version"`
	LifecycleState    DeviceLifecycleState `json:"lifecycle_state"`
	ConnectivityState ConnectivityState    `json:"connectivity_state"`
	LastHeartbeatAt   *time.Time           `json:"last_heartbeat_at,omitempty"`
	CreatedAt         time.Time            `json:"created_at"`
	UpdatedAt         time.Time            `json:"updated_at"`
	Version           int64                `json:"version"`
}

func (g Gateway) Validate() error {
	if g.ID == uuid.Nil {
		return errors.New("gateway ID is required")
	}

	if strings.TrimSpace(g.SerialNumber) == "" {
		return errors.New("gateway serial number is required")
	}

	if strings.TrimSpace(g.Model) == "" {
		return errors.New("gateway model is required")
	}

	if strings.TrimSpace(g.FirmwareVersion) == "" {
		return errors.New("gateway firmware version is required")
	}

	if err := g.LifecycleState.Validate(); err != nil {
		return err
	}

	if err := g.ConnectivityState.Validate(); err != nil {
		return err
	}

	if g.CreatedAt.IsZero() {
		return errors.New("created_at is required")
	}

	if g.UpdatedAt.IsZero() {
		return errors.New("updated_at is required")
	}

	if g.Version < 1 {
		return errors.New("gateway version must be at least 1")
	}

	if g.UpdatedAt.Before(g.CreatedAt) {
		return errors.New("updated_at cannot be before created_at")
	}

	return nil
}
