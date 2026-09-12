package service

import "context"

type DeviceServiceRuntimeContract interface {
	Start(context.Context) error
	Stop(context.Context) error
}
