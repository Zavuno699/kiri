package bootstrap

import (
	"context"
	"fmt"

	"github.com/kirilock/backend/device-service/internal/messaging"
	"github.com/kirilock/backend/device-service/internal/service"
)

type Application struct {
	Diagnostics *RuntimeDiagnostics
	Messaging   *MessagingComposition
	Config      Config
	Core        *Core
	Persistence *PersistenceRuntime
	Runtime     *Runtime
}

func NewApplication(ctx context.Context, cfg Config) (*Application, error) {
	if err := cfg.Validate(); err != nil {
		return nil, WrapBootstrapError(ErrorClassConfiguration, err)
	}

	if !cfg.DatabaseEnabled {
		return nil, fmt.Errorf(
			"production database must be enabled",
		)
	}

	persistenceRuntime, err := NewPersistenceRuntime(ctx, cfg)
	if err != nil {
		return nil, err
	}

	if persistenceRuntime == nil ||
		persistenceRuntime.Runtime == nil ||
		persistenceRuntime.Runtime.Database == nil ||
		persistenceRuntime.Runtime.Database.DB == nil {
		return nil, fmt.Errorf(
			"production persistence runtime is required",
		)
	}

	messagingRuntime := messaging.NewDefaultRuntime()

	core := NewCore(
		cfg,
		persistenceRuntime,
		messagingRuntime,
	)

	if core == nil || core.Integrations == nil {
		return nil, fmt.Errorf(
			"production device-service integrations are required",
		)
	}

	deviceWorker := service.NewDefaultDeviceWorker(
		core.Integrations,
	)

	if deviceWorker == nil || deviceWorker.Handler == nil {
		return nil, fmt.Errorf(
			"production device worker handler is required",
		)
	}

	domainRoutes := messaging.NewDeviceDomainRoutes(
		deviceWorker.Handler,
	)

	if err := messaging.ValidateProductionEventRoutes(domainRoutes); err != nil {
		return nil, err
	}

	router := messaging.NewEventRouter(domainRoutes...)

	messagingComposition, err := NewMessagingCompositionWithRuntime(
		messagingRuntime,
		router,
	)
	if err != nil {
		return nil, err
	}

	application := &Application{
		Diagnostics: NewRuntimeDiagnostics(cfg),
		Messaging:   messagingComposition,
		Config:      cfg,
		Core:        core,
		Persistence: persistenceRuntime,
	}

	runtime := NewRuntime(application)
	application.Runtime = runtime

	return application, nil
}

func (a *Application) Start(ctx context.Context) error {
	if a == nil || a.Runtime == nil {
		return nil
	}

	if a.Diagnostics != nil {
		a.Diagnostics.Lifecycle.Record(
			NewLifecycleEvent(LifecycleStarting, "application start"),
		)
	}

	if err := a.Runtime.Start(ctx); err != nil {
		if a.Diagnostics != nil {
			a.Diagnostics.Lifecycle.Record(
				NewLifecycleEvent(LifecycleFailed, err.Error()),
			)
		}
		return err
	}

	if a.Diagnostics != nil {
		a.Diagnostics.Lifecycle.Record(
			NewLifecycleEvent(LifecycleStarted, "application started"),
		)
	}

	return nil
}

func (a *Application) Stop(ctx context.Context) error {
	if a == nil {
		return nil
	}

	if a.Diagnostics != nil {
		a.Diagnostics.Lifecycle.Record(
			NewLifecycleEvent(LifecycleStopping, "application shutdown"),
		)
	}

	var firstErr error

	if a.Runtime != nil {
		if err := a.Runtime.Stop(ctx); err != nil && firstErr == nil {
			firstErr = err
		}
	}

	if a.Persistence != nil {
		if err := a.Persistence.Close(ctx); err != nil && firstErr == nil {
			firstErr = err
		}
	}

	if a.Diagnostics != nil {
		if firstErr != nil {
			a.Diagnostics.Lifecycle.Record(
				NewLifecycleEvent(LifecycleFailed, firstErr.Error()),
			)
		} else {
			a.Diagnostics.Lifecycle.Record(
				NewLifecycleEvent(LifecycleStopped, "application stopped"),
			)
		}
	}

	return firstErr
}
