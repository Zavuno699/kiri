package refund

type CreateRefundCommand struct {
	PaymentID string
	Amount    int64
	Currency  string
	Reason    string
}
