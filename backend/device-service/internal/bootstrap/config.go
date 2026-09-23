package bootstrap

import (
	"os"
	"strconv"
)

type Config struct {
	ServiceID           string
	HTTPAddress         string
	DatabaseEnabled     bool
	DatabaseDriver      string
	DatabaseDSN         string
	DatabaseMaxOpen     int
	DatabaseMaxIdle     int
	DatabaseMaxLifetime int
	DatabaseMaxIdleTime int
	MessageClientID     string
	DeviceAddress       string
	DeviceTimeoutMS     int
}

func NewConfig() Config {
	timeout := 5000

	if raw := os.Getenv("DEVICE_TIMEOUT_MS"); raw != "" {
		if parsed, err := strconv.Atoi(raw); err == nil && parsed > 0 {
			timeout = parsed
		}
	}

	address := os.Getenv("DEVICE_SERVICE_HTTP_ADDRESS")
	port := os.Getenv("PORT") // Railway injection
	if port == "" {
		port = os.Getenv("DEVICE_SERVICE_HTTP_PORT")
	}
	if port == "" {
		port = "8080"
	}

	if address == "" {
		address = "0.0.0.0"
	}

	driver := os.Getenv("DEVICE_DB_DRIVER")
	dsn := os.Getenv("DEVICE_DB_DSN")

	if driver == "" && dsn != "" {
		driver = "pgx"
	}

	databaseEnabled := dsn != ""

	maxOpen := 25
	if raw := os.Getenv("DEVICE_DB_MAX_OPEN_CONNS"); raw != "" {
		if parsed, err := strconv.Atoi(raw); err == nil && parsed > 0 {
			maxOpen = parsed
		}
	}

	maxIdle := 10
	if raw := os.Getenv("DEVICE_DB_MAX_IDLE_CONNS"); raw != "" {
		if parsed, err := strconv.Atoi(raw); err == nil && parsed >= 0 {
			maxIdle = parsed
		}
	}

	maxLifetime := 30
	if raw := os.Getenv("DEVICE_DB_MAX_LIFETIME_MINUTES"); raw != "" {
		if parsed, err := strconv.Atoi(raw); err == nil && parsed > 0 {
			maxLifetime = parsed
		}
	}

	maxIdleTime := 5
	if raw := os.Getenv("DEVICE_DB_MAX_IDLE_MINUTES"); raw != "" {
		if parsed, err := strconv.Atoi(raw); err == nil && parsed > 0 {
			maxIdleTime = parsed
		}
	}

	return Config{
		ServiceID:           os.Getenv("DEVICE_SERVICE_ID"),
		HTTPAddress:         address + ":" + port,
		DatabaseEnabled:     databaseEnabled,
		DatabaseDriver:      driver,
		DatabaseDSN:         dsn,
		DatabaseMaxOpen:     maxOpen,
		DatabaseMaxIdle:     maxIdle,
		DatabaseMaxLifetime: maxLifetime,
		DatabaseMaxIdleTime: maxIdleTime,
		MessageClientID:     os.Getenv("DEVICE_MESSAGE_CLIENT_ID"),
		DeviceAddress:       os.Getenv("DEVICE_ADDRESS"),
		DeviceTimeoutMS:     timeout,
	}
}
