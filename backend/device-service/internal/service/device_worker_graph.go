package service

type DeviceWorkerGraph struct {
	Processor   *DeviceEventProcessor
	Handler     *DeviceServiceEventHandler
	Worker      *DeviceWorker
	Runtime     *DeviceWorkerRuntime
	Lifecycle   *DeviceWorkerLifecycle
	Application *DeviceWorkerApplication
}

func NewDeviceWorkerGraph(
	processor *DeviceEventProcessor,
	handler *DeviceServiceEventHandler,
	worker *DeviceWorker,
	runtime *DeviceWorkerRuntime,
	lifecycle *DeviceWorkerLifecycle,
	application *DeviceWorkerApplication,
) *DeviceWorkerGraph {
	return &DeviceWorkerGraph{
		Processor:   processor,
		Handler:     handler,
		Worker:      worker,
		Runtime:     runtime,
		Lifecycle:   lifecycle,
		Application: application,
	}
}
