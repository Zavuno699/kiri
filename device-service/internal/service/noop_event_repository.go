package service

import "context"

type NoopDeviceServiceEventRepository struct{}

func NewNoopDeviceServiceEventRepository() *NoopDeviceServiceEventRepository {
	return &NoopDeviceServiceEventRepository{}
}

func (r *NoopDeviceServiceEventRepository) Append(
	context.Context,
	DeviceServiceMessage,
) error {
	return nil
}
