export interface DeviceTelemetryQuery {
  deviceId: string
  window?: "hour" | "day" | "week"
}
