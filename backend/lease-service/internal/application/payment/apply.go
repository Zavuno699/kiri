package payment

type ApplyPaymentCommand struct {
	LeaseID   string
	TenantID  string
	Reference string
	Amount    int64
	Currency  string
	Provider  string
}
