package service

type DefaultDeviceServiceLogger struct{}

func NewDefaultDeviceServiceLogger() *DefaultDeviceServiceLogger {
	return &DefaultDeviceServiceLogger{}
}

func (l *DefaultDeviceServiceLogger) Info(string) {}

func (l *DefaultDeviceServiceLogger) Error(string) {}
