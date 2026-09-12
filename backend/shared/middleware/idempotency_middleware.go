
package middleware

type IdempotencyMiddlewareContract struct{}

func NewIdempotencyMiddlewareContract() *IdempotencyMiddlewareContract {
	return &IdempotencyMiddlewareContract{}
}

