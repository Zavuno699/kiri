package messaging

const (
	TopicPaymentCommand = "payment.command"
	TopicPaymentSettled = "payment.settled"
	TopicPaymentFailed  = "payment.failed"

	TopicLeaseCommand = "lease.command"
	TopicLeaseChanged = "lease.changed"

	TopicLockCommand       = "lock.command"
	TopicLockCommandResult = "lock.command.result"
	TopicLockStateChanged  = "lock.state.changed"

	TopicDeviceCommand       = "device.command"
	TopicDeviceCommandResult = "device.command.result"
	TopicDeviceConnected     = "device.connected"
	TopicDeviceDisconnected  = "device.disconnected"
	TopicDeviceHeartbeat     = "device.heartbeat"

	TopicSecurityAlert     = "security.alert"
	TopicCredentialRevoked = "security.credential.revoked"
)

func AllTopics() []string {
	return []string{
		TopicPaymentCommand,
		TopicPaymentSettled,
		TopicPaymentFailed,
		TopicLeaseCommand,
		TopicLeaseChanged,
		TopicLockCommand,
		TopicLockCommandResult,
		TopicLockStateChanged,
		TopicDeviceCommand,
		TopicDeviceCommandResult,
		TopicDeviceConnected,
		TopicDeviceDisconnected,
		TopicDeviceHeartbeat,
		TopicSecurityAlert,
		TopicCredentialRevoked,
	}
}
