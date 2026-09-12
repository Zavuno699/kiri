package event

type Event struct {
	ID         string
	Type       string
	SubjectID  string
	TenantID   string
	Payload    any
}
