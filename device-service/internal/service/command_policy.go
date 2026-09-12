package service

import "errors"

type DeviceCommandPolicy struct {
	Allowed map[string]struct{}
}

func NewDeviceCommandPolicy(
	commands ...string,
) *DeviceCommandPolicy {
	allowed := make(map[string]struct{})

	for _, command := range commands {
		allowed[command] = struct{}{}
	}

	return &DeviceCommandPolicy{
		Allowed: allowed,
	}
}

func (p *DeviceCommandPolicy) Check(
	command string,
) error {
	if _, ok := p.Allowed[command]; !ok {
		return errors.New("device command not permitted")
	}

	return nil
}

func NewDefaultDeviceCommandPolicy() *DeviceCommandPolicy {
	return NewDeviceCommandPolicy(
		"device.transport",
		"status",
		"ping",
	)
}
