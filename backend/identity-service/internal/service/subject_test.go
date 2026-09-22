package service

import (
	"context"
	"testing"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/kirilock/backend/identity-service/internal/model"
	"github.com/kirilock/backend/identity-service/internal/repository"
)

// Mock subject repository for testing
type mockSubjectRepository struct {
	subjects map[uuid.UUID]model.Subject
	byEmail  map[string]model.Subject
}

func newMockSubjectRepository() *mockSubjectRepository {
	return &mockSubjectRepository{
		subjects: make(map[uuid.UUID]model.Subject),
		byEmail:  make(map[string]model.Subject),
	}
}

func (m *mockSubjectRepository) Create(ctx context.Context, subject model.Subject) error {
	if _, exists := m.byEmail[subject.Email]; exists {
		return repository.ErrSubjectExists
	}
	m.subjects[subject.ID] = subject
	m.byEmail[subject.Email] = subject
	return nil
}

func (m *mockSubjectRepository) GetByID(ctx context.Context, id uuid.UUID) (model.Subject, error) {
	subject, exists := m.subjects[id]
	if !exists {
		return model.Subject{}, repository.ErrSubjectNotFound
	}
	return subject, nil
}

func (m *mockSubjectRepository) GetBySubjectID(ctx context.Context, subjectID string) (model.Subject, error) {
	for _, subject := range m.subjects {
		if subject.SubjectID == subjectID {
			return subject, nil
		}
	}
	return model.Subject{}, repository.ErrSubjectNotFound
}

func (m *mockSubjectRepository) GetByEmail(ctx context.Context, email string) (model.Subject, error) {
	subject, exists := m.byEmail[email]
	if !exists {
		return model.Subject{}, repository.ErrSubjectNotFound
	}
	return subject, nil
}

func (m *mockSubjectRepository) Update(ctx context.Context, subject model.Subject) error {
	if _, exists := m.subjects[subject.ID]; !exists {
		return repository.ErrSubjectNotFound
	}
	m.subjects[subject.ID] = subject
	m.byEmail[subject.Email] = subject
	return nil
}

func (m *mockSubjectRepository) UpdateRoles(ctx context.Context, id uuid.UUID, roles []string) error {
	subject, exists := m.subjects[id]
	if !exists {
		return repository.ErrSubjectNotFound
	}
	subject.Roles = roles
	m.subjects[id] = subject
	return nil
}

func (m *mockSubjectRepository) SetAdmin(ctx context.Context, id uuid.UUID, isAdmin bool) error {
	subject, exists := m.subjects[id]
	if !exists {
		return repository.ErrSubjectNotFound
	}
	subject.IsAdmin = isAdmin
	m.subjects[id] = subject
	return nil
}

func (m *mockSubjectRepository) SetSuperAdmin(ctx context.Context, id uuid.UUID, isSuperAdmin bool) error {
	subject, exists := m.subjects[id]
	if !exists {
		return repository.ErrSubjectNotFound
	}
	subject.IsSuperAdmin = isSuperAdmin
	m.subjects[id] = subject
	return nil
}

func (m *mockSubjectRepository) UpdatePasswordHash(ctx context.Context, id uuid.UUID, passwordHash string) error {
	subject, exists := m.subjects[id]
	if !exists {
		return repository.ErrSubjectNotFound
	}
	subject.PasswordHash = passwordHash
	m.subjects[id] = subject
	return nil
}

func (m *mockSubjectRepository) UpdatePasswordHashTx(tx pgx.Tx, id uuid.UUID, passwordHash string) error {
	return m.UpdatePasswordHash(context.Background(), id, passwordHash)
}

func (m *mockSubjectRepository) CountSuperAdmins(ctx context.Context) (int, error) {
	count := 0
	for _, subject := range m.subjects {
		if subject.IsSuperAdmin {
			count++
		}
	}
	return count, nil
}

func (m *mockSubjectRepository) GetByIDForUpdate(ctx context.Context, id uuid.UUID) (model.Subject, error) {
	return m.GetByID(ctx, id)
}

func (m *mockSubjectRepository) SetSuperAdminTx(tx pgx.Tx, id uuid.UUID, isSuperAdmin bool) error {
	return m.SetSuperAdmin(context.Background(), id, isSuperAdmin)
}

