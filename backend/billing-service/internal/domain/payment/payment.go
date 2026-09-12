package payment

type Payment struct {
	ID        string
	TenantID  string
	LeaseID   string
	Provider  string
	Reference string
	Amount    int64
	Currency  string
	Status    string
}
