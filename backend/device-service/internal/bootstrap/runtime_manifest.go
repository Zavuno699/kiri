package bootstrap

type RuntimeManifest struct {
	Service     string
	Environment string
	HTTPAddress string
	Database    PersistenceStatus
	Messaging   MessagingStatus
	Device      DeviceStatus
	Build       BuildInfo
}

func NewRuntimeManifest(
	cfg Config,
	production ProductionConfig,
) RuntimeManifest {
	return RuntimeManifest{
		Service:     "kiri-device-service",
		Environment: production.Environment,
		HTTPAddress: cfg.HTTPAddress,
		Database:    NewPersistenceStatus(cfg),
		Messaging:   NewMessagingStatus(cfg),
		Device:      NewDeviceStatus(cfg),
		Build:       NewBuildInfo(),
	}
}
