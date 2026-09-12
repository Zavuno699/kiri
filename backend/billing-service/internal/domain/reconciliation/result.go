package reconciliation

type Result struct {
	PaymentID      string
	Matched        bool
	ExpectedAmount int64
	ObservedAmount int64
	Reason         string
}
