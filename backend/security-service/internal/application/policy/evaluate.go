package policy

type EvaluatePolicyQuery struct {
	PrincipalID string
	TenantID    string
	Resource    string
	Action      string
}
