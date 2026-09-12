package service

type DeviceWorkerIntegrationGraph struct {
	Worker      *DeviceWorkerService
	MessageBus  *MessageBusRuntime
	Integration *DeviceServiceIntegrationRuntime
}

func NewDeviceWorkerIntegrationGraph(
	worker *DeviceWorkerService,
	messageBus *MessageBusRuntime,
	integration *DeviceServiceIntegrationRuntime,
) *DeviceWorkerIntegrationGraph {
	return &DeviceWorkerIntegrationGraph{
		Worker:      worker,
		MessageBus:  messageBus,
		Integration: integration,
	}
}
