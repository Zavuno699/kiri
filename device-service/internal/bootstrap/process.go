package bootstrap

import (
	"context"
	"time"
)

type Process struct {
	Runtime *Runtime
}

func NewProcess(
	runtime *Runtime,
) *Process {
	return &Process{
		Runtime: runtime,
	}
}

func (p *Process) Run(
	ctx context.Context,
) error {
	if err := p.Runtime.Start(ctx); err != nil {
		return err
	}

	<-ctx.Done()

	stopCtx, cancel := context.WithTimeout(
		context.Background(),
		30*time.Second,
	)
	defer cancel()

	return p.Runtime.Stop(stopCtx)
}
