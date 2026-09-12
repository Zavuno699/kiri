package messaging

type ProductionRuntimeAssembly struct {
	Handler *RuntimeConsumerBridge
	Status  RuntimeConsumerStatus
}

func NewProductionRuntimeAssembly(
	router *EventRouter,
) (*ProductionRuntimeAssembly, error) {
	handler, err := NewProductionRuntimeHandler(router)
	if err != nil {
		return nil, err
	}

	return &ProductionRuntimeAssembly{
		Handler: handler,
		Status: RuntimeConsumerStatus{
			Configured: true,
		},
	}, nil
}

func (a *ProductionRuntimeAssembly) Start() {
	if a == nil || a.Handler == nil {
		return
	}

	a.Handler.Start()
	a.Status = NewRuntimeConsumerStatus(a.Handler)
}

func (a *ProductionRuntimeAssembly) Stop() {
	if a == nil || a.Handler == nil {
		return
	}

	a.Handler.Stop()
	a.Status = NewRuntimeConsumerStatus(a.Handler)
}
