package payment

type Payment struct {
	ID          string
	LeaseID     string
	TenantID    string
	Provider    string
	Reference   string
	Amount      int64
	Currency    string
	Status      string
}
