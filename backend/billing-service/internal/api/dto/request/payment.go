package request

type CreatePayment struct {
	TenantID  string `json:"tenant_id"`
	LeaseID   string `json:"lease_id"`
	Provider  string `json:"provider"`
	Reference string `json:"reference"`
	Amount    int64  `json:"amount"`
	Currency  string `json:"currency"`
}
