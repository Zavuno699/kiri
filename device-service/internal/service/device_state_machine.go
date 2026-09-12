package service

import "errors"

const (
	DeviceStatusRegistered   = "registered"
	DeviceStatusReady        = "ready"
	DeviceStatusBusy         = "busy"
	DeviceStatusDisconnected = "disconnected"
	DeviceStatusFailed       = "failed"
	DeviceStatusStopped      = "stopped"
)

type DeviceStateMachine struct{}

func NewDeviceStateMachine() *DeviceStateMachine {
	return &DeviceStateMachine{}
}

func (m *DeviceStateMachine) CanTransition(
	from string,
	to string,
) bool {
	switch from {
	case "":
		return to == DeviceStatusRegistered

	case DeviceStatusRegistered:
		return to == DeviceStatusReady ||
			to == DeviceStatusDisconnected ||
			to == DeviceStatusFailed

	case DeviceStatusReady:
		return to == DeviceStatusBusy ||
			to == DeviceStatusDisconnected ||
			to == DeviceStatusFailed ||
			to == DeviceStatusStopped

	case DeviceStatusBusy:
		return to == DeviceStatusReady ||
			to == DeviceStatusDisconnected ||
			to == DeviceStatusFailed

	case DeviceStatusDisconnected:
		return to == DeviceStatusReady ||
			to == DeviceStatusFailed ||
			to == DeviceStatusStopped

	case DeviceStatusFailed:
		return to == DeviceStatusReady ||
			to == DeviceStatusStopped

	case DeviceStatusStopped:
		return to == DeviceStatusRegistered

	default:
		return false
	}
}

func (m *DeviceStateMachine) Transition(
	from string,
	to string,
) error {
	if !m.CanTransition(from, to) {
		return errors.New("invalid device state transition")
	}

	return nil
}
