package service

type DefaultDeviceServiceMetrics struct{}

func NewDefaultDeviceServiceMetrics() *DefaultDeviceServiceMetrics {
	return &DefaultDeviceServiceMetrics{}
}

func (m *DefaultDeviceServiceMetrics) Increment(string) {}
