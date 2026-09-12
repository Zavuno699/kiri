package service

type DeviceAPIProductionGraph struct {
	Config  DeviceAPIServerConfig
	Router  *DeviceAPIRootRouter
	Runtime *DeviceAPIRuntime
}

func NewDeviceAPIProductionGraph(
	config DeviceAPIServerConfig,
	router *DeviceAPIRootRouter,
	runtime *DeviceAPIRuntime,
) *DeviceAPIProductionGraph {
	return &DeviceAPIProductionGraph{
		Config:  config,
		Router:  router,
		Runtime: runtime,
	}
}
