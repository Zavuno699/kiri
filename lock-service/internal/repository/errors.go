package repository

import "errors"

var (
	ErrLockNotFound        = errors.New("lock not found")
	ErrLockVersionConflict = errors.New("lock version conflict")
)
