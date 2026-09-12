package ports

import "github.com/kirilock/backend/device-service/internal/persistence"
import infrastructurerepository "github.com/kirilock/backend/device-service/internal/infrastructure/repository"

type ProductionRepositoryProvider struct {
	factory *persistence.RepositoryFactory
}

func NewProductionRepositoryProvider(
	factory *persistence.RepositoryFactory,
) *ProductionRepositoryProvider {
	return &ProductionRepositoryProvider{
		factory: factory,
	}
}

func (p *ProductionRepositoryProvider) DeviceRepository() DeviceRepository {
	if p == nil || p.factory == nil {
		return nil
	}

	return p.factory.DeviceRepository()
}

func (p *ProductionRepositoryProvider) DeviceEventRepository() DeviceEventRepository {
	if p == nil || p.factory == nil {
		return nil
	}

	return p.factory.EventRepository()
}

func (p *ProductionRepositoryProvider) DeviceStateRepository() DeviceStateRepository {
	if p == nil {
		return nil
	}

	return &infrastructurerepository.StateRepository{}
}

var _ RepositoryProvider = (*ProductionRepositoryProvider)(nil)
