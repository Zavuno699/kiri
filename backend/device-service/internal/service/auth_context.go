package service

import "context"

type DeviceAuthContext struct {
	Subject  string
	TenantID string
	Roles    []string
}

type deviceAuthContextKey struct{}

func WithDeviceAuth(
	ctx context.Context,
	auth DeviceAuthContext,
) context.Context {
	return context.WithValue(
		ctx,
		deviceAuthContextKey{},
		auth,
	)
}

func DeviceAuthFromContext(
	ctx context.Context,
) (DeviceAuthContext, bool) {
	value := ctx.Value(deviceAuthContextKey{})

	auth, ok := value.(DeviceAuthContext)
	return auth, ok
}
