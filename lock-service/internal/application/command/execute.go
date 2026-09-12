package command

type ExecuteLockCommand struct {
	CommandID     string
	DeviceID      string
	CommandType   string
	Payload       []byte
	RequestedBy   string
	CorrelationID string
}
