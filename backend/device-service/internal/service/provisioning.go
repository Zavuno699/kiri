package service

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/device-service/internal/model"
	"github.com/kirilock/backend/device-service/internal/repository"
)

type ProvisionDeviceRequest struct {
	DeviceType      model.DeviceType
	SerialNumber    string
	Model           string
	FirmwareVersion string
	GatewayID       *uuid.UUID
	Capabilities    model.DeviceCapabilities
}

func (r ProvisionDeviceRequest) Validate() error {
	if err := r.DeviceType.Validate(); err != nil {
		return err
	}

	if strings.TrimSpace(r.SerialNumber) == "" {
		return errors.New("serial number is required")
	}

	if strings.TrimSpace(r.Model) == "" {
		return errors.New("device model is required")
	}

	if strings.TrimSpace(r.FirmwareVersion) == "" {
		return errors.New("device firmware version is required")
	}

	if r.DeviceType == model.DeviceTypeGateway && r.GatewayID != nil {
		return errors.New("gateway devices cannot belong to another gateway")
	}

	if r.DeviceType != model.DeviceTypeGateway && r.GatewayID == nil {
		return errors.New("non-gateway devices require a gateway")
	}

	return nil
}

type ProvisioningApplication struct {
	devices repository.ProvisioningRepository
}

func NewProvisioningApplication(
	devices repository.ProvisioningRepository,
) (*ProvisioningApplication, error) {
	if devices == nil {
		return nil, errors.New("provisioning repository is required")
	}

	return &ProvisioningApplication{
		devices: devices,
	}, nil
}

func (a *ProvisioningApplication) Provision(
	ctx context.Context,
	request ProvisionDeviceRequest,
	now time.Time,
) (model.Device, error) {
	if ctx == nil {
		return model.Device{}, errors.New("context is required")
	}

	if err := request.Validate(); err != nil {
		return model.Device{}, err
	}

	if now.IsZero() {
		return model.Device{}, errors.New("provisioning time is required")
	}

	now = now.UTC()

	device := model.Device{
		ID:                uuid.New(),
		DeviceType:        request.DeviceType,
		SerialNumber:      strings.TrimSpace(request.SerialNumber),
		Model:             strings.TrimSpace(request.Model),
		FirmwareVersion:   strings.TrimSpace(request.FirmwareVersion),
		LifecycleState:    model.DeviceProvisioning,
		ConnectivityState: model.ConnectivityUnknown,
		GatewayID:         request.GatewayID,
		Capabilities:      request.Capabilities,
		CreatedAt:         now,
		UpdatedAt:         now,
		Version:           1,
	}

	if err := device.Validate(); err != nil {
		return model.Device{}, err
	}

	if err := a.devices.ProvisionDevice(ctx, device); err != nil {
		if errors.Is(err, repository.ErrDeviceNotFound) {
			return model.Device{}, err
		}
		return model.Device{}, err
	}

	return device, nil
}
