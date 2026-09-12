package service

func NewDefaultDeviceOperationalEntry(
	config DeviceServiceConfig,
) *DeviceOperationalEntry {

	composition := NewDefaultDeviceOperationalComposition(
		config,
	)

	owner := NewDeviceOperationalOwner(
		composition,
	)

	return NewDeviceOperationalEntry(
		owner,
	)
}
