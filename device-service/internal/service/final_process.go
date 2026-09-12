package service

import (
	"context"
	"os"
	"os/signal"
	"syscall"
)

type DeviceFinalProcess struct {
	Application *DeviceFinalApplication
	Shutdown    *DeviceGracefulShutdown
}

func NewDeviceFinalProcess(
	application *DeviceFinalApplication,
	shutdown *DeviceGracefulShutdown,
) *DeviceFinalProcess {
	return &DeviceFinalProcess{
		Application: application,
		Shutdown:    shutdown,
	}
}

func (p *DeviceFinalProcess) Run(
	ctx context.Context,
) error {
	runCtx, cancel := signal.NotifyContext(
		ctx,
		os.Interrupt,
		syscall.SIGTERM,
	)
	defer cancel()

	if err := p.Application.Start(runCtx); err != nil {
		return err
	}

	<-runCtx.Done()

	stopCtx, stopCancel := p.Shutdown.Context(
		context.Background(),
	)
	defer stopCancel()

	return p.Application.Stop(stopCtx)
}
