package service

type ValidatedDeviceServiceConfiguration struct {
	Config DeviceServiceConfig
}

func NewValidatedDeviceServiceConfiguration(
	config DeviceServiceConfig,
) (*ValidatedDeviceServiceConfiguration, error) {
	if err := config.Validate(); err != nil {
		return nil, err
	}

	return &ValidatedDeviceServiceConfiguration{
		Config: config,
	}, nil
}
