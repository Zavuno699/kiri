
package schemas

type SecurityWebhookSchema struct {
	Provider string
	Event    string
	Payload  any
}

