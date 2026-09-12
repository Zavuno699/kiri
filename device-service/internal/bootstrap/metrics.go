package bootstrap

import "github.com/kirilock/backend/device-service/internal/service"

type Metrics struct {
	Registry *service.DeviceMetricsRegistry
}

func NewMetrics() *Metrics {
	return &Metrics{
		Registry: service.NewDeviceMetricsRegistry(),
	}
}

func (m *Metrics) Increment(name string) {
	m.Registry.Increment(name)
}
