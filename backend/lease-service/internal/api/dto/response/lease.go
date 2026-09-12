package response

type Lease struct {
	ID         string `json:"id"`
	TenantID   string `json:"tenant_id"`
	PropertyID string `json:"property_id"`
	UnitID     string `json:"unit_id"`
	Status     string `json:"status"`
}
