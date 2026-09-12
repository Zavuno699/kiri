package service

import "errors"

func (c DeviceServiceConfig) Validate() error {
	if c.HTTPPort == "" {
		return errors.New("device service HTTP port is required")
	}

	if c.DeviceID == "" {
		return errors.New("device service ID is required")
	}

	return nil
}
