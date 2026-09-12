package service

import (
	"context"
	"os"
	"os/signal"
	"syscall"
)

type ProductionSignalRunnerV2 struct {
	Application *ProductionApplicationV2
	Shutdown    *DeviceGracefulShutdown
}

func NewProductionSignalRunnerV2(
	application *ProductionApplicationV2,
	shutdown *DeviceGracefulShutdown,
) *ProductionSignalRunnerV2 {
	return &ProductionSignalRunnerV2{
		Application: application,
		Shutdown:    shutdown,
	}
}

func (r *ProductionSignalRunnerV2) Run(
	ctx context.Context,
) error {
	runCtx, cancel := signal.NotifyContext(
		ctx,
		os.Interrupt,
		syscall.SIGTERM,
	)
	defer cancel()

	if err := r.Application.Run(runCtx); err != nil {
		return err
	}

	<-runCtx.Done()

	stopCtx, stopCancel := r.Shutdown.Context(
		context.Background(),
	)
	defer stopCancel()

	return r.Application.Stop(stopCtx)
}
