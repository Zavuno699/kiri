package heartbeat

import "time"

type Message struct {
	DeviceID string
	At       time.Time
	Status   string
}
