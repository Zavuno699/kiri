package lease

type Entity struct {
	ID         string
	TenantID   string
	PropertyID string
	UnitID     string
	Status     string
	Currency   string
	Amount     int64
}
