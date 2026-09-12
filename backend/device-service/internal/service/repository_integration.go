package service

import "context"

type RepositoryIntegration struct {
	Repository      DeviceServiceRepository
	EventRepository DeviceServiceEventRepository
}

func NewRepositoryIntegration(
	repository DeviceServiceRepository,
	eventRepository DeviceServiceEventRepository,
) *RepositoryIntegration {
	return &RepositoryIntegration{
		Repository:      repository,
		EventRepository: eventRepository,
	}
}

func (r *RepositoryIntegration) Get(
	ctx context.Context,
	id string,
) (DeviceRecord, error) {
	return r.Repository.Get(ctx, id)
}

func (r *RepositoryIntegration) Save(
	ctx context.Context,
	record DeviceRecord,
) error {
	return r.Repository.Save(ctx, record)
}

func (r *RepositoryIntegration) AppendEvent(
	ctx context.Context,
	message DeviceServiceMessage,
) error {
	return r.EventRepository.Append(ctx, message)
}
