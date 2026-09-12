package bootstrap

import (
	"errors"
	"fmt"
	"net"
	"strings"
)

func (c Config) Validate() error {
	if strings.TrimSpace(c.HTTPAddress) == "" {
		return errors.New("http address is required")
	}

	host, port, err := net.SplitHostPort(c.HTTPAddress)
	if err != nil {
		return fmt.Errorf("invalid http address %q: %w", c.HTTPAddress, err)
	}

	if strings.TrimSpace(host) == "" {
		return fmt.Errorf("http host is required in %q", c.HTTPAddress)
	}

	if strings.TrimSpace(port) == "" {
		return fmt.Errorf("http port is required in %q", c.HTTPAddress)
	}

	if c.DeviceTimeoutMS <= 0 {
		return errors.New("device timeout must be greater than zero")
	}

	if c.DatabaseEnabled {
		if strings.TrimSpace(c.DatabaseDriver) == "" {
			return errors.New("database driver is required when database is enabled")
		}

		if strings.TrimSpace(c.DatabaseDSN) == "" {
			return errors.New("database dsn is required when database is enabled")
		}

		if c.DatabaseMaxOpen <= 0 {
			return errors.New("database max open connections must be greater than zero")
		}

		if c.DatabaseMaxIdle < 0 {
			return errors.New("database max idle connections cannot be negative")
		}

		if c.DatabaseMaxLifetime <= 0 {
			return errors.New("database max lifetime must be greater than zero")
		}

		if c.DatabaseMaxIdleTime <= 0 {
			return errors.New("database max idle time must be greater than zero")
		}
	}

	return nil
}
