package messaging

import "errors"

var (
	ErrRetryDelivery      = errors.New("message delivery should be retried")
	ErrDeadLetterDelivery = errors.New("message should be dead-lettered")
	ErrRejectedDelivery   = errors.New("message delivery rejected")
)
