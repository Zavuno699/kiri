package model

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type AdminProfileStatus string

const (
	AdminProfileProfileCompleted AdminProfileStatus = "PROFILE_COMPLETED"
	AdminProfileVettingPending   AdminProfileStatus = "VETTING_PENDING"
	AdminProfileUnderReview       AdminProfileStatus = "UNDER_REVIEW"
	AdminProfileApproved          AdminProfileStatus = "APPROVED"
	AdminProfileActive            AdminProfileStatus = "ACTIVE"
	AdminProfileRejected          AdminProfileStatus = "REJECTED"
	AdminProfileSuspended         AdminProfileStatus = "SUSPENDED"
	AdminProfileRevoked           AdminProfileStatus = "REVOKED"
)

type AdminProfile struct {
	ID                  uuid.UUID
	SubjectID           uuid.UUID
	Role                string
	Status              AdminProfileStatus
	Department          string
	Justification       string
	VettingNotes        string
	ApprovedBySubjectID *uuid.UUID
	ApprovedAt          *time.Time
	RejectedBySubjectID *uuid.UUID
	RejectedAt          *time.Time
	RejectionReason     string
	SuspendedBySubjectID *uuid.UUID
	SuspendedAt         *time.Time
	SuspensionReason    string
	ReactivatedBySubjectID *uuid.UUID
	ReactivatedAt       *time.Time
	EffectiveFrom       time.Time
	EffectiveUntil      *time.Time
	CreatedAt           time.Time
	UpdatedAt           time.Time
	Version             int
}

func (a AdminProfile) Validate() error {
	if a.ID == uuid.Nil {
		return errors.New("id is required")
	}
	if a.SubjectID == uuid.Nil {
		return errors.New("subject_id is required")
	}
	if a.Role == "" {
		return errors.New("role is required")
	}
	if a.Status == "" {
		return errors.New("status is required")
	}
	if a.Version < 1 {
		return errors.New("version must be >= 1")
	}
	return nil
}

func (a AdminProfile) IsActive() bool {
	return a.Status == AdminProfileActive &&
		(a.EffectiveUntil == nil || time.Now().UTC().Before(*a.EffectiveUntil))
}

func (a AdminProfile) IsSuspended() bool {
	return a.Status == AdminProfileSuspended
}

func (a AdminProfile) IsRevoked() bool {
	return a.Status == AdminProfileRevoked
}
