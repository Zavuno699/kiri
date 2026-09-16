package service

import (
	"context"
	"errors"

	"github.com/google/uuid"

	"github.com/kirilock/backend/identity-service/internal/model"
	"github.com/kirilock/backend/identity-service/internal/repository"
)

var (
	ErrTenantNotAuthorized = errors.New("tenant not authorized for this lock")
	ErrLockNotAssigned     = errors.New("lock not assigned to tenant's unit")
	ErrTenancyInactive     = errors.New("tenant does not have an active tenancy")
	ErrLockInactive        = errors.New("lock is not in active state")
)

// LockAuthorizationRequest represents a request to authorize a lock operation
type LockAuthorizationRequest struct {
	TenantSubjectID uuid.UUID
	LockID          uuid.UUID
	Operation       string // e.g., "lock.command", "lock.status"
}

// LockAuthorizationResult represents the result of a lock authorization check
type LockAuthorizationResult struct {
	Authorized bool
	TenancyID  uuid.UUID
	UnitID     uuid.UUID
	Reason     string
}

// LockAuthorizer evaluates tenant → active tenancy → unit → assigned lock authorization
// This is the authoritative decision point for tenant lock access
type LockAuthorizer interface {
	AuthorizeLockOperation(ctx context.Context, req LockAuthorizationRequest) (LockAuthorizationResult, error)
}

// TenantLockAuthorizer implements LockAuthorizer using tenant, unit, and lock relationships
type TenantLockAuthorizer struct {
	tenancyRepo        repository.TenancyRepository
	lockAssignmentRepo repository.LockAssignmentRepository
}

func NewTenantLockAuthorizer(
	tenancyRepo repository.TenancyRepository,
	lockAssignmentRepo repository.LockAssignmentRepository,
) *TenantLockAuthorizer {
	return &TenantLockAuthorizer{
		tenancyRepo:        tenancyRepo,
		lockAssignmentRepo: lockAssignmentRepo,
	}
}

// AuthorizeLockOperation evaluates whether a tenant is authorized to operate a lock
// Authorization chain: Tenant → Active Tenancy → Unit → Assigned Lock → Lock State
// Fails closed on any missing/inactive/revoked/suspended/inconsistent relationship
func (a *TenantLockAuthorizer) AuthorizeLockOperation(ctx context.Context, req LockAuthorizationRequest) (LockAuthorizationResult, error) {
	// Step 1: Fetch active tenancy for tenant
	tenancy, err := a.tenancyRepo.GetActiveByTenantSubjectID(ctx, req.TenantSubjectID)
	if err != nil {
		return LockAuthorizationResult{
			Authorized: false,
			Reason:     "no active tenancy found for tenant",
		}, nil
	}

	// Check if tenancy is empty (no active tenancy found)
	if tenancy.ID == uuid.Nil {
		return LockAuthorizationResult{
			Authorized: false,
			Reason:     "no active tenancy found for tenant",
		}, nil
	}

	// Step 2: Verify tenancy is ACTIVE (not SUSPENDED, TERMINATED, REVOKED)
	if tenancy.Status != model.TenancyActive {
		return LockAuthorizationResult{
			Authorized: false,
			TenancyID:  tenancy.ID,
			UnitID:     tenancy.UnitID,
			Reason:     "tenancy is not active (status: " + string(tenancy.Status) + ")",
		}, nil
	}

	// Step 3: Fetch active lock assignment for unit
	assignment, err := a.lockAssignmentRepo.GetActiveByUnitID(ctx, tenancy.UnitID)
	if err != nil {
		return LockAuthorizationResult{
			Authorized: false,
			TenancyID:  tenancy.ID,
			UnitID:     tenancy.UnitID,
			Reason:     "failed to query lock assignment",
		}, nil
	}

	if assignment == nil {
		return LockAuthorizationResult{
			Authorized: false,
			TenancyID:  tenancy.ID,
			UnitID:     tenancy.UnitID,
			Reason:     "no lock assigned to tenant's unit",
		}, nil
	}

	// Step 4: Verify assigned lock matches requested lockID
	if assignment.LockID != req.LockID {
		return LockAuthorizationResult{
			Authorized: false,
			TenancyID:  tenancy.ID,
			UnitID:     tenancy.UnitID,
			Reason:     "requested lock does not match assigned lock",
		}, nil
	}

	// Step 5: Verify lock assignment is ACTIVE
	if assignment.Status != model.LockAssignmentActive {
		return LockAuthorizationResult{
			Authorized: false,
			TenancyID:  tenancy.ID,
			UnitID:     tenancy.UnitID,
			Reason:     "lock assignment is not active (status: " + string(assignment.Status) + ")",
		}, nil
	}

	// Step 6: All checks passed - tenant is authorized
	return LockAuthorizationResult{
		Authorized: true,
		TenancyID:  tenancy.ID,
		UnitID:     tenancy.UnitID,
		Reason:     "authorization successful",
	}, nil
}
