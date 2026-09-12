package service

import (
	"context"
	"os"
	"os/signal"
	"syscall"
)

type DeviceProcessSignalRuntime struct {
	Process *DeviceProductionProcess
}

func NewDeviceProcessSignalRuntime(
	process *DeviceProductionProcess,
) *DeviceProcessSignalRuntime {
	return &DeviceProcessSignalRuntime{
		Process: process,
	}
}

func (r *DeviceProcessSignalRuntime) Run(
	ctx context.Context,
) error {
	runCtx, cancel := signal.NotifyContext(
		ctx,
		os.Interrupt,
		syscall.SIGTERM,
	)
	defer cancel()

	if err := r.Process.Start(runCtx); err != nil {
		return err
	}

	<-runCtx.Done()

	return r.Process.Stop(context.Background())
}
