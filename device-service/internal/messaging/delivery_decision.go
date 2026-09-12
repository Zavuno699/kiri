package messaging

type DeliveryDecision struct {
	Outcome     DeliveryOutcome
	Retry       bool
	DeadLetter  bool
	NextAttempt int
}

func AcknowledgeDecision() DeliveryDecision {
	return DeliveryDecision{
		Outcome: DeliveryAcknowledged,
	}
}

func RetryDecision(attempt int) DeliveryDecision {
	return DeliveryDecision{
		Outcome:     DeliveryRetriable,
		Retry:       true,
		NextAttempt: attempt + 1,
	}
}

func DeadLetterDecision(attempt int) DeliveryDecision {
	return DeliveryDecision{
		Outcome:     DeliveryDeadLettered,
		DeadLetter:  true,
		NextAttempt: attempt,
	}
}

func RejectDecision() DeliveryDecision {
	return DeliveryDecision{
		Outcome: DeliveryRejected,
	}
}

func DecideDelivery(
	policy DeliveryPolicy,
	attempt int,
	err error,
) DeliveryDecision {
	if err == nil {
		return AcknowledgeDecision()
	}

	if attempt < 1 {
		attempt = 1
	}

	if attempt < policy.Retry.MaxAttempts {
		return RetryDecision(attempt)
	}

	if policy.DeadLetter {
		return DeadLetterDecision(attempt)
	}

	return RejectDecision()
}
