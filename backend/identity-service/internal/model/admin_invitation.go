package model

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type AdminInvitationStatus string

const (
	AdminInvitationInvited  AdminInvitationStatus = "INVITED"
	AdminInvitationAccepted AdminInvitationStatus = "ACCEPTED"
	AdminInvitationRevoked  AdminInvitationStatus = "REVOKED"
	AdminInvitationExpired AdminInvitationStatus = "EXPIRED"
)

type AdminInvitation struct {
	ID                   uuid.UUID
	SubjectID            uuid.UUID
	InvitedBySubjectID   uuid.UUID
	IntendedRole         string
	Reason               string
	Department           string
	InvitationTokenHash  string
	InvitationExpiresAt  time.Time
	Status               AdminInvitationStatus
	SingleUse            bool
	AcceptedAt           *time.Time
	RevokedAt            *time.Time
	CreatedAt            time.Time
	UpdatedAt            time.Time
	Version              int
}

func (a AdminInvitation) Validate() error {
	if a.ID == uuid.Nil {
		return errors.New("id is required")
	}
	if a.SubjectID == uuid.Nil {
		return errors.New("subject_id is required")
	}
	if a.InvitedBySubjectID == uuid.Nil {
		return errors.New("invited_by_subject_id is required")
	}
	if a.IntendedRole == "" {
		return errors.New("intended_role is required")
	}
	if a.Reason == "" {
		return errors.New("reason is required")
	}
	if a.InvitationTokenHash == "" {
		return errors.New("invitation_token_hash is required")
	}
	if a.Version < 1 {
		return errors.New("version must be >= 1")
	}
	return nil
}

func (a AdminInvitation) IsExpired() bool {
	return time.Now().UTC().After(a.InvitationExpiresAt)
}

func (a AdminInvitation) IsValid() bool {
	return a.Status == AdminInvitationInvited && !a.IsExpired()
}
