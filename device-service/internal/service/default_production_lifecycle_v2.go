package service

func NewDefaultProductionLifecycleV2() *ProductionLifecycleV2 {
	return NewProductionLifecycleV2(
		NewProductionComponentsFactory(),
	)
}