func (m *mockSubjectRepository) CountSuperAdminsTx(tx pgx.Tx) (int, error) {
	return m.CountSuperAdmins(context.Background())
}

func (m *mockSubjectRepository) GetByIDForUpdateTx(tx pgx.Tx, id uuid.UUID) (model.Subject, error) {
	return m.GetByID(context.Background(), id)
}

func TestCreateSubject(t *testing.T) {
	mockRepo := newMockSubjectRepository()
	service, err := NewSubjectService(mockRepo)
	require.NoError(t, err)
	require.NotNil(t, service)

	ctx := context.Background()

	t.Run("creates landlord with correct roles", func(t *testing.T) {
		subject, err := service.CreateSubject(
			ctx,
			"landlord@example.com",
			"TestPassword123",
			[]string{"landlord"},
			false,
			false,
		)

		require.NoError(t, err)
		assert.Equal(t, "landlord@example.com", subject.Email)
		assert.Equal(t, []string{"landlord"}, subject.Roles)
		assert.False(t, subject.IsAdmin)
		assert.False(t, subject.IsSuperAdmin)
		assert.NotEmpty(t, subject.PasswordHash)
	})

	t.Run("creates super admin with correct roles", func(t *testing.T) {
		subject, err := service.CreateSubject(
			ctx,
			"superadmin@example.com",
			"TestPassword123",
			[]string{"super_admin"},
			false,
			true,
		)

		require.NoError(t, err)
		assert.Equal(t, "superadmin@example.com", subject.Email)
		assert.Equal(t, []string{"super_admin"}, subject.Roles)
		assert.False(t, subject.IsAdmin)
		assert.True(t, subject.IsSuperAdmin)
		assert.NotEmpty(t, subject.PasswordHash)
	})

	t.Run("rejects short password", func(t *testing.T) {
		_, err := service.CreateSubject(
			ctx,
			"short@example.com",
			"short",
			[]string{"landlord"},
			false,
			false,
		)

		assert.Error(t, err)
		assert.Equal(t, ErrInvalidPassword, err)
	})

	t.Run("rejects empty email", func(t *testing.T) {
		_, err := service.CreateSubject(
			ctx,
			"",
			"TestPassword123",
			[]string{"landlord"},
			false,
			false,
		)

		assert.Error(t, err)
	})

	t.Run("rejects empty password", func(t *testing.T) {
		_, err := service.CreateSubject(
			ctx,
			"test@example.com",
			"",
			[]string{"landlord"},
			false,
			false,
		)

		assert.Error(t, err)
	})
}

func TestVerifyPassword(t *testing.T) {
	mockRepo := newMockSubjectRepository()
	service, err := NewSubjectService(mockRepo)
	require.NoError(t, err)

	ctx := context.Background()

	// Create a test subject first
	testSubject, err := service.CreateSubject(
		ctx,
		"test@example.com",
		"TestPassword123",
		[]string{"landlord"},
		false,
		false,
	)
	require.NoError(t, err)

	t.Run("verifies correct password", func(t *testing.T) {
		subject, err := service.VerifyPassword(ctx, "test@example.com", "TestPassword123")

		require.NoError(t, err)
		assert.Equal(t, testSubject.ID, subject.ID)
		assert.Equal(t, "test@example.com", subject.Email)
	})

	t.Run("rejects incorrect password", func(t *testing.T) {
		_, err := service.VerifyPassword(ctx, "test@example.com", "WrongPassword")

		assert.Error(t, err)
		assert.Equal(t, ErrPasswordMismatch, err)
	})

	t.Run("rejects unknown email", func(t *testing.T) {
		_, err := service.VerifyPassword(ctx, "unknown@example.com", "TestPassword123")

		assert.Error(t, err)
		assert.Equal(t, repository.ErrSubjectNotFound, err)
	})

	t.Run("rejects empty email", func(t *testing.T) {
		_, err := service.VerifyPassword(ctx, "", "TestPassword123")

		assert.Error(t, err)
	})

	t.Run("rejects empty password", func(t *testing.T) {
		_, err := service.VerifyPassword(ctx, "test@example.com", "")

		assert.Error(t, err)
	})
}
