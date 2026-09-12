package settlement

type ApplySettlementCommand struct {
	PaymentID string
	Reference string
	Amount    int64
	Currency  string
}
