package messaging

import "time"

type RetryPolicy struct {
	MaxAttempts int
	BaseDelay   time.Duration
	MaxDelay    time.Duration
}

func DefaultRetryPolicy() RetryPolicy {
	return RetryPolicy{
		MaxAttempts: 8,
		BaseDelay:   250 * time.Millisecond,
		MaxDelay:    30 * time.Second,
	}
}

func (p RetryPolicy) Delay(attempt int) time.Duration {
	if attempt <= 0 {
		return 0
	}

	if p.BaseDelay <= 0 {
		p.BaseDelay = 250 * time.Millisecond
	}

	if p.MaxDelay <= 0 {
		p.MaxDelay = 30 * time.Second
	}

	delay := p.BaseDelay

	for i := 1; i < attempt; i++ {
		if delay >= p.MaxDelay/2 {
			return p.MaxDelay
		}

		delay *= 2
	}

	if delay > p.MaxDelay {
		return p.MaxDelay
	}

	return delay
}
