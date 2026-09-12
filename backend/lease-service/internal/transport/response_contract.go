
package transport

type ResponseContract struct {
	RequestID     string
	CorrelationID string
	Payload       any
}

