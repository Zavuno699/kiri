package ports

import "context"

type LeaseStore interface {
	Get(context.Context, string) (any, error)
	Save(context.Context, any) error
}
