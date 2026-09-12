package service

import "errors"

func ValidateDeviceCommandRequest(
	request DeviceCommandRequest,
) error {
	if request.DeviceID == "" {
		return errors.New("device ID is required")
	}

	if request.Command == "" {
		return errors.New("device command is required")
	}

	return nil
}

func ValidateDeviceRecord(
	record DeviceRecord,
) error {
	if record.ID == "" {
		return errors.New("device ID is required")
	}

	return nil
}
