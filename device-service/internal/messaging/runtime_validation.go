package messaging

func ValidateRuntimeConfiguration(
	policy *RuntimePolicy,
) error {
	if policy == nil {
		return ErrInvalidRetryPolicy
	}

	if err := policy.Delivery.Retry.Validate(); err != nil {
		return err
	}

	if err := policy.Consumer.Retry.Validate(); err != nil {
		return err
	}

	return policy.Validate()
}
