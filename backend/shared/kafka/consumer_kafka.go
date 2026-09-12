package kafka

import (
	"context"
	"errors"
	"strings"

	kafkaGo "github.com/segmentio/kafka-go"
	"golang.org/x/sync/errgroup"
)

type KafkaConsumer struct {
	readers map[string]*kafkaGo.Reader
}

func NewKafkaConsumer(cfg Config) (*KafkaConsumer, error) {
	if err := cfg.Validate(); err != nil {
		return nil, err
	}

	return &KafkaConsumer{
		readers: make(map[string]*kafkaGo.Reader),
	}, nil
}

func (c *KafkaConsumer) AddReader(
	cfg Config,
	topic string,
	groupID string,
) error {
	if c == nil {
		return errors.New("Kafka consumer is required")
	}

	if err := cfg.Validate(); err != nil {
		return err
	}

	topic = strings.TrimSpace(topic)
	groupID = strings.TrimSpace(groupID)

	if topic == "" {
		return errors.New("Kafka topic is required")
	}
	if groupID == "" {
		return errors.New("Kafka consumer group ID is required")
	}

	if _, exists := c.readers[topic]; exists {
		return errors.New("Kafka reader already exists")
	}

	c.readers[topic] = kafkaGo.NewReader(kafkaGo.ReaderConfig{
		Brokers:  cfg.Brokers,
		Topic:    topic,
		GroupID:  groupID,
		MinBytes: 1,
		MaxBytes: 10e6,
	})

	return nil
}

func (c *KafkaConsumer) Consume(
	ctx context.Context,
	handler MessageHandler,
) error {
	if c == nil {
		return errors.New("Kafka consumer is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if handler == nil {
		return errors.New("Kafka message handler is required")
	}
	if len(c.readers) == 0 {
		return errors.New("no Kafka readers are configured")
	}

	group, groupCtx := errgroup.WithContext(ctx)

	for topic, reader := range c.readers {
		topic := topic
		reader := reader

		group.Go(func() error {
			for {
				message, err := reader.FetchMessage(groupCtx)
				if err != nil {
					if errors.Is(err, context.Canceled) ||
						errors.Is(err, context.DeadlineExceeded) {
						return nil
					}

					return errors.New(
						"fetch Kafka topic " + topic + ": " + err.Error(),
					)
				}

				consumerMessage := ConsumerMessage{
					Topic:     message.Topic,
					Partition: message.Partition,
					Offset:    message.Offset,
					Key:       message.Key,
					Value:     message.Value,
					EventID:   headerValue(message.Headers, "event-id"),
					EventType: headerValue(message.Headers, "event-type"),
				}

				if err := consumerMessage.Validate(); err != nil {
					return err
				}

				if err := handler.Handle(groupCtx, consumerMessage); err != nil {
					return err
				}

				if err := reader.CommitMessages(groupCtx, message); err != nil {
					return errors.New(
						"commit Kafka topic " + topic + ": " + err.Error(),
					)
				}
			}
		})
	}

	return group.Wait()
}

func headerValue(headers []kafkaGo.Header, key string) string {
	for _, header := range headers {
		if header.Key == key {
			return string(header.Value)
		}
	}

	return ""
}

func (c *KafkaConsumer) Close() error {
	if c == nil {
		return nil
	}

	var firstErr error

	for topic, reader := range c.readers {
		if err := reader.Close(); err != nil && firstErr == nil {
			firstErr = errors.New(
				"close Kafka reader " + topic + ": " + err.Error(),
			)
		}
	}

	c.readers = make(map[string]*kafkaGo.Reader)

	return firstErr
}
