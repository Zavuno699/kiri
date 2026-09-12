package service

const (
	DeviceConnectedTopic    = "device.connected"
	DeviceDisconnectedTopic = "device.disconnected"
	DeviceCommandCompleted  = "device.command.completed"
	DeviceCommandFailed     = "device.command.failed"
)

func DefaultDeviceEventTopics() []string {
	return []string{
		DeviceConnectedTopic,
		DeviceDisconnectedTopic,
		DeviceCommandCompleted,
		DeviceCommandFailed,
	}
}
