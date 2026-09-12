package messaging

import (
	"context"
	"errors"
)

type RuntimeConsumerOwner struct {
	Runtime *Runtime
	Bridge  *RuntimeConsumerBridge
}

func NewRuntimeConsumerOwner(
	runtime *Runtime,
	bridge *RuntimeConsumerBridge,
) *RuntimeConsumerOwner {
	return &RuntimeConsumerOwner{
		Runtime: runtime,
		Bridge:  bridge,
	}
}

func (o *RuntimeConsumerOwner) Start(
	ctx context.Context,
) error {
	if o == nil {
		return errors.New("runtime consumer owner is required")
	}

	if o.Runtime == nil {
		return errors.New("messaging runtime is required")
	}

	if o.Bridge == nil {
		return errors.New("runtime consumer bridge is required")
	}

	if ctx == nil {
		return errors.New("context is required")
	}

	o.Bridge.Start()

	return o.Runtime.Start(
		ctx,
		o.Bridge,
	)
}

func (o *RuntimeConsumerOwner) Stop(
	ctx context.Context,
) error {
	if o == nil {
		return nil
	}

	var firstErr error

	if o.Runtime != nil {
		if err := o.Runtime.Stop(ctx); err != nil {
			firstErr = err
		}
	}

	if o.Bridge != nil {
		o.Bridge.Stop()
	}

	return firstErr
}

func (o *RuntimeConsumerOwner) Ready() bool {
	if o == nil || o.Bridge == nil {
		return false
	}

	return o.Bridge.Readiness().Ready()
}
