package device

type DeviceEventBuilder struct {
	DeviceID string
}

func NewDeviceEventBuilder(
	deviceID string,
) *DeviceEventBuilder {
	return &DeviceEventBuilder{
		DeviceID: deviceID,
	}
}

func (b *DeviceEventBuilder) Connected() Event {
	return Event{
		DeviceID: b.DeviceID,
		Type:     "device.connected",
	}
}

func (b *DeviceEventBuilder) Disconnected() Event {
	return Event{
		DeviceID: b.DeviceID,
		Type:     "device.disconnected",
	}
}

func (b *DeviceEventBuilder) CommandFailed(
	payload []byte,
) Event {
	return Event{
		DeviceID: b.DeviceID,
		Type:     "device.command_failed",
		Payload:  payload,
	}
}
