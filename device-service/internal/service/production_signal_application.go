package service

import (
	"context"
	"os"
	"os/signal"
	"syscall"
)

type DeviceProductionSignalApplication struct {
	Application *DeviceProductionApplication
	Shutdown    *DeviceGracefulShutdown
}

func NewDeviceProductionSignalApplication(
	application *DeviceProductionApplication,
	shutdown *DeviceGracefulShutdown,
) *DeviceProductionSignalApplication {
	return &DeviceProductionSignalApplication{
		Application: application,
		Shutdown:    shutdown,
	}
}

func (a *DeviceProductionSignalApplication) Run(
	ctx context.Context,
) error {
	runCtx, cancel := signal.NotifyContext(
		ctx,
		os.Interrupt,
		syscall.SIGTERM,
	)
	defer cancel()

	if err := a.Application.Start(runCtx); err != nil {
		return err
	}

	<-runCtx.Done()

	shutdownCtx, shutdownCancel := a.Shutdown.Context(context.Background())
	defer shutdownCancel()

	return a.Application.Stop(shutdownCtx)
}
