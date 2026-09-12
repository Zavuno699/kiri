package bootstrap

import "errors"

var (
	ErrInvalidShutdownTimeout = errors.New("shutdown timeout must be greater than zero")
)
