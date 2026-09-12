package service

import (
	"context"
	"sync"
)

type DeviceProductionProcess struct {
	Runtime *DeviceProductionProcessRuntime

	mu      sync.Mutex
	running bool
}

func NewDeviceProductionProcess(
	runtime *DeviceProductionProcessRuntime,
) *DeviceProductionProcess {
	return &DeviceProductionProcess{
		Runtime: runtime,
	}
}

func (p *DeviceProductionProcess) Start(
	ctx context.Context,
) error {
	p.mu.Lock()

	if p.running {
		p.mu.Unlock()
		return nil
	}

	p.mu.Unlock()

	if err := p.Runtime.Start(ctx); err != nil {
		return err
	}

	p.mu.Lock()
	p.running = true
	p.mu.Unlock()

	return nil
}

func (p *DeviceProductionProcess) Stop(
	ctx context.Context,
) error {
	p.mu.Lock()

	if !p.running {
		p.mu.Unlock()
		return nil
	}

	p.mu.Unlock()

	if err := p.Runtime.Stop(ctx); err != nil {
		return err
	}

	p.mu.Lock()
	p.running = false
	p.mu.Unlock()

	return nil
}

func (p *DeviceProductionProcess) Running() bool {
	p.mu.Lock()
	defer p.mu.Unlock()

	return p.running
}
