package service

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"

	"github.com/kirilock/backend/identity-service/internal/model"
	"github.com/kirilock/backend/identity-service/internal/repository"
)

var (
	ErrLandlordApplicationNotFound      = errors.New("landlord application not found")
	ErrLandlordApplicationAlreadyExists = errors.New("landlord application already exists")
	ErrInvalidApplicationStatus         = errors.New("invalid application status transition")
	ErrUnauthorizedReview               = errors.New("unauthorized to review application")
	ErrTokenExpired                     = errors.New("token has expired")
	ErrTokenAlreadyConsumed             = errors.New("token has already been consumed")
)

type LandlordApplicationService struct {
	appRepo     repository.LandlordApplicationRepository
	subjectRepo repository.SubjectRepository
}

func NewLandlordApplicationService(
	appRepo repository.LandlordApplicationRepository,
	subjectRepo repository.SubjectRepository,
) *LandlordApplicationService {
	return &LandlordApplicationService{
		appRepo:     appRepo,
		subjectRepo: subjectRepo,
	}
}

// CreatePublicRegistration creates a landlord application for public registration
// This creates an unprivileged subject and application - no landlord authorization granted
func (s *LandlordApplicationService) CreatePublicRegistration(
	ctx context.Context,
	email string,
	password string,
	termsVersion string,
) (*model.LandlordApplication, error) {
	// Hash password
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %w", err)
	}

	// Create unprivileged subject
	subject := model.Subject{
		ID:           uuid.New(),
		SubjectID:    uuid.New().String(),
		Email:        email,
		PasswordHash: string(hash),
		Roles:        []string{}, // No roles initially
		IsAdmin:      false,
		IsSuperAdmin: false,
	}

	if err := s.subjectRepo.Create(ctx, subject); err != nil {
		return nil, fmt.Errorf("failed to create subject: %w", err)
	}

	// Generate application reference
	ref, err := generateApplicationReference()
	if err != nil {
		return nil, fmt.Errorf("failed to generate reference: %w", err)
	}

	app := &model.LandlordApplication{
		ID:                   uuid.New(),
		ApplicationReference: ref,
		SubjectID:            subject.ID,
		Status:               model.LandlordApplicationStatusPendingRegistration,
		SubmittedAt:          time.Now(),
		TermsVersion:         termsVersion,
		ConsentTimestamp:     time.Now(),
		CreatedAt:            time.Now(),
		UpdatedAt:            time.Now(),
		Version:              1,
	}

	if err := s.appRepo.Create(ctx, app); err != nil {
		return nil, fmt.Errorf("failed to create application: %w", err)
	}

	return app, nil
}

// GetApplicationStatus retrieves application status for the owner
func (s *LandlordApplicationService) GetApplicationStatus(
	ctx context.Context,
	subjectID uuid.UUID,
) (*model.LandlordApplication, error) {
	app, err := s.appRepo.GetBySubjectID(ctx, subjectID)
	if err != nil {
		if errors.Is(err, repository.ErrLandlordApplicationNotFound) {
			return nil, ErrLandlordApplicationNotFound
		}
		return nil, fmt.Errorf("failed to get application: %w", err)
	}

	// Return safe fields only (no internal verification secrets)
	return app, nil
}

// SubmitVerification submits verification for review
func (s *LandlordApplicationService) SubmitVerification(
	ctx context.Context,
	subjectID uuid.UUID,
) (*model.LandlordApplication, error) {
	app, err := s.appRepo.GetBySubjectID(ctx, subjectID)
	if err != nil {
		if errors.Is(err, repository.ErrLandlordApplicationNotFound) {
			return nil, ErrLandlordApplicationNotFound
		}
		return nil, fmt.Errorf("failed to get application: %w", err)
	}

	// Preserve history if resubmitting
	if app.Status == model.LandlordApplicationStatusMoreInformationRequired ||
		app.Status == model.LandlordApplicationStatusRejected {
		resub := &model.LandlordApplicationResubmission{
			ID:                       uuid.New(),
			ApplicationID:            app.ID,
			PreviousStatus:           app.Status,
			PreviousDecision:         app.Decision,
			PreviousDecisionReason:   app.DecisionReason,
			PreviousDecisionCategory: app.DecisionCategory,
			PreviousReviewerID:       app.ReviewerID,
			PreviousReviewedAt:       app.ReviewedAt,
			ResubmittedAt:            time.Now(),
			CreatedAt:                time.Now(),
		}
		if err := s.appRepo.CreateResubmission(ctx, resub); err != nil {
			return nil, fmt.Errorf("failed to create resubmission record: %w", err)
		}
	}

	// Update status to pending verification
	if err := s.appRepo.UpdateStatus(
		ctx,
		app.ID,
		model.LandlordApplicationStatusPendingVerification,
		nil, // No reviewer yet
		nil, // No decision yet
		nil, // No reason yet
		nil, // No category yet
	); err != nil {
		return nil, fmt.Errorf("failed to update application status: %w", err)
	}

	// Return updated application
	return s.appRepo.GetByID(ctx, app.ID)
}

// AdminListApplications lists applications by status (admin only)
func (s *LandlordApplicationService) AdminListApplications(
	ctx context.Context,
	status model.LandlordApplicationStatus,
) ([]*model.LandlordApplication, error) {
	apps, err := s.appRepo.ListByStatus(ctx, status)
	if err != nil {
		return nil, fmt.Errorf("failed to list applications: %w", err)
	}
	return apps, nil
}

