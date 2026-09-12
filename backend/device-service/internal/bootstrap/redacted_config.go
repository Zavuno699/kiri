package bootstrap

type RedactedConfig struct {
	ServiceID           string
	HTTPAddress         string
	DatabaseEnabled     bool
	DatabaseDriver      string
	DatabaseMaxOpen     int
	DatabaseMaxIdle     int
	DatabaseMaxLifetime int
	DatabaseMaxIdleTime int
	MessageClientID     string
	DeviceAddress       string
	DeviceTimeoutMS     int
}

func NewRedactedConfig(cfg Config) RedactedConfig {
	return RedactedConfig{
		ServiceID:           cfg.ServiceID,
		HTTPAddress:         cfg.HTTPAddress,
		DatabaseEnabled:     cfg.DatabaseEnabled,
		DatabaseDriver:      cfg.DatabaseDriver,
		DatabaseMaxOpen:     cfg.DatabaseMaxOpen,
		DatabaseMaxIdle:     cfg.DatabaseMaxIdle,
		DatabaseMaxLifetime: cfg.DatabaseMaxLifetime,
		DatabaseMaxIdleTime: cfg.DatabaseMaxIdleTime,
		MessageClientID:     cfg.MessageClientID,
		DeviceAddress:       cfg.DeviceAddress,
		DeviceTimeoutMS:     cfg.DeviceTimeoutMS,
	}
}
