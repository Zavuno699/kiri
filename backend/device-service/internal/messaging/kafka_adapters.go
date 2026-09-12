package messaging

import (
	"context"
	"errors"

	sharedkafka "github.com/kirilock/backend/shared/kafka"
)

type KafkaProducerAdapter struct {
	producer sharedkafka.Producer
}

func NewKafkaProducerAdapter(
	producer sharedkafka.Producer,
) (*KafkaProducerAdapter, error) {
	if producer == nil {
		return nil, errors.New("shared Kafka producer is required")
	}

	return &KafkaProducerAdapter{
		producer: producer,
	}, nil
}

func (p *KafkaProducerAdapter) Publish(
	ctx context.Context,
	message Message,
) error {
	if p == nil || p.producer == nil {
		return errors.New("shared Kafka producer is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if message.Topic == "" {
		return errors.New("message topic is required")
	}
	if len(message.Value) == 0 {
		return errors.New("message value is required")
	}

	// The shared Kafka layer requires event metadata in headers.
	// Device messages do not carry an explicit event ID, so the
	// event identity is generated at the adapter boundary.
	eventID := newEventID()
	eventType := message.Topic

	return p.producer.Publish(
		ctx,
		sharedkafka.Message{
			Topic:     message.Topic,
			Key:       message.Key,
			Value:     message.Value,
			EventID:   eventID,
			EventType: eventType,
		},
	)
}

func (p *KafkaProducerAdapter) Close(
	ctx context.Context,
) error {
	if p == nil || p.producer == nil {
		return nil
	}
	if ctx == nil {
		return errors.New("context is required")
	}

	return p.producer.Close()
}

type KafkaConsumerAdapter struct {
	consumer sharedkafka.Consumer
	topics   []string
	handler  Handler
}

func NewKafkaConsumerAdapter(
	consumer sharedkafka.Consumer,
) (*KafkaConsumerAdapter, error) {
	if consumer == nil {
		return nil, errors.New("shared Kafka consumer is required")
	}

	return &KafkaConsumerAdapter{
		consumer: consumer,
	}, nil
}

func (c *KafkaConsumerAdapter) Subscribe(
	ctx context.Context,
	topics []string,
	handler Handler,
) error {
	if c == nil || c.consumer == nil {
		return errors.New("shared Kafka consumer is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if len(topics) == 0 {
		return errors.New("Kafka topics are required")
	}
	if handler == nil {
		return errors.New("message handler is required")
	}

	c.topics = append([]string(nil), topics...)
	c.handler = handler

	return nil
}

func (c *KafkaConsumerAdapter) Start(
	ctx context.Context,
) error {
	if c == nil || c.consumer == nil {
		return errors.New("shared Kafka consumer is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if len(c.topics) == 0 {
		return errors.New("Kafka topics are not configured")
	}
	if c.handler == nil {
		return errors.New("Kafka message handler is not configured")
	}

	handler := sharedKafkaMessageHandler{
		handler: c.handler,
	}

	return c.consumer.Consume(ctx, handler)
}

func (c *KafkaConsumerAdapter) Stop(
	ctx context.Context,
) error {
	if c == nil || c.consumer == nil {
		return nil
	}
	if ctx == nil {
		return errors.New("context is required")
	}

	return c.consumer.Close()
}

type sharedKafkaMessageHandler struct {
	handler Handler
}

func (h sharedKafkaMessageHandler) Handle(
	ctx context.Context,
	message sharedkafka.ConsumerMessage,
) error {
	if h.handler == nil {
		return errors.New("device message handler is required")
	}

	return h.handler.Handle(
		ctx,
		Message{
			Topic: message.Topic,
			Key:   append([]byte(nil), message.Key...),
			Value: append([]byte(nil), message.Value...),
		},
	)
}
