package service

import (
	"context"
	"errors"
	"sync"
	"time"
)

type DeviceOutboxWorker struct {
	publisher *DeviceOutboxPublisherApplication
	interval  time.Duration

	mu      sync.Mutex
	running bool
}

func NewDeviceOutboxWorker(
	publisher *DeviceOutboxPublisherApplication,
	config DeviceOutboxConfig,
) (*DeviceOutboxWorker, error) {
	if publisher == nil {
		return nil, errors.New("outbox publisher is required")
	}
	if err := config.Validate(); err != nil {
		return nil, err
	}

	return &DeviceOutboxWorker{
		publisher: publisher,
		interval:  config.PollInterval,
	}, nil
}

func (w *DeviceOutboxWorker) Start(ctx context.Context) error {
	if w == nil {
		return errors.New("worker is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}

	w.mu.Lock()
	if w.running {
		w.mu.Unlock()
		return errors.New("outbox worker is already running")
	}
	w.running = true
	w.mu.Unlock()

	defer func() {
		w.mu.Lock()
		w.running = false
		w.mu.Unlock()
	}()

	for {
		if err := ctx.Err(); err != nil {
			return err
		}

		_, err := w.publisher.PublishNext(ctx, time.Now().UTC())
		if err != nil {
			if errors.Is(err, context.Canceled) ||
				errors.Is(err, context.DeadlineExceeded) {
				return err
			}
		}

		timer := time.NewTimer(w.interval)

		select {
		case <-ctx.Done():
			if !timer.Stop() {
				<-timer.C
			}
			return ctx.Err()

		case <-timer.C:
		}
	}
}

func (w *DeviceOutboxWorker) Running() bool {
	w.mu.Lock()
	defer w.mu.Unlock()

	return w.running
}
