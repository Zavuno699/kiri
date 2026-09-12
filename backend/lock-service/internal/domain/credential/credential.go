package credential

type Credential struct {
	ID        string
	DeviceID  string
	LeaseID   string
	Type      string
	Status    string
	Version   int64
	ExpiresAt string
}
