
package schemas

type LeaseCommandSchema struct {
	CommandType string
	Version     int
	Payload     any
}

