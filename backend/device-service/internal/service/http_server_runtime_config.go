package service

import (
	"os"
	"strconv"
	"time"
)

type DeviceHTTPRuntimeConfig struct {
	Address         string
	RequestTimeout  time.Duration
	MaxBodyBytes    int64
	ShutdownTimeout time.Duration
}

func NewEnvironmentDeviceHTTPRuntimeConfig() DeviceHTTPRuntimeConfig {
	address := os.Getenv("DEVICE_SERVICE_HTTP_ADDRESS")
	port := os.Getenv("DEVICE_SERVICE_HTTP_PORT")

	if address == "" {
		address = "0.0.0.0"
	}

	if port == "" {
		port = "8080"
	}

	requestTimeout := 15 * time.Second
	if raw := os.Getenv("DEVICE_SERVICE_HTTP_TIMEOUT_SECONDS"); raw != "" {
		if value, err := strconv.Atoi(raw); err == nil && value > 0 {
			requestTimeout = time.Duration(value) * time.Second
		}
	}

	shutdownTimeout := 30 * time.Second
	if raw := os.Getenv("DEVICE_SERVICE_SHUTDOWN_GRACE_SECONDS"); raw != "" {
		if value, err := strconv.Atoi(raw); err == nil && value > 0 {
			shutdownTimeout = time.Duration(value) * time.Second
		}
	}

	maxBodyBytes := int64(1 << 20)
	if raw := os.Getenv("DEVICE_SERVICE_HTTP_MAX_BODY_BYTES"); raw != "" {
		if value, err := strconv.ParseInt(raw, 10, 64); err == nil && value > 0 {
			maxBodyBytes = value
		}
	}

	return DeviceHTTPRuntimeConfig{
		Address:         address + ":" + port,
		RequestTimeout:  requestTimeout,
		MaxBodyBytes:    maxBodyBytes,
		ShutdownTimeout: shutdownTimeout,
	}
}
