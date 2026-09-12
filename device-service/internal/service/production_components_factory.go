package service

func NewProductionComponentsFactory() *ProductionComponents {
	config := NewProductionRuntimeConfig()
	factory := NewProductionComponentFactory()

	dependencies := factory.Dependencies(config)
	integrations := factory.Integrations(config)
	worker := factory.Worker(integrations)
	api := factory.API(integrations)

	return NewProductionComponents(
		dependencies,
		integrations,
		worker,
		api,
	)
}
