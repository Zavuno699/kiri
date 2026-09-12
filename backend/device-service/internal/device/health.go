package device

type Health struct {
	State *State
}

func NewHealth(state *State) *Health {
	return &Health{
		State: state,
	}
}

func (h *Health) Healthy() bool {
	return h.State.Connected() && h.State.Status() != "failed"
}
