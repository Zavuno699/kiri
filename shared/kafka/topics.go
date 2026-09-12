package kafka

import "strings"

const (
	TopicPaymentSettled         = "payment.settled"
	TopicPaymentFailed          = "payment.failed"
	TopicLockCommand            = "lock.command"
	TopicLockCommandResult      = "lock.command.result"
	TopicLockStateChanged       = "lock.state.changed"
	TopicLeaseLifecycleEvents   = "lease.lifecycle.events"
	TopicSecurityAlarmTamper    = "security.alarm.tamper"
	TopicSecurityAlarmState     = "security.alarm.state"
	TopicSecurityCountermeasure = "security.countermeasure"
	TopicDeviceHeartbeat        = "device.heartbeat"
	TopicDeviceTelemetry        = "device.telemetry"

	TopicDeviceConnectivityChanged = "device.connectivity.changed"
)

func Topic(prefix, topic string) string {
	prefix = strings.TrimSuffix(strings.TrimSpace(prefix), ".")
	topic = strings.TrimPrefix(strings.TrimSpace(topic), ".")

	if prefix == "" {
		return topic
	}
	if topic == "" {
		return prefix
	}

	return prefix + "." + topic
}
