
package schemas

type PaymentWebhookSchema struct {
	Provider string
	Event    string
	Payload  any
}

