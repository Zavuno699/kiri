package persistence

type StaticHealth struct {
	Available bool
}

func NewStaticHealth(
	available bool,
) *StaticHealth {
	return &StaticHealth{
		Available: available,
	}
}

func (h *StaticHealth) Healthy() bool {
	return h.Available
}
