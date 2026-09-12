package service

func NewDefaultDeviceServiceRuntimeHost(
	config DeviceServiceConfig,
) *DeviceServiceRuntimeHost {

	entry := NewDefaultDeviceServiceRuntimeEntry(
		config,
	)

	return NewDeviceServiceRuntimeHost(
		entry,
	)
}
