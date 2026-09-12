package audit

type Record struct {
	ID           string
	ActorID      string
	TenantID     string
	Action       string
	ResourceType string
	ResourceID   string
	Outcome      string
	Reason       string
}
