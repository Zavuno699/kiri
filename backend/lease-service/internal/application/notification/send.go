package notification

type SendNotificationCommand struct {
	TenantID string
	LeaseID  string
	Channel  string
	Template string
}
