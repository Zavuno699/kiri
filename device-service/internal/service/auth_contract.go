package service

import "context"

type DeviceAuthenticator interface {
	Authenticate(context.Context, string) (DeviceAuthContext, error)
}
