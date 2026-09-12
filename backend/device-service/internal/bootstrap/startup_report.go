package bootstrap

import "fmt"

type StartupReport struct {
	Build         BuildInfo
	Environment   string
	Configuration EnvironmentSnapshot
}

func NewStartupReport(cfg Config) StartupReport {
	return StartupReport{
		Build:         NewBuildInfo(),
		Environment:   EnvironmentName(),
		Configuration: NewEnvironmentSnapshot(cfg),
	}
}

func (r StartupReport) Summary() string {
	return fmt.Sprintf(
		"service=%s version=%s environment=%s http=%s database_enabled=%t",
		r.Build.Service,
		r.Build.Version,
		r.Environment,
		r.Configuration.HTTPAddress,
		r.Configuration.DatabaseEnabled,
	)
}
