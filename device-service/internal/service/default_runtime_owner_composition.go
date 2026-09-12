package service

func NewDefaultDeviceServiceRuntimeOwnerComposition(
	config DeviceServiceConfig,
) *DeviceServiceRuntimeOwnerComposition {

	owner := NewDefaultDeviceServiceRuntimeOwner(
		config,
	)

	return NewDeviceServiceRuntimeOwnerComposition(
		owner,
	)
}
