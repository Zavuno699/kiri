package session

type RevokeSessionCommand struct {
	SessionID string
	Reason    string
}
