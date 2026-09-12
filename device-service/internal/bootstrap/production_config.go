package bootstrap

import (
	"os"
	"strconv"
	"strings"
	"time"
)

type ProductionConfig struct {
	Environment        string
	ShutdownTimeout    time.Duration
	ReadinessRequired  bool
	StartupDiagnostics bool
}

func NewProductionConfig() ProductionConfig {
	shutdownTimeout := 30 * time.Second

	if raw := strings.TrimSpace(os.Getenv("KIRI_SHUTDOWN_TIMEOUT_SECONDS")); raw != "" {
		if seconds, err := strconv.Atoi(raw); err == nil && seconds > 0 {
			shutdownTimeout = time.Duration(seconds) * time.Second
		}
	}

	readinessRequired := true
	if raw := strings.TrimSpace(os.Getenv("KIRI_READINESS_REQUIRED")); raw != "" {
		if parsed, err := strconv.ParseBool(raw); err == nil {
			readinessRequired = parsed
		}
	}

	startupDiagnostics := true
	if raw := strings.TrimSpace(os.Getenv("KIRI_STARTUP_DIAGNOSTICS")); raw != "" {
		if parsed, err := strconv.ParseBool(raw); err == nil {
			startupDiagnostics = parsed
		}
	}

	return ProductionConfig{
		Environment:        EnvironmentName(),
		ShutdownTimeout:    shutdownTimeout,
		ReadinessRequired:  readinessRequired,
		StartupDiagnostics: startupDiagnostics,
	}
}

func (c ProductionConfig) Validate() error {
	if c.ShutdownTimeout <= 0 {
		return ErrInvalidShutdownTimeout
	}

	return nil
}
