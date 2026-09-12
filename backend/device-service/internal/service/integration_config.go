package service

type DeviceIntegrationConfig struct {
	DatabaseDriver  string
	DatabaseDSN     string
	MessageBrokers  []string
	MessageClientID string
	DeviceAddress   string
	DeviceTimeoutMS int
}

func NewDeviceIntegrationConfig(
	databaseDriver string,
	databaseDSN string,
	messageBrokers []string,
	messageClientID string,
	deviceAddress string,
	deviceTimeoutMS int,
) *DeviceIntegrationConfig {
	return &DeviceIntegrationConfig{
		DatabaseDriver:  databaseDriver,
		DatabaseDSN:     databaseDSN,
		MessageBrokers:  append([]string(nil), messageBrokers...),
		MessageClientID: messageClientID,
		DeviceAddress:   deviceAddress,
		DeviceTimeoutMS: deviceTimeoutMS,
	}
}
