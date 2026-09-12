package service

type DeviceProductionDependencyGraph struct {
	Factory        *DeviceInfrastructureFactory
	Dependencies   *DeviceInfrastructureDependencies
	Infrastructure *DeviceInfrastructureRuntime
	Owner          *DeviceInfrastructureOwner
}

func NewDeviceProductionDependencyGraph(
	factory *DeviceInfrastructureFactory,
	dependencies *DeviceInfrastructureDependencies,
	infrastructure *DeviceInfrastructureRuntime,
	owner *DeviceInfrastructureOwner,
) *DeviceProductionDependencyGraph {
	return &DeviceProductionDependencyGraph{
		Factory:        factory,
		Dependencies:   dependencies,
		Infrastructure: infrastructure,
		Owner:          owner,
	}
}
