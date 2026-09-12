package invoice

type CreateInvoiceCommand struct {
	TenantID string
	LeaseID  string
	Amount   int64
	Currency string
	DueAt    string
}
