package kafka

import (
	"context"
	"errors"
	"strings"
	"sync"
)

type ConsumerService struct {
	consumer Consumer

	mu      sync.Mutex
	running bool
}

func NewConsumerService(consumer Consumer) (*ConsumerService, error) {
	if consumer == nil {
		return nil, errors.New("Kafka consumer is required")
	}

	return &ConsumerService{
		consumer: consumer,
	}, nil
}

func (s *ConsumerService) Start(
	ctx context.Context,
	handler MessageHandler,
) error {
	if s == nil {
		return errors.New("Kafka consumer service is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if handler == nil {
		return errors.New("Kafka message handler is required")
	}

	s.mu.Lock()
	if s.running {
		s.mu.Unlock()
		return errors.New("Kafka consumer service is already running")
	}
	s.running = true
	s.mu.Unlock()

	defer func() {
		s.mu.Lock()
		s.running = false
		s.mu.Unlock()
	}()

	return s.consumer.Consume(ctx, handler)
}

func (s *ConsumerService) Running() bool {
	if s == nil {
		return false
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	return s.running
}

func ConsumerGroupName(serviceName string) string {
	return strings.TrimSpace(serviceName) + "-consumer"
}
