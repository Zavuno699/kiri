package device

type RuntimeHealthProvider struct {
	Health *Health
}

func NewRuntimeHealthProvider(
	health *Health,
) *RuntimeHealthProvider {
	return &RuntimeHealthProvider{
		Health: health,
	}
}

func (p *RuntimeHealthProvider) Healthy() bool {
	return p.Health.Healthy()
}

func (p *RuntimeHealthProvider) Status() string {
	if p.Healthy() {
		return "ready"
	}

	return "failed"
}
