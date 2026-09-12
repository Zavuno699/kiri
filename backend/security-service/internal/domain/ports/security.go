package ports

import "context"

type SecurityStore interface {
	Get(context.Context, string) (any, error)
	Save(context.Context, any) error
}
