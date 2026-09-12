package identity

type Principal struct {
	ID        string
	TenantID  string
	Roles     []string
	Scopes    []string
	SessionID string
}
