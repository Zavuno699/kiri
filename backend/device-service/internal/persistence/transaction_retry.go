package persistence

import (
	"errors"
	"strings"
)

var ErrRetryableTransaction = errors.New("retryable transaction")

func IsRetryableTransactionError(err error) bool {
	if err == nil {
		return false
	}

	message := strings.ToLower(err.Error())

	return strings.Contains(message, "restart transaction") ||
		strings.Contains(message, "serialization") ||
		strings.Contains(message, "retry transaction") ||
		strings.Contains(message, "40001")
}
