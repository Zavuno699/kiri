package service

type DeviceServiceCoreIntegrations struct {
	Store           DeviceServiceStore
	MessageBus      DeviceServiceMessageBus
	DeviceTransport DeviceServiceDeviceTransport
	Repository      DeviceServiceRepository
	EventRepository DeviceServiceEventRepository
}

func NewDeviceServiceCoreIntegrations(
	store DeviceServiceStore,
	messageBus DeviceServiceMessageBus,
	deviceTransport DeviceServiceDeviceTransport,
	repository DeviceServiceRepository,
	eventRepository DeviceServiceEventRepository,
) *DeviceServiceCoreIntegrations {
	return &DeviceServiceCoreIntegrations{
		Store:           store,
		MessageBus:      messageBus,
		DeviceTransport: deviceTransport,
		Repository:      repository,
		EventRepository: eventRepository,
	}
}
