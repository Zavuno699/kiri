package service

import (
	"context"
	"time"
)

type DeviceRequestContext struct {
	RequestID string
	StartedAt time.Time
}

type deviceRequestContextKey struct{}

func WithDeviceRequestContext(
	ctx context.Context,
	request DeviceRequestContext,
) context.Context {
	return context.WithValue(
		ctx,
		deviceRequestContextKey{},
		request,
	)
}

func DeviceRequestContextFromContext(
	ctx context.Context,
) (DeviceRequestContext, bool) {
	value := ctx.Value(deviceRequestContextKey{})

	request, ok := value.(DeviceRequestContext)
	return request, ok
}
