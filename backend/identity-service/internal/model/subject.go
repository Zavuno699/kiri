package model

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type Subject struct {
	ID           uuid.UUID
	SubjectID    string
	Email        string
	PasswordHash string
	Roles        []string
	IsAdmin      bool
	IsSuperAdmin bool
	CreatedAt    time.Time
	UpdatedAt    time.Time
	Version      int
}

func (s Subject) Validate() error {
	if s.ID == uuid.Nil {
		return errors.New("id is required")
	}
	if s.SubjectID == "" {
		return errors.New("subject_id is required")
	}
	if s.Email == "" {
		return errors.New("email is required")
	}
	if s.PasswordHash == "" {
		return errors.New("password_hash is required")
	}
	if s.Version < 1 {
		return errors.New("version must be >= 1")
	}
	return nil
}
