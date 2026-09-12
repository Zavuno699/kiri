package service

import (
	"github.com/kirilock/backend/device-service/internal/device"
)

type DeviceRuntimeHealthBridge struct {
	Provider *device.RuntimeHealthProvider
}

func NewDeviceRuntimeHealthBridge(
	provider *device.RuntimeHealthProvider,
) *DeviceRuntimeHealthBridge {
	return &DeviceRuntimeHealthBridge{
		Provider: provider,
	}
}

func (b *DeviceRuntimeHealthBridge) Healthy() bool {
	return b.Provider.Healthy()
}

func (b *DeviceRuntimeHealthBridge) Status() string {
	return b.Provider.Status()
}
