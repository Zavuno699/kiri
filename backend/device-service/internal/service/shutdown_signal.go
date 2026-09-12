package service

import (
	"context"
	"os"
	"os/signal"
	"syscall"
)

type DeviceShutdownSignal struct {
	Signals <-chan os.Signal
	Stop    func()
}

func NewDeviceShutdownSignal(
	stop func(),
) *DeviceShutdownSignal {
	signals := make(chan os.Signal, 1)

	signal.Notify(
		signals,
		syscall.SIGINT,
		syscall.SIGTERM,
	)

	return &DeviceShutdownSignal{
		Signals: signals,
		Stop:    stop,
	}
}

func (s *DeviceShutdownSignal) Wait(
	ctx context.Context,
) error {
	select {
	case <-ctx.Done():
		return ctx.Err()

	case <-s.Signals:
		s.Stop()
		return nil
	}
}
