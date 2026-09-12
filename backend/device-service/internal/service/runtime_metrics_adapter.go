package service

type RuntimeMetricsAdapter struct {
	Metrics DeviceServiceMetrics
}

func NewRuntimeMetricsAdapter(
	metrics DeviceServiceMetrics,
) *RuntimeMetricsAdapter {
	return &RuntimeMetricsAdapter{
		Metrics: metrics,
	}
}

func (m *RuntimeMetricsAdapter) RuntimeStarted() {
	m.Metrics.Increment("device_service_runtime_started")
}

func (m *RuntimeMetricsAdapter) RuntimeStopped() {
	m.Metrics.Increment("device_service_runtime_stopped")
}
