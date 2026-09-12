package service

func NewDefaultDeviceProductionBootstrap() (*DeviceProductionBootstrap, error) {
	config := NewDeviceEnvironmentLoader().Load()

	validated, err := NewValidatedDeviceServiceConfiguration(config)
	if err != nil {
		return nil, err
	}

	entry := NewDefaultDeviceServiceRuntimeOwnerEntry(
		validated.Config,
	)

	return NewDeviceProductionBootstrap(entry), nil
}
