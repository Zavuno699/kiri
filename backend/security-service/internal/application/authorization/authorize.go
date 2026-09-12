package authorization

type AuthorizeQuery struct {
	PrincipalID string
	TenantID    string
	Resource    string
	Action      string
}
