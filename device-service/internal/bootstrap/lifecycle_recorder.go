package bootstrap

type LifecycleRecorder struct {
	Events []LifecycleEvent
}

func NewLifecycleRecorder() *LifecycleRecorder {
	return &LifecycleRecorder{
		Events: make([]LifecycleEvent, 0, 8),
	}
}

func (r *LifecycleRecorder) Record(event LifecycleEvent) {
	if r == nil {
		return
	}

	r.Events = append(r.Events, event)
}

func (r *LifecycleRecorder) Last() (LifecycleEvent, bool) {
	if r == nil || len(r.Events) == 0 {
		return LifecycleEvent{}, false
	}

	return r.Events[len(r.Events)-1], true
}
