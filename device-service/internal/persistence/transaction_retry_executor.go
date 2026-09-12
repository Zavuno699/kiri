package persistence

import (
	"context"
	"time"
)

type TransactionRetryPolicy struct {
	MaxAttempts int
	BaseDelay   time.Duration
	MaxDelay    time.Duration
}

func DefaultTransactionRetryPolicy() TransactionRetryPolicy {
	return TransactionRetryPolicy{
		MaxAttempts: 5,
		BaseDelay:   25 * time.Millisecond,
		MaxDelay:    500 * time.Millisecond,
	}
}

func (p TransactionRetryPolicy) Delay(attempt int) time.Duration {
	if attempt <= 0 {
		return 0
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

func ExecuteWithTransactionRetry(
	ctx context.Context,
	policy TransactionRetryPolicy,
	fn func(context.Context) error,
) error {
	if policy.MaxAttempts <= 0 {
		policy = DefaultTransactionRetryPolicy()
	}

	for attempt := 1; attempt <= policy.MaxAttempts; attempt++ {
		err := fn(ctx)

		if err == nil {
			return nil
		}

		if !IsRetryableTransactionError(err) ||
			attempt == policy.MaxAttempts {
			return err
		}

		delay := policy.Delay(attempt)

		timer := time.NewTimer(delay)

		select {
		case <-ctx.Done():
			if !timer.Stop() {
				<-timer.C
			}

			return ctx.Err()

		case <-timer.C:
		}
	}

	return nil
}
