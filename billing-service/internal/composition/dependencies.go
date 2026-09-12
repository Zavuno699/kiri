
package composition

type BillingServiceDependencies struct {
	Database        any
	PaymentProvider any
	Settlement      any
	Refund          any
}

