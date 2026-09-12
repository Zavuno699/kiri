package response

type Device struct {
	ID           string `json:"id"`
	TenantID     string `json:"tenant_id"`
	Status       string `json:"status"`
	Connectivity string `json:"connectivity"`
}
