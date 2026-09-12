
package observability

type LogMetadata struct {
	Service       string
	RequestID     string
	CorrelationID string
	TraceID       string
}

