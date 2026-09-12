package service

type ProductionComponents struct {
	Dependencies *DeviceServiceDependencies
	Integrations *DeviceServiceCoreIntegrations
	Worker       *DeviceWorkerApplication
	API          *DeviceAPIProductionGraph
}

func NewProductionComponents(
	dependencies *DeviceServiceDependencies,
	integrations *DeviceServiceCoreIntegrations,
	worker *DeviceWorkerApplication,
	api *DeviceAPIProductionGraph,
) *ProductionComponents {
	return &ProductionComponents{
		Dependencies: dependencies,
		Integrations: integrations,
		Worker:       worker,
		API:          api,
	}
}
