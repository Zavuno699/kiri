package service

import "context"

type DeviceWorkerRuntime struct {
	Worker *DeviceWorker
}

func NewDeviceWorkerRuntime(
	worker *DeviceWorker,
) *DeviceWorkerRuntime {
	return &DeviceWorkerRuntime{
		Worker: worker,
	}
}

func (r *DeviceWorkerRuntime) Start(
	ctx context.Context,
) error {
	return r.Worker.Start(ctx)
}

func (r *DeviceWorkerRuntime) Stop(
	ctx context.Context,
) error {
	return r.Worker.Stop(ctx)
}
