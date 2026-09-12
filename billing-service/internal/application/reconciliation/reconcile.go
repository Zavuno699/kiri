package reconciliation

type ReconcilePaymentCommand struct {
	PaymentID string
	Reference string
	Amount    int64
	Currency  string
}
