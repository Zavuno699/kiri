package service

import "context"

type DeviceServiceApplicationContract interface {
	Start(context.Context) error
	Stop(context.Context) error
}
