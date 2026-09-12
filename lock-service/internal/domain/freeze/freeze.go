package freeze

type Freeze struct {
	ID         string
	DeviceID   string
	LeaseID    string
	Reason     string
	Active     bool
	RevokeCredentials bool
}
