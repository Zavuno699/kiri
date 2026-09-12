package service

import "time"

func NewDefaultProductionSignalRunnerV2() *ProductionSignalRunnerV2 {
	return NewProductionSignalRunnerV2(
		NewDefaultProductionApplicationV2(),
		NewDeviceGracefulShutdown(
			30*time.Second,
		),
	)
}
