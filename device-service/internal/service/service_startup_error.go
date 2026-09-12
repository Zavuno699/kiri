package service

import "fmt"

type DeviceServiceStartupError struct {
	Component string
	Err       error
}

func (e *DeviceServiceStartupError) Error() string {
	return fmt.Sprintf(
		"device service startup failed in %s: %v",
		e.Component,
		e.Err,
	)
}

func (e *DeviceServiceStartupError) Unwrap() error {
	return e.Err
}
