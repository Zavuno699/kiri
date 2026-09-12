
package audit

type AuditContext struct {
	Actor         string
	CorrelationID string
	RequestID     string
}

