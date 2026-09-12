package service

import "context"

type DeviceServiceStore interface {
	Ping(context.Context) error
	Close(context.Context) error
}
