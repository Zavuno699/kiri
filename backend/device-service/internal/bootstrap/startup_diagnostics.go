package bootstrap

type StartupDiagnostics struct {
	Build             BuildInfo
	Environment       string
	ConfigFingerprint string
	Configuration     RedactedConfig
	Dependencies      RuntimeDependencies
	Identity          RuntimeIdentity
}

func NewStartupDiagnostics(cfg Config) StartupDiagnostics {
	return StartupDiagnostics{
		Build:             NewBuildInfo(),
		Environment:       EnvironmentName(),
		ConfigFingerprint: ConfigFingerprint(cfg),
		Configuration:     NewRedactedConfig(cfg),
		Dependencies:      NewRuntimeDependencies(cfg),
		Identity:          NewRuntimeIdentity(cfg),
	}
}
