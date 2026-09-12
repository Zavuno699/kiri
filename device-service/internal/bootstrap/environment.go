package bootstrap

import "os"

type EnvironmentSnapshot struct {
	ServiceID       string
	HTTPAddress     string
	DatabaseEnabled bool
	DatabaseDriver  string
	MessageClientID string
	DeviceAddress   string
	DeviceTimeoutMS int
}

func NewEnvironmentSnapshot(cfg Config) EnvironmentSnapshot {
	return EnvironmentSnapshot{
		ServiceID:       cfg.ServiceID,
		HTTPAddress:     cfg.HTTPAddress,
		DatabaseEnabled: cfg.DatabaseEnabled,
		DatabaseDriver:  cfg.DatabaseDriver,
		MessageClientID: cfg.MessageClientID,
		DeviceAddress:   cfg.DeviceAddress,
		DeviceTimeoutMS: cfg.DeviceTimeoutMS,
	}
}

func EnvironmentName() string {
	if value := os.Getenv("KIRI_ENV"); value != "" {
		return value
	}

	if value := os.Getenv("ENVIRONMENT"); value != "" {
		return value
	}

	return "development"
}
