package bootstrap

import (
	"errors"
	"strings"
)

func ValidateRuntimeDependencies(cfg Config) error {
	if strings.TrimSpace(cfg.HTTPAddress) == "" {
		return errors.New("http address is required")
	}

	if cfg.DeviceAddress != "" && cfg.DeviceTimeoutMS <= 0 {
		return errors.New("device timeout must be greater than zero")
	}

	if cfg.DatabaseEnabled {
		if strings.TrimSpace(cfg.DatabaseDriver) == "" {
			return errors.New("database driver is required when database is enabled")
		}

		if strings.TrimSpace(cfg.DatabaseDSN) == "" {
			return errors.New("database dsn is required when database is enabled")
		}
	}

	return nil
}
