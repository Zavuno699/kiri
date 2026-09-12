package service

import "context"

type DeviceRecord struct {
	ID     string
	Status string
}

type DeviceServiceRepository interface {
	Get(context.Context, string) (DeviceRecord, error)
	Save(context.Context, DeviceRecord) error
}

type DeviceServiceEventRepository interface {
	Append(context.Context, DeviceServiceMessage) error
}
