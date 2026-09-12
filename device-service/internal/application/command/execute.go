package command

type ExecuteCommand struct {
	CommandID     string
	DeviceID      string
	CommandType   string
	Payload       []byte
	RequestedBy   string
	CorrelationID string
}
