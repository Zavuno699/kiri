package integration

import (
	"context"
	"errors"
)

var (
	// Integration boundary errors - these represent missing external integrations
	ErrIdentityVerificationNotImplemented = errors.New("identity verification integration not implemented")
	ErrOwnershipVerificationNotImplemented = errors.New("ownership verification integration not implemented")
	ErrPaymentVerificationNotImplemented   = errors.New("payment verification integration not implemented")
)

// IdentityVerificationService is an integration boundary for identity verification
// This interface represents external KYC/identity verification providers
// INTEGRATION BOUNDARY: No actual implementation exists - this is a placeholder
type IdentityVerificationService interface {
	VerifyIdentity(ctx context.Context, subjectID string, verificationData map[string]interface{}) (bool, string, error)
}

// OwnershipVerificationService is an integration boundary for property ownership verification
// This interface represents external property title/ownership verification providers
// INTEGRATION BOUNDARY: No actual implementation exists - this is a placeholder
type OwnershipVerificationService interface {
	VerifyOwnership(ctx context.Context, propertyID string, ownershipData map[string]interface{}) (bool, string, error)
}

// PaymentVerificationService is an integration boundary for payment account verification
// This interface represents external payment provider account verification
// INTEGRATION BOUNDARY: No actual implementation exists - this is a placeholder
type PaymentVerificationService interface {
	VerifyPaymentAccount(ctx context.Context, accountID string, providerData map[string]interface{}) (bool, string, error)
}

// Placeholder implementations that fail safe (return error indicating not implemented)

type NoOpIdentityVerificationService struct{}

func (s *NoOpIdentityVerificationService) VerifyIdentity(ctx context.Context, subjectID string, verificationData map[string]interface{}) (bool, string, error) {
	return false, "", ErrIdentityVerificationNotImplemented
}

type NoOpOwnershipVerificationService struct{}

func (s *NoOpOwnershipVerificationService) VerifyOwnership(ctx context.Context, propertyID string, ownershipData map[string]interface{}) (bool, string, error) {
	return false, "", ErrOwnershipVerificationNotImplemented
}

type NoOpPaymentVerificationService struct{}

func (s *NoOpPaymentVerificationService) VerifyPaymentAccount(ctx context.Context, accountID string, providerData map[string]interface{}) (bool, string, error) {
	return false, "", ErrPaymentVerificationNotImplemented
}
