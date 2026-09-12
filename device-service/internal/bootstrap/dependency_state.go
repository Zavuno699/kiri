package bootstrap

type DependencyState string

const (
	DependencyUnknown     DependencyState = "unknown"
	DependencyDisabled    DependencyState = "disabled"
	DependencyConfigured  DependencyState = "configured"
	DependencyReady       DependencyState = "ready"
	DependencyUnavailable DependencyState = "unavailable"
)

type DependencyStates struct {
	Database  DependencyState
	Messaging DependencyState
	Device    DependencyState
}

func NewDependencyStates(cfg Config) DependencyStates {
	database := DependencyDisabled
	if cfg.DatabaseEnabled {
		database = DependencyConfigured
	}

	messaging := DependencyUnknown
	if cfg.MessageClientID != "" {
		messaging = DependencyConfigured
	}

	device := DependencyUnknown
	if cfg.DeviceAddress != "" {
		device = DependencyConfigured
	}

	return DependencyStates{
		Database:  database,
		Messaging: messaging,
		Device:    device,
	}
}
