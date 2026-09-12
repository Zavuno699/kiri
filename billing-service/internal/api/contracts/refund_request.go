
package contracts

type RefundRequest struct {
	PaymentID string
	Amount    int64
	Reason    string
}

