package service

type DeviceAPIMetadata struct {
	Name    string
	Version string
}

func NewDeviceAPIMetadata() DeviceAPIMetadata {
	return DeviceAPIMetadata{
		Name:    "kirilock-device-service",
		Version: DeviceAPIVersion,
	}
}
