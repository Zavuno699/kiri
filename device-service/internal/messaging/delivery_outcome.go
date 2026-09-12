package messaging

type DeliveryOutcome string

const (
	DeliveryAcknowledged DeliveryOutcome = "acknowledged"
	DeliveryRetriable    DeliveryOutcome = "retriable"
	DeliveryDeadLettered DeliveryOutcome = "dead_lettered"
	DeliveryRejected     DeliveryOutcome = "rejected"
)

type DeliveryResult struct {
	EventID string
	Topic   string
	Attempt int
	Outcome DeliveryOutcome
	Reason  string
}
