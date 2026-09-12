package service

import "context"

type DeviceServiceFullCoreComposition struct {
	HTTP    *DeviceHealthHTTPService
	Core    *DeviceServiceCoreIntegrationFacade
	Runtime *DeviceProductionRuntime
}

func NewDeviceServiceFullCoreComposition(
	httpService *DeviceHealthHTTPService,
	core *DeviceServiceCoreIntegrationFacade,
	runtime *DeviceProductionRuntime,
) *DeviceServiceFullCoreComposition {
	return &DeviceServiceFullCoreComposition{
		HTTP:    httpService,
		Core:    core,
		Runtime: runtime,
	}
}

func (c *DeviceServiceFullCoreComposition) Start(
	ctx context.Context,
) error {
	if err := c.Core.Start(ctx); err != nil {
		return err
	}

	return c.HTTP.Start(ctx)
}

func (c *DeviceServiceFullCoreComposition) Stop(
	ctx context.Context,
) error {
	httpErr := c.HTTP.Stop(ctx)
	coreErr := c.Core.Stop(ctx)

	if httpErr != nil {
		return httpErr
	}

	return coreErr
}
