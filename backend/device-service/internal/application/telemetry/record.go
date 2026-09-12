package telemetry

type RecordTelemetryCommand struct {
	DeviceID string
	Data     map[string]float64
}
