package notification

type Notification struct {
	ID        string
	TenantID  string
	LeaseID   string
	Channel   string
	Template  string
	Status    string
}
