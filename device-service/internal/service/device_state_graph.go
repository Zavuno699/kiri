package service

type DeviceStateGraph struct {
	Query     *DeviceStateQueryApplication
	Lifecycle *DeviceLifecycleApplication
	Command   *DeviceCommandStateOrchestrator
}

func NewDeviceStateGraph(
	query *DeviceStateQueryApplication,
	lifecycle *DeviceLifecycleApplication,
	command *DeviceCommandStateOrchestrator,
) *DeviceStateGraph {
	return &DeviceStateGraph{
		Query:     query,
		Lifecycle: lifecycle,
		Command:   command,
	}
}
