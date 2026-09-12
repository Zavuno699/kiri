package bootstrap

import "fmt"

type ErrorClass string

const (
	ErrorClassConfiguration ErrorClass = "configuration"
	ErrorClassPersistence   ErrorClass = "persistence"
	ErrorClassRuntime       ErrorClass = "runtime"
	ErrorClassShutdown      ErrorClass = "shutdown"
)

type BootstrapError struct {
	Class ErrorClass
	Err   error
}

func (e *BootstrapError) Error() string {
	if e == nil {
		return ""
	}

	if e.Err == nil {
		return string(e.Class)
	}

	return fmt.Sprintf("%s: %v", e.Class, e.Err)
}

func (e *BootstrapError) Unwrap() error {
	if e == nil {
		return nil
	}

	return e.Err
}

func WrapBootstrapError(class ErrorClass, err error) error {
	if err == nil {
		return nil
	}

	return &BootstrapError{
		Class: class,
		Err:   err,
	}
}
