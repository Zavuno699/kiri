package service

type DeviceApplicationServices struct {
	Query        *DeviceQueryService
	Commands     *DeviceCommandApplicationService
	Registration *DeviceRegistrationService
	Status       *DeviceStatusService
	Events       *DeviceEventService
	Health       *DeviceApplicationHealthService
}

func NewDeviceApplicationServices(
	query *DeviceQueryService,
	commands *DeviceCommandApplicationService,
	registration *DeviceRegistrationService,
	status *DeviceStatusService,
	events *DeviceEventService,
	health *DeviceApplicationHealthService,
) *DeviceApplicationServices {
	return &DeviceApplicationServices{
		Query:        query,
		Commands:     commands,
		Registration: registration,
		Status:       status,
		Events:       events,
		Health:       health,
	}
}
