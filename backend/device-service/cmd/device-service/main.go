package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/kirilock/backend/device-service/internal/bootstrap"
)

func main() {
	ctx, cancel := signal.NotifyContext(
		context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
	)
	defer cancel()

	cfg := bootstrap.NewConfig()
	production := bootstrap.NewProductionConfig()

	if err := bootstrap.ValidateProductionConfiguration(
		cfg,
		production,
	); err != nil {
		log.Fatalf("invalid device-service configuration: %v", err)
	}

	if err := bootstrap.ValidateRuntimeDependencies(cfg); err != nil {
		log.Fatalf("invalid runtime dependencies: %v", err)
	}

	application, err := bootstrap.NewApplication(
		ctx,
		cfg,
	)
	if err != nil {
		log.Fatalf("device-service bootstrap failed: %v", err)
	}

	report := bootstrap.NewStartupReport(cfg)

	log.Printf(
		"device-service starting: %s",
		report.Summary(),
	)

	if production.StartupDiagnostics {
		diagnostics := bootstrap.NewStartupDiagnostics(cfg)

		log.Printf(
			"device-service runtime identity=%s environment=%s config_fingerprint=%s",
			diagnostics.Identity.Instance,
			diagnostics.Environment,
			diagnostics.ConfigFingerprint,
		)
	}

	runtime := bootstrap.NewRuntime(application)

	lifecycle := bootstrap.NewProductionLifecycle(
		runtime,
		bootstrap.ShutdownPolicy{
			Timeout: production.ShutdownTimeout,
		},
	)

	process := bootstrap.NewProductionProcess(lifecycle)

	if err := process.Run(ctx); err != nil {
		log.Fatalf(
			"device-service stopped with error: %v",
			err,
		)
	}

	log.Printf("device-service shutdown complete")
}
