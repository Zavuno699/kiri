package bootstrap

import "time"

type LifecycleEventType string

const (
	LifecycleCreated  LifecycleEventType = "created"
	LifecycleStarting LifecycleEventType = "starting"
	LifecycleStarted  LifecycleEventType = "started"
	LifecycleStopping LifecycleEventType = "stopping"
	LifecycleStopped  LifecycleEventType = "stopped"
	LifecycleFailed   LifecycleEventType = "failed"
)

type LifecycleEvent struct {
	Type      LifecycleEventType
	Timestamp time.Time
	Reason    string
}

func NewLifecycleEvent(
	eventType LifecycleEventType,
	reason string,
) LifecycleEvent {
	return LifecycleEvent{
		Type:      eventType,
		Timestamp: time.Now().UTC(),
		Reason:    reason,
	}
}
