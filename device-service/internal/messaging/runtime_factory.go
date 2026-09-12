package messaging

import (
	"context"
	"fmt"

	sharedkafka "github.com/kirilock/backend/shared/kafka"
)

func NewDefaultRuntime() *Runtime {
	runtime, err := NewProductionRuntime()
	if err != nil {
		panic(fmt.Sprintf("create production device messaging runtime: %v", err))
	}
	return runtime
}

func NewProductionRuntime() (*Runtime, error) {
	cfg, err := NewProductionKafkaConfig()
	if err != nil {
		return nil, err
	}

	producer, err := sharedkafka.NewKafkaProducer(cfg)
	if err != nil {
		return nil, err
	}

	consumer, err := sharedkafka.NewKafkaConsumer(cfg)
	if err != nil {
		_ = producer.Close()
		return nil, err
	}

	for _, topic := range NewDefaultTopicConfig().Outbound {
		if err := producer.AddWriter(cfg, topic); err != nil {
			_ = consumer.Close()
			_ = producer.Close()
			return nil, err
		}
	}

	groupID := sharedkafka.ConsumerGroupName(
		cfg.ClientID,
	)

	for _, topic := range NewDefaultTopicConfig().Inbound {
		if err := consumer.AddReader(cfg, topic, groupID); err != nil {
			_ = consumer.Close()
			_ = producer.Close()
			return nil, err
		}
	}

	producerAdapter, err := NewKafkaProducerAdapter(producer)
	if err != nil {
		_ = consumer.Close()
		_ = producer.Close()
		return nil, err
	}

	consumerAdapter, err := NewKafkaConsumerAdapter(consumer)
	if err != nil {
		_ = consumer.Close()
		_ = producer.Close()
		return nil, err
	}

	return NewRuntime(
		NewBroker(
			producerAdapter,
			consumerAdapter,
		),
		NewDefaultTopicConfig(),
	), nil
}

func newNoopRuntime(config Config) *Runtime {
	producer := NewNoopProducerFactory().NewProducer(config)
	consumer := NewNoopConsumerFactory().NewConsumer(config)

	return NewRuntime(
		NewBroker(
			producer,
			consumer,
		),
		NewDefaultTopicConfig(),
	)
}

func CloseRuntime(
	ctx context.Context,
	runtime *Runtime,
) error {
	if runtime == nil {
		return nil
	}

	return runtime.Stop(ctx)
}
