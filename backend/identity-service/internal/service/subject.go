package service

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"

	"github.com/kirilock/backend/identity-service/internal/model"
	"github.com/kirilock/backend/identity-service/internal/repository"
)

var (
	ErrInvalidPassword        = errors.New("invalid password")
	ErrPasswordMismatch       = errors.New("password does not match")
	ErrAdminSelfDemotion      = errors.New("cannot demote self from admin")
	ErrSuperAdminSelfDemotion = errors.New("cannot demote self from super admin")
)

type SubjectService struct {
	subjectRepo repository.SubjectRepository
}

func NewSubjectService(subjectRepo repository.SubjectRepository) (*SubjectService, error) {
	if subjectRepo == nil {
		return nil, errors.New("subject repository is required")
	}

	return &SubjectService{
		subjectRepo: subjectRepo,
	}, nil
}

func (s *SubjectService) CreateSubject(
	ctx context.Context,
	email string,
	password string,
	roles []string,
	isAdmin bool,
	isSuperAdmin bool,
) (model.Subject, error) {
	if email == "" {
		return model.Subject{}, errors.New("email is required")
	}
	if password == "" {
		return model.Subject{}, errors.New("password is required")
	}
	if len(password) < 8 {
		return model.Subject{}, ErrInvalidPassword
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return model.Subject{}, err
	}

	subject := model.Subject{
		ID:           uuid.New(),
		SubjectID:    uuid.New().String(),
		Email:        email,
		PasswordHash: string(hash),
		Roles:        roles,
		IsAdmin:      isAdmin,
		IsSuperAdmin: isSuperAdmin,
		CreatedAt:    time.Now().UTC(),
		UpdatedAt:    time.Now().UTC(),
		Version:      1,
	}

	if err := s.subjectRepo.Create(ctx, subject); err != nil {
		return model.Subject{}, err
	}

	return subject, nil
}

func (s *SubjectService) VerifyPassword(
	ctx context.Context,
	email string,
	password string,
) (model.Subject, error) {
	if email == "" {
		return model.Subject{}, errors.New("email is required")
	}
	if password == "" {
		return model.Subject{}, errors.New("password is required")
	}

	subject, err := s.subjectRepo.GetByEmail(ctx, email)
	if err != nil {
		return model.Subject{}, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(subject.PasswordHash), []byte(password))
	if err != nil {
		return model.Subject{}, ErrPasswordMismatch
	}

	return subject, nil
}

func (s *SubjectService) GetSubjectByID(
	ctx context.Context,
	id uuid.UUID,
) (model.Subject, error) {
	return s.subjectRepo.GetByID(ctx, id)
}

func (s *SubjectService) GetSubjectBySubjectID(
	ctx context.Context,
	subjectID string,
) (model.Subject, error) {
	return s.subjectRepo.GetBySubjectID(ctx, subjectID)
}

func (s *SubjectService) SetAdmin(
	ctx context.Context,
	actorID uuid.UUID,
	targetID uuid.UUID,
	isAdmin bool,
) error {
	if actorID == uuid.Nil {
		return errors.New("actor ID is required")
	}
	if targetID == uuid.Nil {
		return errors.New("target ID is required")
	}

	actor, err := s.subjectRepo.GetByID(ctx, actorID)
	if err != nil {
		return err
	}

	if actorID == targetID && !isAdmin && actor.IsAdmin {
		return ErrAdminSelfDemotion
	}

	return s.subjectRepo.SetAdmin(ctx, targetID, isAdmin)
}

func (s *SubjectService) SetSuperAdmin(
	ctx context.Context,
	actorID uuid.UUID,
	targetID uuid.UUID,
	isSuperAdmin bool,
) error {
	if actorID == uuid.Nil {
		return errors.New("actor ID is required")
	}
	if targetID == uuid.Nil {
		return errors.New("target ID is required")
	}

	actor, err := s.subjectRepo.GetByID(ctx, actorID)
	if err != nil {
		return err
	}

	if actorID == targetID && !isSuperAdmin && actor.IsSuperAdmin {
		return ErrSuperAdminSelfDemotion
	}

	return s.subjectRepo.SetSuperAdmin(ctx, targetID, isSuperAdmin)
}

func (s *SubjectService) UpdateRoles(
	ctx context.Context,
	id uuid.UUID,
	roles []string,
) error {
	if id == uuid.Nil {
		return repository.ErrSubjectNotFound
	}

	return s.subjectRepo.UpdateRoles(ctx, id, roles)
}
