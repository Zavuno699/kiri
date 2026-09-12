package service

type DeviceMetricsAdapter struct {
	Registry *DeviceMetricsRegistry
}

func NewDeviceMetricsAdapter(
	registry *DeviceMetricsRegistry,
) *DeviceMetricsAdapter {
	return &DeviceMetricsAdapter{
		Registry: registry,
	}
}

func (m *DeviceMetricsAdapter) Increment(name string) {
	m.Registry.Increment(name)
}
