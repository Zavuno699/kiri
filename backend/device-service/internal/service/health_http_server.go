package service

import "context"

type DeviceHealthHTTPServer interface {
	Start(context.Context) error
	Stop(context.Context) error
}
