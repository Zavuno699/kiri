
package api

type RequestEnvelope struct {
	RequestID     string
	CorrelationID string
	Payload       any
}

