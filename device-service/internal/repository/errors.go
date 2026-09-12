package repository

import "errors"

var (
	ErrDeviceNotFound        = errors.New("device not found")
	ErrGatewayNotFound       = errors.New("gateway not found")
	ErrDeviceVersionConflict = errors.New("device version conflict")
)
