package service

import "time"

type DeviceHealthStatus struct {
	Healthy   bool
	StartedAt time.Time
}

type DeviceHealthBoundary struct {
	health *DeviceRuntimeHealth
}

func NewDeviceHealthBoundary(
	health *DeviceRuntimeHealth,
) *DeviceHealthBoundary {
	return &DeviceHealthBoundary{
		health: health,
	}
}

func (b *DeviceHealthBoundary) Status() DeviceHealthStatus {
	startedAt, err := b.health.StartedAt()

	if err != nil {
		return DeviceHealthStatus{
			Healthy: false,
		}
	}

	return DeviceHealthStatus{
		Healthy:   true,
		StartedAt: startedAt,
	}
}
