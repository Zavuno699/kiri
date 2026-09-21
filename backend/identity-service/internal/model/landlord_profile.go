package model

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type LandlordVerificationStatus string

const (
	VerificationPending              LandlordVerificationStatus = "PENDING"
	VerificationInformationSubmitted LandlordVerificationStatus = "INFORMATION_SUBMITTED"
	VerificationUnderReview          LandlordVerificationStatus = "UNDER_REVIEW"
	VerificationVerified             LandlordVerificationStatus = "VERIFIED"
	VerificationRejected             LandlordVerificationStatus = "REJECTED"
	VerificationNeedsMoreInformation LandlordVerificationStatus = "NEEDS_MORE_INFORMATION"
	VerificationSuspended            LandlordVerificationStatus = "SUSPENDED"
)

type LandlordAuthorizationState string

const (
	AuthorizationAccountCreated    LandlordAuthorizationState = "ACCOUNT_CREATED"
	AuthorizationIdentityVerified  LandlordAuthorizationState = "IDENTITY_VERIFIED"
	AuthorizationOwnershipVerified LandlordAuthorizationState = "OWNERSHIP_VERIFIED"
	AuthorizationPaymentVerified   LandlordAuthorizationState = "PAYMENT_VERIFIED"
	AuthorizationOperationalAccess LandlordAuthorizationState = "OPERATIONAL_ACCESS_ENABLED"
)

type LandlordProfile struct {
	ID                 uuid.UUID
	SubjectID          uuid.UUID
	VerificationStatus LandlordVerificationStatus
	AuthorizationState LandlordAuthorizationState
	LegalName          string
	BusinessName       string
	LegalEntityType    string // INDIVIDUAL, REGISTERED_BUSINESS, PROPERTY_MANAGEMENT_ORG
	TaxID              string
	Phone              string
	AddressLine1       string
	AddressLine2       string
	City               string
	State              string
	PostalCode         string
	Country            string
	SubmittedAt        *time.Time
	ReviewedAt         *time.Time
	VerifiedAt         *time.Time
	RejectionReason    string
	Notes              string
	CreatedAt          time.Time
	UpdatedAt          time.Time
	Version            int
}

func (l LandlordProfile) Validate() error {
	if l.ID == uuid.Nil {
		return errors.New("id is required")
	}
	if l.SubjectID == uuid.Nil {
		return errors.New("subject_id is required")
	}

	switch l.VerificationStatus {
	case VerificationPending, VerificationInformationSubmitted, VerificationUnderReview,
		VerificationVerified, VerificationRejected, VerificationNeedsMoreInformation, VerificationSuspended:
		// Valid
	default:
		return errors.New("invalid verification status")
	}

	switch l.AuthorizationState {
	case AuthorizationAccountCreated, AuthorizationIdentityVerified, AuthorizationOwnershipVerified,
		AuthorizationPaymentVerified, AuthorizationOperationalAccess:
		// Valid
	default:
		return errors.New("invalid authorization state")
	}

	// Allow empty legal_entity_type for dev bootstrap, otherwise validate
	if l.LegalEntityType != "" {
		switch l.LegalEntityType {
		case "INDIVIDUAL", "REGISTERED_BUSINESS", "PROPERTY_MANAGEMENT_ORG":
			// Valid
		default:
			return errors.New("invalid legal entity type")
		}
	}

	if l.Version < 1 {
		return errors.New("version must be >= 1")
	}

	return nil
}

func (l LandlordProfile) CanPerformOperationalActions() bool {
	return l.AuthorizationState == AuthorizationOperationalAccess
}

func (l LandlordProfile) IsVerified() bool {
	return l.VerificationStatus == VerificationVerified
}
