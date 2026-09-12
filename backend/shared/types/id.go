package types

import (
	"errors"
	"strings"

	"github.com/google/uuid"
)

var ErrInvalidID = errors.New("invalid ID")

// ID is the canonical KiriLock identifier.
//
// IDs are represented as UUIDs at the wire/storage boundary while
// remaining a distinct Go type inside the application.
type ID string

func NewID() ID {
	return ID(uuid.NewString())
}

func ParseID(value string) (ID, error) {
	value = strings.TrimSpace(value)

	if value == "" {
		return "", ErrInvalidID
	}

	if _, err := uuid.Parse(value); err != nil {
		return "", ErrInvalidID
	}

	return ID(value), nil
}

func (id ID) String() string {
	return string(id)
}

func (id ID) Empty() bool {
	return strings.TrimSpace(string(id)) == ""
}
