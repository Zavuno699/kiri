package lock

type State struct {
	DeviceID     string
	State        string
	LeaseID      string
	CredentialID string
	Version      int64
}
