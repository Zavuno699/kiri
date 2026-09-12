package service

type DeviceOperationalRuntime struct {
	State    *DeviceRuntimeState
	Startup  *DeviceStartupCoordinator
	Shutdown *DeviceShutdownCoordinator
}

func NewDeviceOperationalRuntime(
	state *DeviceRuntimeState,
	startup *DeviceStartupCoordinator,
	shutdown *DeviceShutdownCoordinator,
) *DeviceOperationalRuntime {
	return &DeviceOperationalRuntime{
		State:    state,
		Startup:  startup,
		Shutdown: shutdown,
	}
}
