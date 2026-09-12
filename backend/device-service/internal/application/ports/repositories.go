package ports

import "context"

type DeviceRepository interface{}
type DeviceEventRepository interface{}
type DeviceStateRepository interface{}

type RepositoryProvider interface {
	DeviceRepository() DeviceRepository
	DeviceEventRepository() DeviceEventRepository
	DeviceStateRepository() DeviceStateRepository
}

type Context interface {
	context.Context
}
