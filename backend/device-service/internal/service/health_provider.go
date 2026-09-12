package service

type DeviceHealthProvider interface {
	Name() string
	Healthy() bool
}

type RuntimeHealthProvider struct {
	health *DeviceHealthBoundary
}

func NewRuntimeHealthProvider(
	health *DeviceHealthBoundary,
) *RuntimeHealthProvider {
	return &RuntimeHealthProvider{
		health: health,
	}
}

func (p *RuntimeHealthProvider) Name() string {
	return "runtime"
}

func (p *RuntimeHealthProvider) Healthy() bool {
	return p.health.Status().Healthy
}
