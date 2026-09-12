package persistence

import "context"

type Bootstrap struct {
	Config  ConfigProvider
	Factory *ConnectionFactory
}

type ConfigProvider interface {
	Config() DatabaseConfig
}

type EnvironmentConfigProvider struct{}

func NewEnvironmentConfigProvider() *EnvironmentConfigProvider {
	return &EnvironmentConfigProvider{}
}

func (p *EnvironmentConfigProvider) Config() DatabaseConfig {
	return NewEnvironmentConfig()
}

func NewBootstrap() *Bootstrap {
	return &Bootstrap{
		Config:  NewEnvironmentConfigProvider(),
		Factory: NewProductionFactory(),
	}
}

func (b *Bootstrap) Open(
	ctx context.Context,
) (*Application, error) {
	config := b.Config.Config()

	database, err := b.Factory.Open(
		config,
	)
	if err != nil {
		return nil, err
	}

	runtime := NewRuntime(
		config,
		database,
		NewMigrationRunner(database),
	)

	if err := runtime.Start(ctx); err != nil {
		_ = runtime.Stop(ctx)
		return nil, err
	}

	return NewApplication(runtime), nil
}
