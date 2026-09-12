package request

type CreateLease struct {
	TenantID   string `json:"tenant_id"`
	PropertyID string `json:"property_id"`
	UnitID     string `json:"unit_id"`
	Amount     int64  `json:"amount"`
	Currency   string `json:"currency"`
}
