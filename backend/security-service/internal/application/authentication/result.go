package authentication

type Result struct {
	Authenticated bool
	PrincipalID   string
	SessionID     string
	Reason        string
}
