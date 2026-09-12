
package api

type WebhookRequest struct {
	Provider string
	Topic    string
	Payload  any
}

