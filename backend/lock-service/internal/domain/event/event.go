package event

type Event struct {
	ID       string
	Type     string
	DeviceID string
	LeaseID  string
	Payload  any
}
