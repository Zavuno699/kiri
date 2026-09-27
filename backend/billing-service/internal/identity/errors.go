package identity

import "errors"

// Sentinel errors for identity-service interactions
var (
	// ErrInvalidSession is returned when the session is invalid or expired (HTTP 401)
	ErrInvalidSession = errors.New("invalid session")

	// ErrForbidden is returned when the caller lacks sufficient scope (HTTP 403)
	ErrForbidden = errors.New("forbidden: insufficient scope")

	// ErrResponsibilityNotFound is returned when a payment responsibility does not exist (HTTP 404)
	ErrResponsibilityNotFound = errors.New("payment responsibility not found")

	// ErrResponsibilityConflict is returned when the responsibility is in an invalid state (HTTP 409)
	ErrResponsibilityConflict = errors.New("payment responsibility conflict")
)
