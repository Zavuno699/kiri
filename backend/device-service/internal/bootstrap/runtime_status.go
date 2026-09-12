package bootstrap

import "time"

type RuntimeStatus string

const (
	RuntimeStatusCreated  RuntimeStatus = "created"
	RuntimeStatusStarting RuntimeStatus = "starting"
	RuntimeStatusRunning  RuntimeStatus = "running"
	RuntimeStatusStopping RuntimeStatus = "stopping"
	RuntimeStatusStopped  RuntimeStatus = "stopped"
	RuntimeStatusFailed   RuntimeStatus = "failed"
)

type RuntimeSnapshot struct {
	Status      RuntimeStatus
	StartedAt   time.Time
	StoppedAt   time.Time
	Transition  time.Time
	HealthReady bool
}

func NewRuntimeSnapshot() RuntimeSnapshot {
	now := time.Now().UTC()

	return RuntimeSnapshot{
		Status:     RuntimeStatusCreated,
		Transition: now,
	}
}
