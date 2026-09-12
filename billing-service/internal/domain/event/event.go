package event

type Event struct {
	ID        string
	Type      string
	PaymentID string
	TenantID  string
	Payload   any
}
