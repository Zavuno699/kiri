
package api

type ResponseEnvelope struct {
	RequestID     string
	CorrelationID string
	Payload       any
}

