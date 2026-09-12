package config

import (
	"errors"
	"os"
)

type DatabaseConfig struct {
	URL string
}

func LoadDatabaseConfig() (DatabaseConfig, error) {
	url := os.Getenv("KIRILOCK_DATABASE_URL")
	if url == "" {
		return DatabaseConfig{}, errors.New("KIRILOCK_DATABASE_URL is required")
	}

	return DatabaseConfig{
		URL: url,
	}, nil
}
