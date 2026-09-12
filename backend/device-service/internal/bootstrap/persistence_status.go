package bootstrap

type PersistenceStatus struct {
	Enabled bool
	Driver  string
}

func NewPersistenceStatus(cfg Config) PersistenceStatus {
	return PersistenceStatus{
		Enabled: cfg.DatabaseEnabled,
		Driver:  cfg.DatabaseDriver,
	}
}
