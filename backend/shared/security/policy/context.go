package policy

type Context struct {
	PrincipalID string
	TenantID    string
	Resource    string
	Action      string
}