// AdminGetApplication retrieves application detail (admin only)
func (s *LandlordApplicationService) AdminGetApplication(
	ctx context.Context,
	applicationID uuid.UUID,
) (*model.LandlordApplication, error) {
	app, err := s.appRepo.GetByID(ctx, applicationID)
	if err != nil {
		if errors.Is(err, repository.ErrLandlordApplicationNotFound) {
			return nil, ErrLandlordApplicationNotFound
		}
		return nil, fmt.Errorf("failed to get application: %w", err)
	}

	// Get resubmission history
	resubs, err := s.appRepo.GetResubmissions(ctx, applicationID)
	if err != nil {
		return nil, fmt.Errorf("failed to get resubmissions: %w", err)
	}

	// Attach resubmissions (would need to add field to model or return separately)
	_ = resubs // TODO: Add resubmissions to response

	return app, nil
}

// AdminStartReview starts review of an application (admin only)
func (s *LandlordApplicationService) AdminStartReview(
	ctx context.Context,
	applicationID uuid.UUID,
	reviewerID uuid.UUID,
) error {
	if err := s.appRepo.UpdateStatus(
		ctx,
		applicationID,
		model.LandlordApplicationStatusPendingVerification,
		&reviewerID,
		nil,
		nil,
		nil,
	); err != nil {
		return fmt.Errorf("failed to start review: %w", err)
	}
	return nil
}

// AdminApprove approves an application and grants landlord role (admin only)
func (s *LandlordApplicationService) AdminApprove(
	ctx context.Context,
	applicationID uuid.UUID,
	reviewerID uuid.UUID,
) error {
	app, err := s.appRepo.GetByID(ctx, applicationID)
	if err != nil {
		return fmt.Errorf("failed to get application: %w", err)
	}

	// Update application status
	decision := "APPROVED"
	if err := s.appRepo.UpdateStatus(
		ctx,
		applicationID,
		model.LandlordApplicationStatusApproved,
		&reviewerID,
		&decision,
		nil,
		nil,
	); err != nil {
		return fmt.Errorf("failed to approve application: %w", err)
	}

	// Get current subject to add landlord role
	subject, err := s.subjectRepo.GetByID(ctx, app.SubjectID)
	if err != nil {
		return fmt.Errorf("failed to get subject: %w", err)
	}

	// Add landlord role to existing roles
	newRoles := append(subject.Roles, "landlord")
	if err := s.subjectRepo.UpdateRoles(ctx, app.SubjectID, newRoles); err != nil {
		return fmt.Errorf("failed to grant landlord role: %w", err)
	}

	return nil
}

// AdminReject rejects an application (admin only)
func (s *LandlordApplicationService) AdminReject(
	ctx context.Context,
	applicationID uuid.UUID,
	reviewerID uuid.UUID,
	reason string,
	category string,
) error {
	decision := "REJECTED"
	if err := s.appRepo.UpdateStatus(
		ctx,
		applicationID,
		model.LandlordApplicationStatusRejected,
		&reviewerID,
		&decision,
		&reason,
		&category,
	); err != nil {
		return fmt.Errorf("failed to reject application: %w", err)
	}
	return nil
}

// AdminRequestMoreInformation requests more information (admin only)
func (s *LandlordApplicationService) AdminRequestMoreInformation(
	ctx context.Context,
	applicationID uuid.UUID,
	reviewerID uuid.UUID,
	reason string,
) error {
	decision := "MORE_INFORMATION_REQUIRED"
	if err := s.appRepo.UpdateStatus(
		ctx,
		applicationID,
		model.LandlordApplicationStatusMoreInformationRequired,
		&reviewerID,
		&decision,
		&reason,
		nil,
	); err != nil {
		return fmt.Errorf("failed to request more information: %w", err)
	}
	return nil
}

// Password reset token management
func (s *LandlordApplicationService) CreatePasswordResetToken(
	ctx context.Context,
	subjectID uuid.UUID,
) (string, error) {
	// Generate random token
	tokenBytes := make([]byte, 32)
	if _, err := rand.Read(tokenBytes); err != nil {
		return "", fmt.Errorf("failed to generate token: %w", err)
	}
	token := hex.EncodeToString(tokenBytes)

	// Hash the token
	hash, err := bcrypt.GenerateFromPassword([]byte(token), bcrypt.DefaultCost)
	if err != nil {
		return "", fmt.Errorf("failed to hash token: %w", err)
	}

	// Store in database (would need password reset token repository)
	// TODO: Implement password reset token repository
	_ = hash

	return token, nil
}

func (s *LandlordApplicationService) ConsumePasswordResetToken(
	ctx context.Context,
	token string,
	newPassword string,
) error {
	// TODO: Implement password reset token consumption
	return nil
}

// Email verification token management
func (s *LandlordApplicationService) CreateEmailVerificationToken(
	ctx context.Context,
	subjectID uuid.UUID,
	email string,
) (string, error) {
	// Generate random token
	tokenBytes := make([]byte, 32)
	if _, err := rand.Read(tokenBytes); err != nil {
		return "", fmt.Errorf("failed to generate token: %w", err)
	}
	token := hex.EncodeToString(tokenBytes)

	// Hash the token
	hash, err := bcrypt.GenerateFromPassword([]byte(token), bcrypt.DefaultCost)
	if err != nil {
		return "", fmt.Errorf("failed to hash token: %w", err)
	}

	// Store in database (would need email verification token repository)
	// TODO: Implement email verification token repository
	_ = hash

	return token, nil
}

func (s *LandlordApplicationService) ConsumeEmailVerificationToken(
	ctx context.Context,
	token string,
) error {
	// TODO: Implement email verification token consumption
	return nil
}

func generateApplicationReference() (string, error) {
	b := make([]byte, 4)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return fmt.Sprintf("KLA-%s", hex.EncodeToString(b)), nil
}
