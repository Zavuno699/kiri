package service

import "context"

type DeviceCommandWorkerRuntime struct {
	Worker *DeviceCommandWorker
}

func NewDeviceCommandWorkerRuntime(
	worker *DeviceCommandWorker,
) *DeviceCommandWorkerRuntime {
	return &DeviceCommandWorkerRuntime{
		Worker: worker,
	}
}

func (r *DeviceCommandWorkerRuntime) Execute(
	ctx context.Context,
	request DeviceCommandRequest,
) (DeviceCommandExecutionResult, error) {
	return r.Worker.Execute(
		ctx,
		request,
	)
}
