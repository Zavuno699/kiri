package service

import (
	"context"
	"errors"
	"sync"
	"time"
)

type OutboxWorkerState string

const (
	OutboxWorkerStopped  OutboxWorkerState = "STOPPED"
	OutboxWorkerRunning  OutboxWorkerState = "RUNNING"
	OutboxWorkerStopping OutboxWorkerState = "STOPPING"
)

type ManagedDeviceOutboxWorker struct {
	worker *DeviceOutboxWorker

	mu     sync.Mutex
	state  OutboxWorkerState
	cancel context.CancelFunc
	done   chan struct{}
	err    error
}

func NewManagedDeviceOutboxWorker(
	worker *DeviceOutboxWorker,
) (*ManagedDeviceOutboxWorker, error) {
	if worker == nil {
		return nil, errors.New("outbox worker is required")
	}

	return &ManagedDeviceOutboxWorker{
		worker: worker,
		state:  OutboxWorkerStopped,
	}, nil
}

func (m *ManagedDeviceOutboxWorker) Start(parent context.Context) error {
	if parent == nil {
		return errors.New("context is required")
	}

	m.mu.Lock()

	if m.state == OutboxWorkerRunning {
		m.mu.Unlock()
		return errors.New("outbox worker is already running")
	}

	if m.state == OutboxWorkerStopping {
		m.mu.Unlock()
		return errors.New("outbox worker is stopping")
	}

	ctx, cancel := context.WithCancel(parent)

	m.cancel = cancel
	m.done = make(chan struct{})
	m.err = nil
	m.state = OutboxWorkerRunning

	done := m.done

	m.mu.Unlock()

	go func() {
		err := m.worker.Start(ctx)

		m.mu.Lock()
		m.err = normalizeWorkerError(err)
		m.state = OutboxWorkerStopped
		close(done)
		m.cancel = nil
		m.mu.Unlock()
	}()

	return nil
}

func (m *ManagedDeviceOutboxWorker) Stop(
	ctx context.Context,
) error {
	if ctx == nil {
		return errors.New("context is required")
	}

	m.mu.Lock()

	if m.state == OutboxWorkerStopped {
		m.mu.Unlock()
		return nil
	}

	if m.state == OutboxWorkerStopping {
		done := m.done
		m.mu.Unlock()

		select {
		case <-done:
			return nil
		case <-ctx.Done():
			return ctx.Err()
		}
	}

	m.state = OutboxWorkerStopping

	cancel := m.cancel
	done := m.done

	m.mu.Unlock()

	if cancel != nil {
		cancel()
	}

	select {
	case <-done:
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}

func (m *ManagedDeviceOutboxWorker) State() OutboxWorkerState {
	m.mu.Lock()
	defer m.mu.Unlock()

	return m.state
}

func (m *ManagedDeviceOutboxWorker) Err() error {
	m.mu.Lock()
	defer m.mu.Unlock()

	return m.err
}

func normalizeWorkerError(err error) error {
	if err == nil {
		return nil
	}

	if errors.Is(err, context.Canceled) ||
		errors.Is(err, context.DeadlineExceeded) {
		return nil
	}

	return err
}

func WaitForWorkerShutdown(
	ctx context.Context,
	done <-chan struct{},
	timeout time.Duration,
) error {
	if ctx == nil {
		return errors.New("context is required")
	}
	if done == nil {
		return errors.New("done channel is required")
	}
	if timeout <= 0 {
		return errors.New("timeout must be positive")
	}

	timer := time.NewTimer(timeout)
	defer timer.Stop()

	select {
	case <-done:
		return nil

	case <-timer.C:
		return errors.New("outbox worker shutdown timed out")

	case <-ctx.Done():
		return ctx.Err()
	}
}
