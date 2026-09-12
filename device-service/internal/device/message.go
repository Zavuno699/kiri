package device

type Request struct {
	DeviceID string
	Command  string
	Payload  []byte
}

type Response struct {
	Command string
	Payload []byte
}

type Event struct {
	DeviceID string
	Type     string
	Payload  []byte
}
