
package contracts

type PaymentCreateRequest struct {
	PaymentID string
	Amount    int64
	Currency  string
}

