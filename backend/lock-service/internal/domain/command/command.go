package command

type Command struct {
	ID         string
	DeviceID   string
	Type       string
	Payload    []byte
	Principal  string
	LeaseID    string
	CorrelationID string
}
