package composition

import (
	"database/sql"

	"github.com/kirilock/backend/device-service/internal/application/ports"
	"github.com/kirilock/backend/device-service/internal/persistence"
)

type ProductionRepositoryBinding struct {
	Provider ports.RepositoryProvider
}

func NewProductionRepositoryBinding(
	db *sql.DB,
) *ProductionRepositoryBinding {
	if db == nil {
		return &ProductionRepositoryBinding{}
	}

	factory := persistence.NewRepositoryFactory(db)
	provider := ports.NewProductionRepositoryProvider(factory)

	return &ProductionRepositoryBinding{
		Provider: provider,
	}
}

func (b *ProductionRepositoryBinding) Repository() ports.RepositoryProvider {
	if b == nil {
		return nil
	}

	return b.Provider
}

func (b *ProductionRepositoryBinding) Dependencies() *DeviceServiceDependencies {
	if b == nil {
		return nil
	}

	return &DeviceServiceDependencies{
		Database:   nil,
		MessageBus: nil,
		Repository: b.Provider,
	}
}
