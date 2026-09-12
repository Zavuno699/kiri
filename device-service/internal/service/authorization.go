package service

import (
	"context"
	"errors"
)

type DeviceAuthorizer struct {
	RequiredRole string
}

func NewDeviceAuthorizer(
	requiredRole string,
) *DeviceAuthorizer {
	return &DeviceAuthorizer{
		RequiredRole: requiredRole,
	}
}

func (a *DeviceAuthorizer) Authorize(
	ctx context.Context,
) error {
	auth, ok := DeviceAuthFromContext(ctx)
	if !ok {
		return errors.New("authentication context missing")
	}

	if a.RequiredRole == "" {
		return nil
	}

	for _, role := range auth.Roles {
		if role == a.RequiredRole {
			return nil
		}
	}

	return errors.New("forbidden")
}
