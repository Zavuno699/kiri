package service

type DeviceApplicationError struct {
	Code    string
	Message string
}

func NewDeviceApplicationError(
	code string,
	message string,
) *DeviceApplicationError {
	return &DeviceApplicationError{
		Code:    code,
		Message: message,
	}
}

func (e *DeviceApplicationError) Error() string {
	return e.Message
}
