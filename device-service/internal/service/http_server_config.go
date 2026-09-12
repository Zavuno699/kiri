package service

type DeviceHTTPServerConfig struct {
	Address string
	Port    string
}

func (c DeviceHTTPServerConfig) Addr() string {
	if c.Address == "" {
		c.Address = "0.0.0.0"
	}

	if c.Port == "" {
		c.Port = "8080"
	}

	return c.Address + ":" + c.Port
}
