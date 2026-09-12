package bootstrap

import (
	"github.com/kirilock/backend/device-service/internal/device"
	"github.com/kirilock/backend/device-service/internal/service"
)

func NewDeviceTransport(
	config Config,
) service.DeviceServiceDeviceTransport {
	deviceConfig := device.NewConfig(
		config.DeviceAddress,
		config.ServiceID,
		config.DeviceTimeoutMS,
	)

	graph := device.NewDefaultProductionGraph(
		deviceConfig,
	)

	return service.NewDeviceTransportIntegrationAdapter(
		graph.Runtime,
		deviceConfig,
	)
}
