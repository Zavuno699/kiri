package messaging

import (
	"os"
	"strings"
)

func NewEnvironmentConfig() Config {
	var brokers []string

	if raw := os.Getenv("DEVICE_MESSAGE_BROKERS"); raw != "" {
		for _, broker := range strings.Split(raw, ",") {
			broker = strings.TrimSpace(broker)
			if broker != "" {
				brokers = append(brokers, broker)
			}
		}
	}

	clientID := os.Getenv("DEVICE_MESSAGE_CLIENT_ID")
	if clientID == "" {
		clientID = "device-service"
	}

	return NewConfig(
		brokers,
		clientID,
	)
}
