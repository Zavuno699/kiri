package service

import "context"

type DeviceRegistrationApplication struct {
	Registration *DeviceRegistrationService
}

func NewDeviceRegistrationApplication(
	registration *DeviceRegistrationService,
) *DeviceRegistrationApplication {
	return &DeviceRegistrationApplication{
		Registration: registration,
	}
}

func (a *DeviceRegistrationApplication) Register(
	ctx context.Context,
	record DeviceRecord,
) error {
	if err := ValidateDeviceRecord(record); err != nil {
		return err
	}

	return a.Registration.Register(
		ctx,
		record,
	)
}
