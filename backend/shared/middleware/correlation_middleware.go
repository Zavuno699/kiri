
package middleware

type CorrelationMiddleware struct{}

func NewCorrelationMiddleware() *CorrelationMiddleware {
	return &CorrelationMiddleware{}
}

