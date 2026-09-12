package ports

import "context"

type LockStore interface {
	Get(context.Context, string) (any, error)
	Save(context.Context, any) error
}
