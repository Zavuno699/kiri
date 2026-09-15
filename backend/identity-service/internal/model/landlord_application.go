package model

import (
	"time"

	"github.com/google/uuid"
)

type LandlordApplicationStatus string

const (
	LandlordApplicationStatusPendingRegistration    LandlordApplicationStatus = "PENDING_REGISTRATION"
	LandlordApplicationStatusPendingVerification    LandlordApplicationStatus = "PENDING_VERIFICATION"
	LandlordApplicationStatusPendingExternalVerification LandlordApplicationStatus = "PENDING_EXTERNAL_VERIFICATION"
	LandlordApplicationStatusApproved               LandlordApplicationStatus = "APPROVED"
	LandlordApplicationStatusActive                 LandlordApplicationStatus = "ACTIVE"
	LandlordApplicationStatusMoreInformationRequired LandlordApplicationStatus = "MORE_INFORMATION_REQUIRED"
	LandlordApplicationStatusRejected               LandlordApplicationStatus = "REJECTED"
	LandlordApplicationStatusSuspended             LandlordApplicationStatus = "SUSPENDED"
)

type LandlordApplication struct {
	ID                      uuid.UUID                `json:"id"`
	ApplicationReference    string                  `json:"application_reference"`
	SubjectID               uuid.UUID                `json:"subject_id"`
	Status                  LandlordApplicationStatus `json:"status"`
	SubmittedAt             time.Time               `json:"submitted_at"`
	ReviewStartedAt          *time.Time              `json:"review_started_at,omitempty"`
	ReviewedAt              *time.Time              `json:"reviewed_at,omitempty"`
	VerificationUpdatedAt    *time.Time              `json:"verification_updated_at,omitempty"`
	VerificationSource      *string                 `json:"verification_source,omitempty"`
	VerificationResult       map[string]interface{}   `json:"verification_result,omitempty"`
	ReviewerID              *uuid.UUID              `json:"reviewer_id,omitempty"`
	Decision                *string                 `json:"decision,omitempty"`
	DecisionReason          *string                 `json:"decision_reason,omitempty"`
	DecisionCategory        *string                 `json:"decision_category,omitempty"`
	TermsVersion            string                  `json:"terms_version"`
	ConsentTimestamp        time.Time               `json:"consent_timestamp"`
	CreatedAt               time.Time               `json:"created_at"`
	UpdatedAt               time.Time               `json:"updated_at"`
	Version                 int                     `json:"version"`
}

type LandlordApplicationResubmission struct {
	ID                      uuid.UUID                `json:"id"`
	ApplicationID           uuid.UUID                `json:"application_id"`
	PreviousStatus          LandlordApplicationStatus `json:"previous_status"`
	PreviousDecision        *string                 `json:"previous_decision,omitempty"`
	PreviousDecisionReason  *string                 `json:"previous_decision_reason,omitempty"`
	PreviousDecisionCategory *string               `json:"previous_decision_category,omitempty"`
	PreviousReviewerID      *uuid.UUID              `json:"previous_reviewer_id,omitempty"`
	PreviousReviewedAt      *time.Time              `json:"previous_reviewed_at,omitempty"`
	ResubmittedAt           time.Time               `json:"resubmitted_at"`
	ResubmissionNotes       *string                 `json:"resubmission_notes,omitempty"`
	CreatedAt               time.Time               `json:"created_at"`
}

type PasswordResetToken struct {
	ID         uuid.UUID  `json:"id"`
	SubjectID  uuid.UUID  `json:"subject_id"`
	TokenHash  string     `json:"-"`
	ExpiresAt  time.Time  `json:"expires_at"`
	ConsumedAt *time.Time `json:"consumed_at,omitempty"`
	CreatedAt  time.Time  `json:"created_at"`
}

type EmailVerificationToken struct {
	ID         uuid.UUID  `json:"id"`
	SubjectID  uuid.UUID  `json:"subject_id"`
	Email      string     `json:"email"`
	TokenHash  string     `json:"-"`
	ExpiresAt  time.Time  `json:"expires_at"`
	ConsumedAt *time.Time `json:"consumed_at,omitempty"`
	CreatedAt  time.Time  `json:"created_at"`
}
