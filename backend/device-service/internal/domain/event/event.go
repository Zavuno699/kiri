package event

type Event struct {
	ID            string
	Type          string
	Version       int
	DeviceID      string
	AggregateType string
	Payload       any
}
