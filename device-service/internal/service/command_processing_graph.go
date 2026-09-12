package service

type DeviceCommandProcessingGraph struct {
	Worker  *DeviceCommandWorker
	Runtime *DeviceCommandWorkerRuntime
	Routes  *DeviceCommandWorkerRoutes
}

func NewDeviceCommandProcessingGraph(
	worker *DeviceCommandWorker,
	runtime *DeviceCommandWorkerRuntime,
	routes *DeviceCommandWorkerRoutes,
) *DeviceCommandProcessingGraph {
	return &DeviceCommandProcessingGraph{
		Worker:  worker,
		Runtime: runtime,
		Routes:  routes,
	}
}
