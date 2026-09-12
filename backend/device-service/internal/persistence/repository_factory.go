package persistence

import "database/sql"

type RepositoryFactory struct {
	DB *sql.DB
}

func NewRepositoryFactory(
	db *sql.DB,
) *RepositoryFactory {
	return &RepositoryFactory{
		DB: db,
	}
}

func (f *RepositoryFactory) DeviceRepository() *DeviceRepositoryV2 {
	return NewDeviceRepositoryV2(
		f.DB,
	)
}

func (f *RepositoryFactory) EventRepository() *EventRepositoryV2 {
	return NewEventRepositoryV2(
		f.DB,
	)
}

func (f *RepositoryFactory) TransactionManager() *TransactionManager {
	return NewTransactionManager(
		NewDatabase(f.DB),
	)
}
