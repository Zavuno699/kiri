package messaging

import "context"

type processingContextKey string

const (
	correlationContextKey processingContextKey = "kiri.correlation_id"
	causationContextKey   processingContextKey = "kiri.causation_id"
)

func WithCorrelationID(
	ctx context.Context,
	correlationID string,
) context.Context {
	return context.WithValue(
		ctx,
		correlationContextKey,
		correlationID,
	)
}

func WithCausationID(
	ctx context.Context,
	causationID string,
) context.Context {
	return context.WithValue(
		ctx,
		causationContextKey,
		causationID,
	)
}

func CorrelationID(ctx context.Context) string {
	if ctx == nil {
		return ""
	}

	value, _ := ctx.Value(correlationContextKey).(string)

	return value
}

func CausationID(ctx context.Context) string {
	if ctx == nil {
		return ""
	}

	value, _ := ctx.Value(causationContextKey).(string)

	return value
}
