package service

type RuntimeLoggerAdapter struct {
	Logger DeviceServiceLogger
}

func NewRuntimeLoggerAdapter(
	logger DeviceServiceLogger,
) *RuntimeLoggerAdapter {
	return &RuntimeLoggerAdapter{
		Logger: logger,
	}
}

func (l *RuntimeLoggerAdapter) Started() {
	l.Logger.Info("device service runtime started")
}

func (l *RuntimeLoggerAdapter) Stopped() {
	l.Logger.Info("device service runtime stopped")
}
