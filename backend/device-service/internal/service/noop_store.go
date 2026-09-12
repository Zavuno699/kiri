package service

import "context"

type NoopDeviceServiceStore struct{}

func NewNoopDeviceServiceStore() *NoopDeviceServiceStore {
	return &NoopDeviceServiceStore{}
}

func (s *NoopDeviceServiceStore) Ping(context.Context) error {
	return nil
}

func (s *NoopDeviceServiceStore) Close(context.Context) error {
	return nil
}
