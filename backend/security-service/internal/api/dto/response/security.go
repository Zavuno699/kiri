package response

type Authentication struct {
	Authenticated bool     `json:"authenticated"`
	Subject       string   `json:"subject"`
	Roles         []string `json:"roles"`
	Permissions   []string `json:"permissions"`
}

type Authorization struct {
	Allowed bool   `json:"allowed"`
	Reason  string `json:"reason"`
}
