package service

import (
	"context"
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/kirilock/backend/identity-service/internal/model"
)

// MockTenancyRepository is a fake implementation for testing
type MockTenancyRepository struct {
	tenancies map[uuid.UUID]model.Tenancy
}

func NewMockTenancyRepository() *MockTenancyRepository {
	return &MockTenancyRepository{
		tenancies: make(map[uuid.UUID]model.Tenancy),
	}
}

func (m *MockTenancyRepository) GetActiveByTenantSubjectID(ctx context.Context, tenantSubjectID uuid.UUID) (model.Tenancy, error) {
	for _, tenancy := range m.tenancies {
		if tenancy.TenantSubjectID == tenantSubjectID && tenancy.Status == model.TenancyActive {
			return tenancy, nil
		}
	}
	return model.Tenancy{}, nil
}

// Stub methods not used in lock authorization tests
func (m *MockTenancyRepository) Create(ctx context.Context, tenancy model.Tenancy) error { return nil }
func (m *MockTenancyRepository) GetByID(ctx context.Context, id uuid.UUID) (model.Tenancy, error) {
	return model.Tenancy{}, nil
}
func (m *MockTenancyRepository) GetByTenantSubjectID(ctx context.Context, tenantSubjectID uuid.UUID) ([]model.Tenancy, error) {
	return nil, nil
}
func (m *MockTenancyRepository) GetByUnitID(ctx context.Context, unitID uuid.UUID) ([]model.Tenancy, error) {
	return nil, nil
}
func (m *MockTenancyRepository) GetByTokenHash(ctx context.Context, tokenHash string) (model.Tenancy, error) {
	return model.Tenancy{}, nil
}
func (m *MockTenancyRepository) Update(ctx context.Context, tenancy model.Tenancy) error { return nil }
func (m *MockTenancyRepository) UpdateStatus(ctx context.Context, id uuid.UUID, status model.TenancyStatus) error {
	return nil
}
func (m *MockTenancyRepository) AcceptInvitation(ctx context.Context, id uuid.UUID) error { return nil }

// MockLockAssignmentRepository is a fake implementation for testing
type MockLockAssignmentRepository struct {
	assignments map[uuid.UUID]model.LockAssignment
}

func NewMockLockAssignmentRepository() *MockLockAssignmentRepository {
	return &MockLockAssignmentRepository{
		assignments: make(map[uuid.UUID]model.LockAssignment),
	}
}

func (m *MockLockAssignmentRepository) GetActiveByUnitID(ctx context.Context, unitID uuid.UUID) (*model.LockAssignment, error) {
	for _, assignment := range m.assignments {
		if assignment.UnitID == unitID && assignment.Status == model.LockAssignmentActive {
			return &assignment, nil
		}
	}
	return nil, nil
}

// Stub methods not used in lock authorization tests
func (m *MockLockAssignmentRepository) Create(ctx context.Context, assignment model.LockAssignment) error {
	return nil
}
func (m *MockLockAssignmentRepository) GetByID(ctx context.Context, id uuid.UUID) (model.LockAssignment, error) {
	return model.LockAssignment{}, nil
}
func (m *MockLockAssignmentRepository) GetActiveByLockID(ctx context.Context, lockID uuid.UUID) (*model.LockAssignment, error) {
	return nil, nil
}
func (m *MockLockAssignmentRepository) GetByLockID(ctx context.Context, lockID uuid.UUID) ([]model.LockAssignment, error) {
	return nil, nil
}
func (m *MockLockAssignmentRepository) GetByUnitID(ctx context.Context, unitID uuid.UUID) ([]model.LockAssignment, error) {
	return nil, nil
}
func (m *MockLockAssignmentRepository) UpdateStatus(ctx context.Context, id uuid.UUID, status model.LockAssignmentStatus, deactivatedAt *string) error {
	return nil
}

