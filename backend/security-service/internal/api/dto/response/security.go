package response

type Authentication struct {
	Authenticated bool   `json:"authenticated"`
	PrincipalID   string `json:"principal_id"`
	SessionID     string `json:"session_id"`
}

type Authorization struct {
	Allowed bool   `json:"allowed"`
	Reason  string `json:"reason"`
}
