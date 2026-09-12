package service

import "context"

type DeviceServiceMessage struct {
	Topic   string
	Key     string
	Payload []byte
}

type DeviceServiceMessageBus interface {
	Publish(context.Context, DeviceServiceMessage) error
	Close(context.Context) error
}
