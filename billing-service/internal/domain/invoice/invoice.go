package invoice

type Invoice struct {
	ID         string
	TenantID   string
	LeaseID    string
	Amount     int64
	Currency   string
	Status     string
	DueAt      string
}
