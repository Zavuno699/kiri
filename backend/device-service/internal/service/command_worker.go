package service

import "context"

type DeviceCommandWorker struct {
	Execution *DeviceCommandExecutionService
}

func NewDeviceCommandWorker(
	execution *DeviceCommandExecutionService,
) *DeviceCommandWorker {
	return &DeviceCommandWorker{
		Execution: execution,
	}
}

func (w *DeviceCommandWorker) Execute(
	ctx context.Context,
	request DeviceCommandRequest,
) (DeviceCommandExecutionResult, error) {
	return w.Execution.Execute(
		ctx,
		request,
	)
}
