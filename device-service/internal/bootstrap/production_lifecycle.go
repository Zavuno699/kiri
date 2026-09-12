package bootstrap

import (
	"context"
	"errors"
	"time"
)

type ProductionLifecycle struct {
	Runtime *Runtime
	Policy  ShutdownPolicy
}

func NewProductionLifecycle(
	runtime *Runtime,
	policy ShutdownPolicy,
) *ProductionLifecycle {
	return &ProductionLifecycle{
		Runtime: runtime,
		Policy:  policy,
	}
}

func (l *ProductionLifecycle) Start(ctx context.Context) error {
	if l == nil {
		return errors.New("production lifecycle is required")
	}
	if l.Runtime == nil {
		return errors.New("production runtime is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}

	return l.Runtime.Start(ctx)
}

func (l *ProductionLifecycle) Stop(ctx context.Context) error {
	if l == nil || l.Runtime == nil {
		return nil
	}

	timeout := l.Policy.EffectiveTimeout()

	stopCtx, cancel := context.WithTimeout(
		context.Background(),
		timeout,
	)
	defer cancel()

	return l.Runtime.Stop(stopCtx)
}

func (l *ProductionLifecycle) StopDuration() time.Duration {
	if l == nil {
		return 30 * time.Second
	}

	return l.Policy.EffectiveTimeout()
}
