package service

type DeviceProductionHTTPComposition struct {
	Dependencies *DeviceProductionHTTPDependencies
	Health       *DeviceHealthHTTPComposition
	Server       *DeviceNetHTTPServer
	Lifecycle    *DeviceHealthHTTPProductionLifecycle
	Bootstrap    *DeviceHealthHTTPProductionBootstrap
}

func NewDeviceProductionHTTPComposition(
	dependencies *DeviceProductionHTTPDependencies,
) *DeviceProductionHTTPComposition {
	health := NewDeviceHealthHTTPComposition(
		dependencies.RuntimeHealth,
	)

	server := NewDeviceNetHTTPServerFromHealth(
		DeviceHTTPServerConfig{
			Address: "",
			Port:    dependencies.Config.HTTPPort,
		},
		health,
	)

	productionServer := NewDeviceHealthHTTPProductionServer(
		server,
	)

	lifecycle := NewDeviceHealthHTTPProductionLifecycle(
		productionServer,
	)

	bootstrap := NewDeviceHealthHTTPProductionBootstrap(
		lifecycle,
	)

	return &DeviceProductionHTTPComposition{
		Dependencies: dependencies,
		Health:       health,
		Server:       server,
		Lifecycle:    lifecycle,
		Bootstrap:    bootstrap,
	}
}
