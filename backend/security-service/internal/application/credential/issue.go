package credential

type IssueCredentialCommand struct {
	PrincipalID string
	Type        string
	ExpiresAt   string
}
