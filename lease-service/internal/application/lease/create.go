package lease

type CreateLeaseCommand struct {
	LeaseID    string
	TenantID   string
	PropertyID string
	UnitID     string
	Amount     int64
	Currency   string
}
