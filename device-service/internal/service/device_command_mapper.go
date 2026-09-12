package service

type DeviceCommandMapper struct {
	Registry *DeviceCommandRegistry
}

func NewDeviceCommandMapper(
	registry *DeviceCommandRegistry,
) *DeviceCommandMapper {
	return &DeviceCommandMapper{
		Registry: registry,
	}
}

func (m *DeviceCommandMapper) Map(
	request DeviceCommandRequest,
) (DeviceTransportRequest, error) {
	if err := ValidateDeviceCommandRequest(request); err != nil {
		return DeviceTransportRequest{}, err
	}

	if err := m.Registry.Validate(request.Command); err != nil {
		return DeviceTransportRequest{}, err
	}

	return DeviceTransportRequest{
		DeviceID: request.DeviceID,
		Payload:  request.Payload,
	}, nil
}
