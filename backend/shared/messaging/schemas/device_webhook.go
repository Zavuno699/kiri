
package schemas

type DeviceWebhookSchema struct {
	Provider string
	Event    string
	Payload  any
}

