package service

import "context"

type DeviceWorker struct {
	Handler *DeviceServiceEventHandler
	Bus     DeviceServiceMessageBus
	Topics  []string
}

func NewDeviceWorker(
	handler *DeviceServiceEventHandler,
	bus DeviceServiceMessageBus,
	topics []string,
) *DeviceWorker {
	return &DeviceWorker{
		Handler: handler,
		Bus:     bus,
		Topics:  append([]string(nil), topics...),
	}
}

func (w *DeviceWorker) Start(
	context.Context,
) error {
	return nil
}

func (w *DeviceWorker) Stop(
	ctx context.Context,
) error {
	return w.Bus.Close(ctx)
}
