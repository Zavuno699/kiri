package config

import (
	"errors"
	"os"
)

type DatabaseConfig struct {
	URL string
}

func LoadDatabaseConfig() (DatabaseConfig, error) {
	// Canonical environment variable: DATABASE_URL
	// Used by identity-service, security-service, and shared components
	url := os.Getenv("DATABASE_URL")
	if url == "" {
		return DatabaseConfig{}, errors.New("DATABASE_URL environment variable is required")
	}

	return DatabaseConfig{
		URL: url,
	}, nil
}
