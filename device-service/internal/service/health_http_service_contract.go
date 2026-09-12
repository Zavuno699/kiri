package service

import "context"

type DeviceHealthHTTPServiceContract interface {
	Start(context.Context) error
	Stop(context.Context) error
}
