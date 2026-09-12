package service

import (
	"context"
	"errors"
)

type NoopDeviceAuthenticator struct{}

func NewNoopDeviceAuthenticator() *NoopDeviceAuthenticator {
	return &NoopDeviceAuthenticator{}
}

func (a *NoopDeviceAuthenticator) Authenticate(
	context.Context,
	string,
) (DeviceAuthContext, error) {
	return DeviceAuthContext{}, errors.New("authentication not configured")
}
