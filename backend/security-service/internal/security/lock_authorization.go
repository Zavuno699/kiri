package security

import (
	"context"
	"errors"

	"github.com/google/uuid"
)

var (
	ErrTenantNotAuthorized = errors.New("tenant not authorized for this lock")
	ErrLockNotAssigned      = errors.New("lock not assigned to tenant's unit")
	ErrTenancyInactive      = errors.New("tenant does not have an active tenancy")
	ErrLockInactive         = errors.New("lock is not in active state")
)

// LockAuthorizationRequest represents a request to authorize a lock operation
type LockAuthorizationRequest struct {
	TenantSubjectID  uuid.UUID
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
	// This would need repositories to fetch:
	// - Active tenancy for tenant
	// - Unit from tenancy
	// - Lock assignment for unit
	// - Lock/device state
	// For now, this is a placeholder structure showing the contract
}

func NewTenantLockAuthorizer() *TenantLockAuthorizer {
	return &TenantLockAuthorizer{}
}

// AuthorizeLockOperation evaluates whether a tenant is authorized to operate a lock
// Authorization chain: Tenant → Active Tenancy → Unit → Assigned Lock → Lock State
// Fails closed on any missing/ambiguous/inactive/revoked/suspended/inconsistent relationship
func (a *TenantLockAuthorizer) AuthorizeLockOperation(ctx context.Context, req LockAuthorizationRequest) (LockAuthorizationResult, error) {
	// TODO: Implement full authorization chain
	// 1. Fetch active tenancy for tenantSubjectID
	// 2. Verify tenancy is ACTIVE (not SUSPENDED, TERMINATED, REVOKED)
	// 3. Fetch unit from tenancy
	// 4. Fetch active lock assignment for unit (via lockAssignmentRepo)
	// 5. Verify assigned lock matches requested lockID
	// 6. Verify lock is in active/provisioned state (not RETIRED/SUSPENDED)
	// 7. Return authorized=false with reason for any failure
	
	// Placeholder: deny all until repositories are wired
	return LockAuthorizationResult{
		Authorized: false,
		Reason:     "Lock authorization not yet implemented - requires repository wiring",
	}, nil
}
