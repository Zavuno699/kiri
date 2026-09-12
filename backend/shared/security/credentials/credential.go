package credentials

type Credential struct {
	ID         string
	SubjectID  string
	Type       string
	Status     string
	Version    int64
	ExpiresAt  string
	RevokedAt  string
	Revocation string
}
