package ports

import "context"

type BillingStore interface {
	Get(context.Context, string) (any, error)
	Save(context.Context, any) error
}
