package tamper

type Alarm struct {
	ID        string
	DeviceID  string
	Type      string
	Severity  string
	Status    string
	Evidence  map[string]string
}
