package messaging

import (
	"context"
	"errors"
)

type ConsumerService struct {
	Config    ConsumerConfig
	Processor *MessageDeliveryProcessor
	State     *ConsumerState
}

func NewConsumerService(
	config ConsumerConfig,
	processor *MessageDeliveryProcessor,
) *ConsumerService {
	return &ConsumerService{
		Config:    config,
		Processor: processor,
		State:     &ConsumerState{},
	}
}

func (s *ConsumerService) Start() {
	if s == nil {
		return
	}

	if s.State == nil {
		s.State = &ConsumerState{}
	}

	s.State.Start()
}

func (s *ConsumerService) Stop() {
	if s == nil || s.State == nil {
		return
	}

	s.State.Stop()
}

func (s *ConsumerService) Handle(
	ctx context.Context,
	message Message,
) error {
	if s == nil {
		return errors.New("consumer service is required")
	}

	if ctx == nil {
		return errors.New("context is required")
	}

	if s.Processor == nil {
		return errors.New("message delivery processor is required")
	}

	if s.State == nil {
		s.State = &ConsumerState{}
	}

	if !s.State.Started() {
		s.Start()
	}

	result := s.Processor.Process(
		ctx,
		message,
		1,
	)

	s.State.Record(result)

	switch result.Decision.Outcome {
	case DeliveryAcknowledged:
		return nil

	case DeliveryRetriable:
		return ErrRetryDelivery

	case DeliveryDeadLettered:
		return ErrDeadLetterDelivery

	default:
		return ErrRejectedDelivery
	}
}

func (s *ConsumerService) Snapshot() ConsumerSnapshot {
	if s == nil || s.State == nil {
		return ConsumerSnapshot{}
	}

	return s.State.Snapshot()
}
