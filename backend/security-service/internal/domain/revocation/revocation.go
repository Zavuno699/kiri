package revocation

type Record struct {
	CredentialID string
	Reason       string
	RevokedAt    string
	Version      int64
}
