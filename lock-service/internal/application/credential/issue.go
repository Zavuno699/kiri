package credential

type IssueCredentialCommand struct {
	DeviceID string
	LeaseID  string
	Type     string
	ExpiresAt string
}
