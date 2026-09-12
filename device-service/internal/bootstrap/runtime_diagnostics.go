package bootstrap

type RuntimeDiagnostics struct {
	Identity     RuntimeIdentity
	Dependencies DependencyStates
	Lifecycle    *LifecycleRecorder
}

func NewRuntimeDiagnostics(cfg Config) *RuntimeDiagnostics {
	return &RuntimeDiagnostics{
		Identity:     NewRuntimeIdentity(cfg),
		Dependencies: NewDependencyStates(cfg),
		Lifecycle:    NewLifecycleRecorder(),
	}
}
