
package idempotency

type IdempotencyResult struct {
	Replayed bool
	Status   string
	Payload  any
}

