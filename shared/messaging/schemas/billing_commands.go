
package schemas

type BillingCommandSchema struct {
	CommandType string
	Version     int
	Payload     any
}

