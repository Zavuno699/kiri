package http

import (
	"context"

	"github.com/google/uuid"
)

type contextKey string

const (
	requestIDKey     contextKey = "kirilock.request_id"
	correlationIDKey contextKey = "kirilock.correlation_id"
)

func RequestID(ctx context.Context) string {
	value, _ := ctx.Value(requestIDKey).(string)
	return value
}

func CorrelationID(ctx context.Context) string {
	value, _ := ctx.Value(correlationIDKey).(string)
	return value
}

func WithRequestMetadata(
	ctx context.Context,
	requestID string,
	correlationID string,
) context.Context {
	if requestID == "" {
		requestID = uuid.NewString()
	}

	if correlationID == "" {
		correlationID = requestID
	}

	ctx = context.WithValue(ctx, requestIDKey, requestID)
	ctx = context.WithValue(ctx, correlationIDKey, correlationID)

	return ctx
}
