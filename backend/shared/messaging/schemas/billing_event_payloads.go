
package schemas

type BillingEventPayload struct {
	PaymentID string
	Status    string
	Data      any
}

