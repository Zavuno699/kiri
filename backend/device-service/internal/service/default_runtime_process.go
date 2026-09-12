package service

func NewDefaultDeviceServiceRuntimeProcess(
	config DeviceServiceConfig,
) *DeviceServiceRuntimeProcess {

	host := NewDefaultDeviceServiceRuntimeHost(
		config,
	)

	return NewDeviceServiceRuntimeProcess(
		host,
	)
}
