package service

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/kirilock/backend/device-service/internal/repository"
)

type OutboxPublisher interface {
	Publish(context.Context, repository.DeviceOutboxEvent) error
}

type DeviceOutboxPublisherApplication struct {
	repo          repository.DeviceOutboxClaimRepository
	publisher     OutboxPublisher
	retryPolicy   *DeviceOutboxRetryPolicy
	claimDuration time.Duration
}

func NewDeviceOutboxPublisherApplication(
	repo repository.DeviceOutboxClaimRepository,
	publisher OutboxPublisher,
	config DeviceOutboxConfig,
) (*DeviceOutboxPublisherApplication, error) {
	if repo == nil {
		return nil, errors.New("outbox repository is required")
	}
	if publisher == nil {
		return nil, errors.New("outbox publisher is required")
	}
	if err := config.Validate(); err != nil {
		return nil, err
	}

	retryPolicy, err := NewDeviceOutboxRetryPolicy(config)
	if err != nil {
		return nil, err
	}

	return &DeviceOutboxPublisherApplication{
		repo:          repo,
		publisher:     publisher,
		retryPolicy:   retryPolicy,
		claimDuration: config.ClaimDuration,
	}, nil
}

func (a *DeviceOutboxPublisherApplication) PublishNext(
	ctx context.Context,
	now time.Time,
) (bool, error) {
	if ctx == nil {
		return false, errors.New("context is required")
	}
	if now.IsZero() {
		return false, errors.New("publication time is required")
	}

	event, err := a.repo.ClaimNext(
		ctx,
		now.UTC(),
		a.claimDuration,
	)
	if err != nil {
		return false, err
	}

	if event == nil {
		return false, nil
	}

	if err := a.publisher.Publish(ctx, *event); err != nil {
		failure := fmt.Sprintf(
			"outbox publication failed: %v",
			err,
		)

		retryAt, retryErr := a.retryPolicy.NextAvailableAt(
			*event,
			now.UTC(),
		)
		if retryErr != nil {
			return false, errors.Join(err, retryErr)
		}

		retryDelay := retryAt.Sub(now.UTC())

		if markErr := a.repo.MarkFailed(
			ctx,
			event.ID,
			now.UTC(),
			failure,
			retryDelay,
		); markErr != nil {
			return false, errors.Join(err, markErr)
		}

		return true, err
	}

	if err := a.repo.MarkPublished(
		ctx,
		event.ID,
		now.UTC(),
	); err != nil {
		return false, err
	}

	return true, nil
}
