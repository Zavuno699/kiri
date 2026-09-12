package service

type DeviceHealthRuntimeObserver struct {
	State *DeviceRuntimeState
}

func NewDeviceHealthRuntimeObserver(
	state *DeviceRuntimeState,
) *DeviceHealthRuntimeObserver {
	return &DeviceHealthRuntimeObserver{
		State: state,
	}
}

func (o *DeviceHealthRuntimeObserver) Snapshot() DeviceHealthSnapshot {
	status := "stopped"

	if o.State.Running() {
		status = "ready"
	}

	return NewDeviceHealthSnapshot(
		status,
		map[string]bool{
			"runtime": o.State.Running(),
		},
	)
}
