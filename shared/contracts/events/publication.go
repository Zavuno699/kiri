package events

type Publication struct {
	Metadata Metadata
	TenantID string
	Key      string
	Topic    string
	Payload  any
}
