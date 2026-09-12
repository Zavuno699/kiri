package service

import "context"

type DeviceProcessRunner struct {
	Process *DeviceProductionProcess
}

func NewDeviceProcessRunner(
	process *DeviceProductionProcess,
) *DeviceProcessRunner {
	return &DeviceProcessRunner{
		Process: process,
	}
}

func (r *DeviceProcessRunner) Run(
	ctx context.Context,
) error {
	if err := r.Process.Start(ctx); err != nil {
		return err
	}

	<-ctx.Done()

	return r.Process.Stop(context.Background())
}