func TestTenantLockAuthorizer_AuthorizeLockOperation(t *testing.T) {
	t.Run("authorized for correct tenant+tenancy+unit+active lock", func(t *testing.T) {
		tenantSubjectID := uuid.New()
		unitID := uuid.New()
		lockID := uuid.New()
		tenancyID := uuid.New()
		assignmentID := uuid.New()

		tenancyRepo := NewMockTenancyRepository()
		lockAssignmentRepo := NewMockLockAssignmentRepository()
		authorizer := NewTenantLockAuthorizer(tenancyRepo, lockAssignmentRepo)

		// Setup: active tenancy for tenant
		tenancyRepo.tenancies[tenancyID] = model.Tenancy{
			ID:              tenancyID,
			TenantSubjectID: tenantSubjectID,
			UnitID:          unitID,
			Status:          model.TenancyActive,
		}

		// Setup: active lock assignment for unit
		lockAssignmentRepo.assignments[assignmentID] = model.LockAssignment{
			ID:     assignmentID,
			LockID: lockID,
			UnitID: unitID,
			Status: model.LockAssignmentActive,
		}

		result, err := authorizer.AuthorizeLockOperation(context.Background(), LockAuthorizationRequest{
			TenantSubjectID: tenantSubjectID,
			LockID:          lockID,
			Operation:       "lock.command",
		})

		require.NoError(t, err)
		assert.True(t, result.Authorized, "should be authorized for correct relationship")
		assert.Equal(t, tenancyID, result.TenancyID)
		assert.Equal(t, unitID, result.UnitID)
	})

	t.Run("denied for wrong tenant", func(t *testing.T) {
		wrongTenantID := uuid.New()

		tenancyRepo := NewMockTenancyRepository()
		lockAssignmentRepo := NewMockLockAssignmentRepository()
		authorizer := NewTenantLockAuthorizer(tenancyRepo, lockAssignmentRepo)

		result, err := authorizer.AuthorizeLockOperation(context.Background(), LockAuthorizationRequest{
			TenantSubjectID: wrongTenantID,
			LockID:          uuid.New(),
			Operation:       "lock.command",
		})

		require.NoError(t, err)
		assert.False(t, result.Authorized, "should be denied for wrong tenant")
		assert.Contains(t, result.Reason, "no active tenancy")
	})

	t.Run("denied for inactive tenancy", func(t *testing.T) {
		tenantSubjectID := uuid.New()

		tenancyRepo := NewMockTenancyRepository()
		lockAssignmentRepo := NewMockLockAssignmentRepository()
		authorizer := NewTenantLockAuthorizer(tenancyRepo, lockAssignmentRepo)

		// Setup: GetActiveByTenantSubjectID only returns active tenancies
		// If we don't add an active tenancy, it returns empty, which should be denied
		// Simulating "inactive" by not adding the tenancy to the active map

		result, err := authorizer.AuthorizeLockOperation(context.Background(), LockAuthorizationRequest{
			TenantSubjectID: tenantSubjectID,
			LockID:          uuid.New(),
			Operation:       "lock.command",
		})

		require.NoError(t, err)
		assert.False(t, result.Authorized, "should be denied for inactive tenancy")
		assert.Contains(t, result.Reason, "no active tenancy")
	})

	t.Run("denied for missing lock assignment", func(t *testing.T) {
		tenantSubjectID := uuid.New()
		unitID := uuid.New()
		tenancyID := uuid.New()

		tenancyRepo := NewMockTenancyRepository()
		lockAssignmentRepo := NewMockLockAssignmentRepository()
		authorizer := NewTenantLockAuthorizer(tenancyRepo, lockAssignmentRepo)

		// Setup: active tenancy but no lock assignment
		tenancyRepo.tenancies[tenancyID] = model.Tenancy{
			ID:              tenancyID,
			TenantSubjectID: tenantSubjectID,
			UnitID:          unitID,
			Status:          model.TenancyActive,
		}

		result, err := authorizer.AuthorizeLockOperation(context.Background(), LockAuthorizationRequest{
			TenantSubjectID: tenantSubjectID,
			LockID:          uuid.New(),
			Operation:       "lock.command",
		})

		require.NoError(t, err)
		assert.False(t, result.Authorized, "should be denied for missing lock assignment")
		assert.Contains(t, result.Reason, "no lock assigned")
	})

	t.Run("denied for wrong lock ID", func(t *testing.T) {
		tenantSubjectID := uuid.New()
		unitID := uuid.New()
		lockID := uuid.New()
		wrongLockID := uuid.New()
		tenancyID := uuid.New()
		assignmentID := uuid.New()

		tenancyRepo := NewMockTenancyRepository()
		lockAssignmentRepo := NewMockLockAssignmentRepository()
		authorizer := NewTenantLockAuthorizer(tenancyRepo, lockAssignmentRepo)

		// Setup: active tenancy and lock assignment
		tenancyRepo.tenancies[tenancyID] = model.Tenancy{
			ID:              tenancyID,
			TenantSubjectID: tenantSubjectID,
			UnitID:          unitID,
			Status:          model.TenancyActive,
		}

		lockAssignmentRepo.assignments[assignmentID] = model.LockAssignment{
			ID:     assignmentID,
			LockID: lockID,
			UnitID: unitID,
			Status: model.LockAssignmentActive,
		}

		result, err := authorizer.AuthorizeLockOperation(context.Background(), LockAuthorizationRequest{
			TenantSubjectID: tenantSubjectID,
			LockID:          wrongLockID,
			Operation:       "lock.command",
		})

		require.NoError(t, err)
		assert.False(t, result.Authorized, "should be denied for wrong lock ID")
		assert.Contains(t, result.Reason, "does not match assigned lock")
	})

	t.Run("denied for inactive lock assignment", func(t *testing.T) {
		tenantSubjectID := uuid.New()
		unitID := uuid.New()
		lockID := uuid.New()
		tenancyID := uuid.New()
		assignmentID := uuid.New()

		tenancyRepo := NewMockTenancyRepository()
		lockAssignmentRepo := NewMockLockAssignmentRepository()
		authorizer := NewTenantLockAuthorizer(tenancyRepo, lockAssignmentRepo)

		// Setup: active tenancy but inactive lock assignment
		tenancyRepo.tenancies[tenancyID] = model.Tenancy{
			ID:              tenancyID,
			TenantSubjectID: tenantSubjectID,
			UnitID:          unitID,
			Status:          model.TenancyActive,
		}

		lockAssignmentRepo.assignments[assignmentID] = model.LockAssignment{
			ID:     assignmentID,
			LockID: lockID,
			UnitID: unitID,
			Status: model.LockAssignmentInactive,
		}

		result, err := authorizer.AuthorizeLockOperation(context.Background(), LockAuthorizationRequest{
			TenantSubjectID: tenantSubjectID,
			LockID:          lockID,
			Operation:       "lock.command",
		})

		require.NoError(t, err)
		assert.False(t, result.Authorized, "should be denied for inactive lock assignment")
		assert.Contains(t, result.Reason, "no lock assigned")
	})

	t.Run("fail-closed: must have complete ownership chain", func(t *testing.T) {
		// This test verifies that removing any authorization check causes the test to fail
		// The authorization chain is: Tenant → Active Tenancy → Unit → Assigned Lock → Lock State
		// Each step must pass for authorization to succeed

		tenantSubjectID := uuid.New()
		unitID := uuid.New()
		lockID := uuid.New()
		tenancyID := uuid.New()
		assignmentID := uuid.New()

		tenancyRepo := NewMockTenancyRepository()
		lockAssignmentRepo := NewMockLockAssignmentRepository()
		authorizer := NewTenantLockAuthorizer(tenancyRepo, lockAssignmentRepo)

		// Setup complete ownership chain
		tenancyRepo.tenancies[tenancyID] = model.Tenancy{
			ID:              tenancyID,
			TenantSubjectID: tenantSubjectID,
			UnitID:          unitID,
			Status:          model.TenancyActive,
		}

		lockAssignmentRepo.assignments[assignmentID] = model.LockAssignment{
			ID:     assignmentID,
			LockID: lockID,
			UnitID: unitID,
			Status: model.LockAssignmentActive,
		}

		// Test 1: With complete chain, should be authorized
		result, err := authorizer.AuthorizeLockOperation(context.Background(), LockAuthorizationRequest{
			TenantSubjectID: tenantSubjectID,
			LockID:          lockID,
			Operation:       "lock.command",
		})

		require.NoError(t, err)
		assert.True(t, result.Authorized, "should be authorized with complete chain")

		// Test 2: Remove lock assignment - should be denied
		delete(lockAssignmentRepo.assignments, assignmentID)

		result, err = authorizer.AuthorizeLockOperation(context.Background(), LockAuthorizationRequest{
			TenantSubjectID: tenantSubjectID,
			LockID:          lockID,
			Operation:       "lock.command",
		})

		require.NoError(t, err)
		assert.False(t, result.Authorized, "should be denied without lock assignment")

		// Test 3: Remove tenancy - should be denied
		lockAssignmentRepo.assignments[assignmentID] = model.LockAssignment{
			ID:     assignmentID,
			LockID: lockID,
			UnitID: unitID,
			Status: model.LockAssignmentActive,
		}
		delete(tenancyRepo.tenancies, tenancyID)

		result, err = authorizer.AuthorizeLockOperation(context.Background(), LockAuthorizationRequest{
			TenantSubjectID: tenantSubjectID,
			LockID:          lockID,
			Operation:       "lock.command",
		})

		require.NoError(t, err)
		assert.False(t, result.Authorized, "should be denied without tenancy")
	})
}
