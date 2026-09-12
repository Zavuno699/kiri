
package schemas

type DeviceCommandSchema struct {
	CommandType string
	Version     int
	Payload     any
}

