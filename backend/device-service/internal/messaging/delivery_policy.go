package messaging

import "fmt"

type DeliveryPolicy struct {
	Retry      RetryPolicy
	DeadLetter bool
	MaxPayload int
}

func DefaultDeliveryPolicy() DeliveryPolicy {
	return DeliveryPolicy{
		Retry:      DefaultRetryPolicy(),
		DeadLetter: true,
		MaxPayload: 1024 * 1024,
	}
}

func (p DeliveryPolicy) ValidatePayload(payload []byte) error {
	if len(payload) == 0 {
		return ErrEmptyEventPayload
	}

	if p.MaxPayload > 0 && len(payload) > p.MaxPayload {
		return fmt.Errorf(
			"event payload exceeds maximum size of %d bytes",
			p.MaxPayload,
		)
	}

	return nil
}
