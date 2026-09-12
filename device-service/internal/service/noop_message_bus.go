package service

import "context"

type NoopDeviceServiceMessageBus struct{}

func NewNoopDeviceServiceMessageBus() *NoopDeviceServiceMessageBus {
	return &NoopDeviceServiceMessageBus{}
}

func (b *NoopDeviceServiceMessageBus) Publish(
	context.Context,
	DeviceServiceMessage,
) error {
	return nil
}

func (b *NoopDeviceServiceMessageBus) Close(context.Context) error {
	return nil
}
