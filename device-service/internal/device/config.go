package device

type Config struct {
	Address   string
	DeviceID  string
	TimeoutMS int
}

func NewConfig(
	address string,
	deviceID string,
	timeoutMS int,
) Config {
	return Config{
		Address:   address,
		DeviceID:  deviceID,
		TimeoutMS: timeoutMS,
	}
}
