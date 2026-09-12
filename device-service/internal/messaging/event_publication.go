package messaging

import "context"

type EventPublication struct {
	Topic string
	Key   string
	Event EventEnvelope
}

type EventPublicationValidator struct {
	Registry *TopicRegistry
	Policy   TopicPolicy
	Delivery DeliveryPolicy
}

func NewEventPublicationValidator(
	registry *TopicRegistry,
	policy TopicPolicy,
	delivery DeliveryPolicy,
) *EventPublicationValidator {
	return &EventPublicationValidator{
		Registry: registry,
		Policy:   policy,
		Delivery: delivery,
	}
}

func (v *EventPublicationValidator) Validate(
	ctx context.Context,
	publication EventPublication,
) error {
	_ = ctx

	if err := ValidateTopic(publication.Topic); err != nil {
		return err
	}

	if v != nil && v.Registry != nil && !v.Registry.Contains(publication.Topic) {
		return ErrUnknownTopic
	}

	if v != nil {
		if err := v.Policy.CanPublish(publication.Topic); err != nil {
			return err
		}

		if err := v.Delivery.ValidatePayload(
			mustEncodePublication(publication),
		); err != nil {
			return err
		}
	}

	return ValidateEventEnvelope(publication.Event)
}

func mustEncodePublication(publication EventPublication) []byte {
	payload, err := EncodeEvent(publication.Event)
	if err != nil {
		return nil
	}

	return payload
}
