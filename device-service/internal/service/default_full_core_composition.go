package service

func NewDefaultDeviceServiceFullCoreComposition(
	config DeviceServiceConfig,
) *DeviceServiceFullCoreComposition {

	runtimeHealth := NewDeviceRuntimeHealth()

	healthComposition := NewDeviceHealthHTTPComposition(
		runtimeHealth,
	)

	healthApplication := healthComposition.Application

	core := NewDefaultDeviceServiceCoreIntegrationFacade()

	dependencies := NewDefaultDeviceServiceDependencies(config)

	productionRuntime := NewDeviceProductionRuntime(
		dependencies,
	)

	return NewDeviceServiceFullCoreComposition(
		NewDeviceHealthHTTPService(
			healthApplication,
			NewDeviceHealthHTTPServerRuntime(
				NewDeviceHealthHTTPServerComposition(
					NewDeviceHealthHTTPRouter(
						NewDeviceHealthHTTPHandler(
							NewDeviceHealthHTTPAdapter(
								healthComposition.Boundary,
							),
						),
					),
				),
			),
		),
		core,
		productionRuntime,
	)
}
