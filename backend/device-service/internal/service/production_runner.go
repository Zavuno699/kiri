package service

import "context"

type DeviceProductionRunner struct {
	Lifecycle *DeviceProductionLifecycle
}

func NewDeviceProductionRunner(
	lifecycle *DeviceProductionLifecycle,
) *DeviceProductionRunner {
	return &DeviceProductionRunner{
		Lifecycle: lifecycle,
	}
}

func (r *DeviceProductionRunner) Run(
	ctx context.Context,
) error {
	if err := r.Lifecycle.Start(ctx); err != nil {
		return err
	}

	<-ctx.Done()

	return r.Lifecycle.Stop(context.Background())
}
