package event

type Event struct {
	ID       string
	Type     string
	LeaseID  string
	TenantID string
	Payload  any
}
