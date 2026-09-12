package refund

type Refund struct {
	ID        string
	PaymentID string
	Amount    int64
	Currency  string
	Status    string
	Reason    string
}
