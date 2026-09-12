package telemetry

import "time"

type Sample struct {
	DeviceID  string
	RecordedAt time.Time
	Metrics   map[string]float64
}
