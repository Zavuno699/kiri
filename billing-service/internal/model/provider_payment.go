package model

// ProviderPayment is the provider-neutral representation of a payment.
//
// Flutterwave-specific response fields must not leak into the billing domain.
type ProviderPayment struct {
	ID        string
	Reference string
	Amount    int64
	Currency  string
	Status    string
}
