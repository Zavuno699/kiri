package service

import "github.com/kirilock/backend/device-service/internal/device"

func NewDefaultDeviceCommandIntegration(
	config DeviceServiceConfig,
) *DeviceCommandIntegration {
	deviceConfig := device.NewConfig(
		"",
		config.DeviceID,
		0,
	)

	graph := device.NewProductionGraph(
		deviceConfig,
	)

	return NewDeviceCommandIntegration(
		device.NewProductionRuntime(
			device.NewRuntimeLifecycle(
				graph.Runtime,
				device.NewRuntimeEvents(
					nil,
					graph.Runtime.State,
				),
				deviceConfig,
			),
			device.NewRuntimeCommandService(
				device.NewCommandExecutor(
					graph.Runtime,
					graph.Runtime.State,
				),
				device.NewRuntimeEvents(
					nil,
					graph.Runtime.State,
				),
			),
			device.NewRuntimeHealthProvider(
				graph.Health,
			),
		),
	)
}
