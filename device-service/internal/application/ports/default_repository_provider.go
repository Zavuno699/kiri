package ports

type DefaultRepositoryProvider struct {
	deviceRepository      DeviceRepository
	deviceEventRepository DeviceEventRepository
	deviceStateRepository DeviceStateRepository
}

func NewDefaultRepositoryProvider(
	deviceRepository DeviceRepository,
	deviceEventRepository DeviceEventRepository,
	deviceStateRepository DeviceStateRepository,
) *DefaultRepositoryProvider {
	return &DefaultRepositoryProvider{
		deviceRepository:      deviceRepository,
		deviceEventRepository: deviceEventRepository,
		deviceStateRepository: deviceStateRepository,
	}
}

func (p *DefaultRepositoryProvider) DeviceRepository() DeviceRepository {
	if p == nil {
		return nil
	}
	return p.deviceRepository
}

func (p *DefaultRepositoryProvider) DeviceEventRepository() DeviceEventRepository {
	if p == nil {
		return nil
	}
	return p.deviceEventRepository
}

func (p *DefaultRepositoryProvider) DeviceStateRepository() DeviceStateRepository {
	if p == nil {
		return nil
	}
	return p.deviceStateRepository
}
