package bootstrap

import "time"

type ShutdownPolicy struct {
	Timeout time.Duration
}

func DefaultShutdownPolicy() ShutdownPolicy {
	return ShutdownPolicy{
		Timeout: 30 * time.Second,
	}
}

func (p ShutdownPolicy) EffectiveTimeout() time.Duration {
	if p.Timeout <= 0 {
		return 30 * time.Second
	}

	return p.Timeout
}
