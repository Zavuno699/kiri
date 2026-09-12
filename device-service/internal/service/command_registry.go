package service

import "errors"

type DeviceCommandRegistry struct {
	commands map[string]struct{}
}

func NewDeviceCommandRegistry(
	commands ...string,
) *DeviceCommandRegistry {
	registry := &DeviceCommandRegistry{
		commands: make(map[string]struct{}),
	}

	for _, command := range commands {
		registry.commands[command] = struct{}{}
	}

	return registry
}

func (r *DeviceCommandRegistry) Validate(
	command string,
) error {
	if _, ok := r.commands[command]; !ok {
		return errors.New("unsupported device command")
	}

	return nil
}

func NewDefaultDeviceCommandRegistry() *DeviceCommandRegistry {
	return NewDeviceCommandRegistry(
		"device.transport",
		"status",
		"ping",
	)
}
