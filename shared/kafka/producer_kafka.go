package kafka

import (
	"context"
	"errors"
	"strings"
	"time"

	kafkaGo "github.com/segmentio/kafka-go"
)

type KafkaProducer struct {
	writers map[string]*kafkaGo.Writer
}

func NewKafkaProducer(cfg Config) (*KafkaProducer, error) {
	if err := cfg.Validate(); err != nil {
		return nil, err
	}

	return &KafkaProducer{
		writers: make(map[string]*kafkaGo.Writer),
	}, nil
}

func (p *KafkaProducer) Publish(
	ctx context.Context,
	message Message,
) error {
	if p == nil {
		return errors.New("Kafka producer is required")
	}

	if err := message.Validate(); err != nil {
		return err
	}

	if ctx == nil {
		return errors.New("context is required")
	}

	writer, err := p.writer(message.Topic)
	if err != nil {
		return err
	}

	return writer.WriteMessages(ctx, kafkaGo.Message{
		Key:   message.Key,
		Value: message.Value,
		Headers: []kafkaGo.Header{
			{
				Key:   "event-id",
				Value: []byte(message.EventID),
			},
			{
				Key:   "event-type",
				Value: []byte(message.EventType),
			},
		},
	})
}

func (p *KafkaProducer) writer(topic string) (*kafkaGo.Writer, error) {
	if strings.TrimSpace(topic) == "" {
		return nil, errors.New("Kafka topic is required")
	}

	if writer, ok := p.writers[topic]; ok {
		return writer, nil
	}

	return nil, errors.New("Kafka writer is not configured")
}

func (p *KafkaProducer) AddWriter(
	cfg Config,
	topic string,
) error {
	if p == nil {
		return errors.New("Kafka producer is required")
	}

	if err := cfg.Validate(); err != nil {
		return err
	}

	topic = strings.TrimSpace(topic)
	if topic == "" {
		return errors.New("Kafka topic is required")
	}

	if _, exists := p.writers[topic]; exists {
		return errors.New("Kafka writer already exists")
	}

	p.writers[topic] = &kafkaGo.Writer{
		Addr:         kafkaGo.TCP(cfg.Brokers...),
		Topic:        topic,
		Balancer:     &kafkaGo.Hash{},
		RequiredAcks: kafkaGo.RequireOne,
		BatchTimeout: 10 * time.Millisecond,
	}

	return nil
}

func (p *KafkaProducer) Close() error {
	if p == nil {
		return nil
	}

	var firstErr error

	for topic, writer := range p.writers {
		if err := writer.Close(); err != nil && firstErr == nil {
			firstErr = errors.New("close Kafka writer " + topic + ": " + err.Error())
		}
	}

	p.writers = make(map[string]*kafkaGo.Writer)

	return firstErr
}
