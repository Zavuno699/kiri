package device

type CommandEventBuilder struct {
	DeviceID string
}

func NewCommandEventBuilder(
	deviceID string,
) *CommandEventBuilder {
	return &CommandEventBuilder{
		DeviceID: deviceID,
	}
}

func (b *CommandEventBuilder) Succeeded(
	command string,
	payload []byte,
) Event {
	return Event{
		DeviceID: b.DeviceID,
		Type:     "device.command_succeeded",
		Payload:  payload,
	}
}

func (b *CommandEventBuilder) Failed(
	command string,
	payload []byte,
) Event {
	return Event{
		DeviceID: b.DeviceID,
		Type:     "device.command_failed",
		Payload:  payload,
	}
}
