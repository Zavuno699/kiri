package settlement

type Settlement struct {
	ID          string
	PaymentID   string
	Reference   string
	Amount      int64
	Currency    string
	Status      string
	SettledAt   string
}
