package bootstrap

import "syscall"

type ShutdownReason string

const (
	ShutdownReasonContext ShutdownReason = "context"
	ShutdownReasonSIGINT  ShutdownReason = "sigint"
	ShutdownReasonSIGTERM ShutdownReason = "sigterm"
	ShutdownReasonUnknown ShutdownReason = "unknown"
)

func ShutdownReasonFromSignal(signal syscall.Signal) ShutdownReason {
	switch signal {
	case syscall.SIGINT:
		return ShutdownReasonSIGINT
	case syscall.SIGTERM:
		return ShutdownReasonSIGTERM
	default:
		return ShutdownReasonUnknown
	}
}
