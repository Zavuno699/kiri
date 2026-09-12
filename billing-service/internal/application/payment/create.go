package payment

type CreatePaymentCommand struct {
	TenantID  string
	LeaseID   string
	Provider  string
	Reference string
	Amount    int64
	Currency  string
}
