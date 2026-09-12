package service

import "fmt"

type DeviceServiceShutdownError struct {
	Component string
	Err       error
}

func (e *DeviceServiceShutdownError) Error() string {
	return fmt.Sprintf(
		"device service shutdown failed in %s: %v",
		e.Component,
		e.Err,
	)
}

func (e *DeviceServiceShutdownError) Unwrap() error {
	return e.Err
}
