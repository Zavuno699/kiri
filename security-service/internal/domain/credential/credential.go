package credential

type Credential struct {
	ID         string
	PrincipalID string
	Type       string
	Status     string
	Version    int64
	ExpiresAt  string
}
