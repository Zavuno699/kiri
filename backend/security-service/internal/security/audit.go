package security

import "time"

type AuditAction string

const (
	AuditAuthenticationSuccess AuditAction = "authentication.success"
	AuditAuthenticationFailure AuditAction = "authentication.failure"
	AuditAuthorizationDenied   AuditAction = "authorization.denied"
	AuditCredentialIssued      AuditAction = "credential.issued"
	AuditCredentialRevoked     AuditAction = "credential.revoked"
	AuditSecurityStateChanged  AuditAction = "security.state.changed"
	AuditTenancyInvited        AuditAction = "tenancy.invited"
	AuditTenancyActivated      AuditAction = "tenancy.activated"
	AuditTenancyRevoked        AuditAction = "tenancy.revoked"
	AuditTenancyResent         AuditAction = "tenancy.resent"
	AuditTenancyTerminated     AuditAction = "tenancy.terminated"
	AuditLockAuthorized        AuditAction = "lock.authorized"
	AuditLockDenied            AuditAction = "lock.denied"
)

type AuditEvent struct {
	ID           string
	Action       AuditAction
	Subject      string
	Actor        string
	CredentialID string
	Resource     string
	Reason       string
	OccurredAt   time.Time
	Metadata     map[string]string
}
