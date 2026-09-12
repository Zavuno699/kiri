
package schemas

type LockCommandSchema struct {
	CommandType string
	Version     int
	Payload     any
}

