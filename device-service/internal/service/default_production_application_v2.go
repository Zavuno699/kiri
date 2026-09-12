package service

func NewDefaultProductionApplicationV2() *ProductionApplicationV2 {
	return NewProductionApplicationV2(
		NewProductionLifecycleV2(
			NewProductionComponentsFactory(),
		),
	)
}
