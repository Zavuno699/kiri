package audit

type RecordAuditCommand struct {
	ActorID      string
	Action       string
	ResourceType string
	ResourceID   string
	Outcome      string
	Reason       string
}
