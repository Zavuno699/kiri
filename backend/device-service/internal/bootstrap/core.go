package bootstrap

import (
	"fmt"
	"github.com/kirilock/backend/device-service/internal/device"
	"github.com/kirilock/backend/device-service/internal/messaging"
	"github.com/kirilock/backend/device-service/internal/persistence"
	"github.com/kirilock/backend/device-service/internal/service"
)

type Core struct {
	Config       Config
	Device       *device.ProductionGraph
	MessageBus   *messaging.DeviceMessageBus
	Integrations *service.DeviceServiceCoreIntegrations
}

func NewCore(
	config Config,
	persistenceRuntime *PersistenceRuntime,
	messagingRuntime *messaging.Runtime,
) *Core {
	deviceConfig := device.NewConfig(
		config.DeviceAddress,
		config.ServiceID,
		config.DeviceTimeoutMS,
	)

	deviceGraph := device.NewDefaultProductionGraph(
		deviceConfig,
	)

	messageBus, err := messaging.NewDeviceMessageBusFromRuntime(
		messagingRuntime,
	)
	if err != nil {
		panic(fmt.Sprintf(
			"create device message bus from shared production messaging runtime: %v",
			err,
		))
	}

	var store service.DeviceServiceStore
	var repository service.DeviceServiceRepository
	var eventRepository service.DeviceServiceEventRepository

	if persistenceRuntime != nil &&
		persistenceRuntime.Runtime != nil &&
		persistenceRuntime.Runtime.Database != nil &&
		persistenceRuntime.Runtime.Database.DB != nil {

		db := persistenceRuntime.Runtime.Database.DB

		store = persistenceRuntime.Runtime.Database
		repository = persistence.NewDeviceRepository(db)
		eventRepository = persistence.NewEventRepository(db)
	} else {
		store = service.NewNoopDeviceServiceStore()
		repository = service.NewNoopDeviceServiceRepository()
		eventRepository = service.NewNoopDeviceServiceEventRepository()
	}

	integrations := service.NewDeviceServiceCoreIntegrations(
		store,
		messageBus,
		service.NewDeviceTransportIntegrationAdapter(
			deviceGraph.Runtime,
			deviceConfig,
		),
		repository,
		eventRepository,
	)

	return &Core{
		Config:       config,
		Device:       deviceGraph,
		MessageBus:   messageBus,
		Integrations: integrations,
	}
}
