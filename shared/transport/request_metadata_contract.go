
package transport

type RequestMetadataContract struct {
	RequestID     string
	CorrelationID string
	CausationID   string
	ClientID      string
}

