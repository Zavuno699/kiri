package service

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/identity-service/internal/repository"
)

var (
	ErrSessionExpired = errors.New("session expired")
	ErrSessionNotFound = errors.New("session not found")
)

type SessionService struct {
	sessionRepo    repository.SessionRepository
	credentialRepo repository.CredentialRepository
}

func NewSessionService(
	sessionRepo repository.SessionRepository,
	credentialRepo repository.CredentialRepository,
) (*SessionService, error) {
	if sessionRepo == nil {
		return nil, errors.New("session repository is required")
	}
	if credentialRepo == nil {
		return nil, errors.New("credential repository is required")
	}

	return &SessionService{
		sessionRepo:    sessionRepo,
		credentialRepo: credentialRepo,
	}, nil
}

func (s *SessionService) CreateSession(
	ctx context.Context,
	subjectID string,
	credentialID string,
	expiresIn time.Duration,
) (repository.Session, error) {
	if subjectID == "" {
		return repository.Session{}, errors.New("subject_id is required")
	}
	if credentialID == "" {
		return repository.Session{}, errors.New("credential_id is required")
	}

	sessionID := uuid.New().String()
	revocationID := uuid.New().String()
	now := time.Now().UTC()
	expiresAt := now.Add(expiresIn)

	session := repository.Session{
		ID:           uuid.New().String(),
		SubjectID:    subjectID,
		CredentialID: credentialID,
		SessionID:    sessionID,
		RevocationID: revocationID,
		IssuedAt:     now,
		ExpiresAt:    expiresAt,
	}

	if err := s.sessionRepo.Create(ctx, session); err != nil {
		return repository.Session{}, err
	}

	return session, nil
}

func (s *SessionService) ValidateSession(
	ctx context.Context,
	sessionID string,
) (repository.Session, error) {
	if sessionID == "" {
		return repository.Session{}, ErrSessionNotFound
	}

	session, err := s.sessionRepo.GetBySessionID(ctx, sessionID)
	if err != nil {
		return repository.Session{}, ErrSessionNotFound
	}

	now := time.Now().UTC()
	if now.After(session.ExpiresAt) {
		return repository.Session{}, ErrSessionExpired
	}

	return session, nil
}

func (s *SessionService) RevokeSession(
	ctx context.Context,
	sessionID string,
) error {
	if sessionID == "" {
		return errors.New("session_id is required")
	}

	return s.sessionRepo.Revoke(ctx, sessionID, time.Now().UTC())
}

func (s *SessionService) RevokeAllSubjectSessions(
	ctx context.Context,
	subjectID string,
) error {
	if subjectID == "" {
		return errors.New("subject_id is required")
	}

	return s.sessionRepo.RevokeBySubjectID(ctx, subjectID, time.Now().UTC())
}
