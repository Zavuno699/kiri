package service

type DeviceApplicationAPIServices struct {
	Command      *DeviceCommandApplication
	Query        *DeviceQueryApplication
	Registration *DeviceRegistrationApplication
	Status       *DeviceStatusApplication
}

func NewDeviceApplicationAPIServices(
	command *DeviceCommandApplication,
	query *DeviceQueryApplication,
	registration *DeviceRegistrationApplication,
	status *DeviceStatusApplication,
) *DeviceApplicationAPIServices {
	return &DeviceApplicationAPIServices{
		Command:      command,
		Query:        query,
		Registration: registration,
		Status:       status,
	}
}
