package service

import (
	"context"
	"errors"
)

type NoopDeviceServiceRepository struct{}

func NewNoopDeviceServiceRepository() *NoopDeviceServiceRepository {
	return &NoopDeviceServiceRepository{}
}

func (r *NoopDeviceServiceRepository) Get(
	context.Context,
	string,
) (DeviceRecord, error) {
	return DeviceRecord{}, errors.New("device record not available")
}

func (r *NoopDeviceServiceRepository) Save(
	context.Context,
	DeviceRecord,
) error {
	return nil
}
