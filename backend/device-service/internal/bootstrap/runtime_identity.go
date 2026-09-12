package bootstrap

type RuntimeIdentity struct {
	ServiceID   string
	Instance    string
	Environment string
}

func NewRuntimeIdentity(cfg Config) RuntimeIdentity {
	instance := cfg.ServiceID
	if instance == "" {
		instance = "kiri-device-service"
	}

	return RuntimeIdentity{
		ServiceID:   cfg.ServiceID,
		Instance:    instance,
		Environment: EnvironmentName(),
	}
}
