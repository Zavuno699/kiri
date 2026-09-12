package bootstrap

import (
	"context"
	"errors"
)

type Runtime struct {
	Application *Application
	Started     bool
}

func NewRuntime(application *Application) *Runtime {
	return &Runtime{
		Application: application,
	}
}

func (r *Runtime) Start(ctx context.Context) error {
	if r == nil {
		return errors.New("nil bootstrap runtime")
	}

	if r.Started {
		return nil
	}

	if ctx == nil {
		return errors.New("context is required")
	}

	if r.Application == nil {
		return errors.New("nil bootstrap application")
	}

	if r.Application.Core == nil {
		return errors.New("nil bootstrap core")
	}

	if r.Application.Messaging == nil {
		return errors.New("nil bootstrap messaging composition")
	}

	if r.Application.Messaging.Runtime == nil {
		return errors.New("nil bootstrap messaging runtime")
	}

	if r.Application.Core.Device == nil {
		return errors.New("nil bootstrap device graph")
	}

	if r.Application.Core.Device.Runtime == nil {
		return errors.New("nil bootstrap device runtime")
	}

	messagingStarted := false

	rollbackMessaging := func(cause error) error {
		if !messagingStarted {
			return cause
		}

		if stopErr := r.Application.Messaging.Runtime.Stop(ctx); stopErr != nil {
			return errors.Join(cause, stopErr)
		}

		return cause
	}

	if err := r.Application.Messaging.Runtime.Start(ctx); err != nil {
		return err
	}

	messagingStarted = true

	deviceConfig := r.Application.Core.Device.Config

	if err := r.Application.Core.Device.Runtime.Start(
		ctx,
		deviceConfig.DeviceID,
		deviceConfig,
	); err != nil {
		return rollbackMessaging(err)
	}

	if !r.Application.Messaging.Runtime.Ready() {
		return rollbackMessaging(
			errors.New("bootstrap messaging runtime is not ready"),
		)
	}

	r.Started = true

	return nil
}

func (r *Runtime) Stop(ctx context.Context) error {
	if r == nil || !r.Started {
		return nil
	}

	var firstErr error

	if r.Application != nil &&
		r.Application.Core != nil &&
		r.Application.Core.Device != nil &&
		r.Application.Core.Device.Runtime != nil {
		deviceConfig := r.Application.Core.Device.Config

		if err := r.Application.Core.Device.Runtime.Stop(
			ctx,
			deviceConfig.DeviceID,
		); err != nil && firstErr == nil {
			firstErr = err
		}
	}

	if r.Application != nil &&
		r.Application.Messaging != nil &&
		r.Application.Messaging.Runtime != nil {
		if err := r.Application.Messaging.Runtime.Stop(ctx); err != nil &&
			firstErr == nil {
			firstErr = err
		}
	}

	r.Started = false

	return firstErr
}
