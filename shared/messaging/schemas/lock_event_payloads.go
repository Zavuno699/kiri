
package schemas

type LockEventPayload struct {
	LockID string
	State  string
	Data   any
}

