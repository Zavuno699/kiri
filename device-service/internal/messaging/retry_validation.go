package messaging

import "errors"

var ErrInvalidRetryPolicy = errors.New("invalid retry policy")

func (p RetryPolicy) Validate() error {
	if p.MaxAttempts <= 0 {
		return ErrInvalidRetryPolicy
	}

	if p.BaseDelay <= 0 {
		return ErrInvalidRetryPolicy
	}

	if p.MaxDelay < p.BaseDelay {
		return ErrInvalidRetryPolicy
	}

	return nil
}
