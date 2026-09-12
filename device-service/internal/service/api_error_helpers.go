package service

import "errors"

func AsDeviceApplicationError(
	err error,
	target **DeviceApplicationError,
) bool {
	if err == nil {
		return false
	}

	return errors.As(err, target)
}
