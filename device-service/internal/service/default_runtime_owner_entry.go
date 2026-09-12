package service

func NewDefaultDeviceServiceRuntimeOwnerEntry(
	config DeviceServiceConfig,
) *DeviceServiceRuntimeOwnerEntry {

	composition := NewDefaultDeviceServiceRuntimeOwnerComposition(
		config,
	)

	return NewDeviceServiceRuntimeOwnerEntry(
		composition,
	)
}
