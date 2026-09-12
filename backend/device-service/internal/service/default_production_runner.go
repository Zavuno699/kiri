package service

func NewDefaultDeviceProductionRunner() (*DeviceProductionRunner, error) {
	bootstrap, err := NewDefaultDeviceProductionBootstrap()
	if err != nil {
		return nil, err
	}

	lifecycle := NewDeviceProductionLifecycle(
		bootstrap,
	)

	return NewDeviceProductionRunner(
		lifecycle,
	), nil
}
