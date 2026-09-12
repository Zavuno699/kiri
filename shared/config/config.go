package config

import (
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Config struct {
	App  AppConfig
	HTTP HTTPConfig
}

type AppConfig struct {
	Name        string
	Environment string
}

type HTTPConfig struct {
	Host string
	Port int
}

func Load() (Config, error) {
	cfg := Config{
		App: AppConfig{
			Name:        getEnv("APP_NAME", "kirilock"),
			Environment: getEnv("APP_ENV", "development"),
		},
		HTTP: HTTPConfig{
			Host: getEnv("HTTP_HOST", "0.0.0.0"),
		},
	}

	port, err := strconv.Atoi(getEnv("HTTP_PORT", "8080"))

	if err != nil {
		return Config{}, fmt.Errorf("invalid HTTP_PORT: %w", err)
	}

	if port < 1 || port > 65535 {
		return Config{}, errors.New("HTTP_PORT must be between 1 and 65535")
	}

	cfg.HTTP.Port = port

	if strings.TrimSpace(cfg.App.Name) == "" {
		return Config{}, errors.New("APP_NAME cannot be empty")
	}

	if strings.TrimSpace(cfg.App.Environment) == "" {
		return Config{}, errors.New("APP_ENV cannot be empty")
	}

	return cfg, nil
}

func getEnv(key string, fallback string) string {
	value, exists := os.LookupEnv(key)

	if !exists || strings.TrimSpace(value) == "" {
		return fallback
	}

	return strings.TrimSpace(value)
}
