package service

import "context"

type DeviceSystemProcess struct {
	Owner *DeviceSystemOwner
}

func NewDeviceSystemProcess(
	owner *DeviceSystemOwner,
) *DeviceSystemProcess {
	return &DeviceSystemProcess{
		Owner: owner,
	}
}

func (p *DeviceSystemProcess) Run(
	ctx context.Context,
) error {
	if err := p.Owner.Start(ctx); err != nil {
		return err
	}

	<-ctx.Done()

	return p.Owner.Stop(
		context.Background(),
	)
}
