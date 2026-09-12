
package transport

type RequestContract struct {
	RequestID     string
	CorrelationID string
	Payload       any
}

