
package audit

type AuditRecord struct {
	ID         string
	Actor      string
	Action     string
	Resource   string
	Result     string
}

