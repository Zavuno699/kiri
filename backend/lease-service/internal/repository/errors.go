package repository

import "errors"

var (
	ErrLeaseNotFound        = errors.New("lease not found")
	ErrLeaseAlreadyLocked   = errors.New("lease already locked")
	ErrLeaseVersionConflict = errors.New("lease version conflict")
)
