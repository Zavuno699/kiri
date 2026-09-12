package service

type DeviceSystemHealth struct {
	Runtime *DeviceRuntimeState
	Worker  bool
}

func NewDeviceSystemHealth(
	runtime *DeviceRuntimeState,
	worker bool,
) *DeviceSystemHealth {
	return &DeviceSystemHealth{
		Runtime: runtime,
		Worker:  worker,
	}
}

func (h *DeviceSystemHealth) Ready() bool {
	return h.Runtime != nil &&
		h.Runtime.Running() &&
		h.Worker
}
