package messaging

import (
	"context"
	"fmt"

	"github.com/kirilock/backend/device-service/internal/service"
)

func NewDefaultDeviceMessageBus() *DeviceMessageBus {
	bus, err := NewProductionDeviceMessageBus()
	if err != nil {
		panic(fmt.Sprintf("create production device message bus: %v", err))
	}
	return bus
}

func NewProductionDeviceMessageBus() (*DeviceMessageBus, error) {
	runtime, err := NewProductionRuntime()
	if err != nil {
		return nil, err
	}

	return NewDeviceMessageBusFromRuntime(runtime)
}

func NewDeviceMessageBusFromRuntime(
	runtime *Runtime,
) (*DeviceMessageBus, error) {
	if runtime == nil {
		return nil, fmt.Errorf("messaging runtime is required")
	}

	if runtime.Broker == nil {
		return nil, fmt.Errorf("messaging runtime broker is required")
	}

	return NewDeviceMessageBus(runtime.Broker), nil
}

func newNoopDeviceMessageBus(
	config Config,
) *DeviceMessageBus {
	producer := NewNoopProducerFactory().NewProducer(config)
	consumer := NewNoopConsumerFactory().NewConsumer(config)

	return NewDeviceMessageBus(
		NewBroker(
			producer,
			consumer,
		),
	)
}

func AsServiceMessageBus(
	bus *DeviceMessageBus,
) service.DeviceServiceMessageBus {
	return bus
}

func CloseDeviceMessageBus(
	ctx context.Context,
	bus *DeviceMessageBus,
) error {
	if bus == nil {
		return nil
	}

	return bus.Close(ctx)
}
