package request

type Authenticate struct {
	PrincipalID string `json:"principal_id"`
	Credential  string `json:"credential"`
	Method      string `json:"method"`
}

type Authorize struct {
	PrincipalID string `json:"principal_id"`
	Resource    string `json:"resource"`
	Action      string `json:"action"`
}
