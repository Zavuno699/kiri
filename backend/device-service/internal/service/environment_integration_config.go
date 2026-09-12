package service

import (
	"os"
	"strconv"
	"strings"
)

func NewEnvironmentDeviceIntegrationConfig() *DeviceIntegrationConfig {
	timeout := 5000

	if raw := os.Getenv("DEVICE_TIMEOUT_MS"); raw != "" {
		if parsed, err := strconv.Atoi(raw); err == nil && parsed > 0 {
			timeout = parsed
		}
	}

	var brokers []string

	if raw := os.Getenv("DEVICE_MESSAGE_BROKERS"); raw != "" {
		for _, value := range strings.Split(raw, ",") {
			value = strings.TrimSpace(value)
			if value != "" {
				brokers = append(brokers, value)
			}
		}
	}

	return NewDeviceIntegrationConfig(
		os.Getenv("DEVICE_DB_DRIVER"),
		os.Getenv("DEVICE_DB_DSN"),
		brokers,
		os.Getenv("DEVICE_MESSAGE_CLIENT_ID"),
		os.Getenv("DEVICE_ADDRESS"),
		timeout,
	)
}
