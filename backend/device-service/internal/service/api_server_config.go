package service

type DeviceAPIServerConfig struct {
	Address string
}

func NewDeviceAPIServerConfig(
	address string,
) DeviceAPIServerConfig {
	return DeviceAPIServerConfig{
		Address: address,
	}
}
