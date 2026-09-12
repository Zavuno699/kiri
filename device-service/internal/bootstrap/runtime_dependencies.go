package bootstrap

type RuntimeDependencies struct {
	Database  PersistenceStatus
	Messaging MessagingStatus
	Device    DeviceStatus
}

func NewRuntimeDependencies(cfg Config) RuntimeDependencies {
	return RuntimeDependencies{
		Database:  NewPersistenceStatus(cfg),
		Messaging: NewMessagingStatus(cfg),
		Device:    NewDeviceStatus(cfg),
	}
}
