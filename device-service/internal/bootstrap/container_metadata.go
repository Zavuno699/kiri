package bootstrap

type ContainerMetadata struct {
	Service     string
	Executable  string
	Environment string
}

func NewContainerMetadata(cfg ProductionConfig) ContainerMetadata {
	return ContainerMetadata{
		Service:     "kiri-device-service",
		Executable:  "device-service",
		Environment: cfg.Environment,
	}
}
