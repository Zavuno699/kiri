package ports

import "context"

type DeviceStore interface {
	Get(context.Context, string) (any, error)
	Save(context.Context, any) error
}
