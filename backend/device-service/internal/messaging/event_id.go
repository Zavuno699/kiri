package messaging

import "github.com/google/uuid"

func newEventID() string {
	return uuid.New().String()
}
