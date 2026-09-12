package service

import "errors"

type DeviceCommandValidator struct {
	Policy *DeviceCommandPolicy
}

func NewDeviceCommandValidator(
	policy *DeviceCommandPolicy,
) *DeviceCommandValidator {
	return &DeviceCommandValidator{
		Policy: policy,
	}
}

func (v *DeviceCommandValidator) Validate(
	request DeviceCommandRequest,
) error {
	if request.DeviceID == "" {
		return errors.New("device ID is required")
	}

	if request.Command == "" {
		return errors.New("device command is required")
	}

	if err := v.Policy.Check(
		request.Command,
	); err != nil {
		return err
	}

	return nil
}
