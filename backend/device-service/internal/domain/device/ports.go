package device

import "context"

type Repository interface {
	Get(context.Context, string) (Entity, error)
	Save(context.Context, Entity) error
	Delete(context.Context, string) error
}
