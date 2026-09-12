package bootstrap

type DeviceStatus struct {
	Configured bool
	Address    string
	TimeoutMS  int
}

func NewDeviceStatus(cfg Config) DeviceStatus {
	return DeviceStatus{
		Configured: cfg.DeviceAddress != "",
		Address:    cfg.DeviceAddress,
		TimeoutMS:  cfg.DeviceTimeoutMS,
	}
}
