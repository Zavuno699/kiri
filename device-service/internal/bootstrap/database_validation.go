package bootstrap

import (
	"errors"
	"net/url"
	"strings"
)

func ValidateDatabaseConfiguration(cfg Config) error {
	if !cfg.DatabaseEnabled {
		return nil
	}

	if strings.TrimSpace(cfg.DatabaseDSN) == "" {
		return errors.New("database DSN is required")
	}

	if cfg.DatabaseDriver == "" {
		return errors.New("database driver is required")
	}

	if cfg.DatabaseDriver != "pgx" {
		return errors.New("production database driver must be pgx")
	}

	parsed, err := url.Parse(cfg.DatabaseDSN)
	if err != nil {
		return err
	}

	if parsed.Scheme == "" {
		return errors.New("database DSN must include a scheme")
	}

	if parsed.Host == "" {
		return errors.New("database DSN must include a host")
	}

	return nil
}
