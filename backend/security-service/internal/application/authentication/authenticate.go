package authentication

type AuthenticateCommand struct {
	PrincipalID string
	Credential  string
	Method      string
}
