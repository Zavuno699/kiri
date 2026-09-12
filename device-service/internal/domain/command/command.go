package command

type Command struct {
	ID          string
	DeviceID    string
	Type        string
	Payload     []byte
	RequestedBy string
	CorrelationID string
}
