package security

import (
	"context"
	"errors"

	"github.com/google/uuid"
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
	// These would be repository interfaces for:
	// - TenancyRepository: fetch active tenancy for tenant
	// - LockAssignmentRepository: fetch active lock assignment for unit
	// For now, this is a placeholder structure showing the contract
	// The full implementation requires wiring these repositories from identity-service
}

func NewTenantLockAuthorizer() *TenantLockAuthorizer {
	return &TenantLockAuthorizer{}
}

// AuthorizeLockOperation evaluates whether a tenant is authorized to operate a lock
// Authorization chain: Tenant → Active Tenancy → Unit → Assigned Lock → Lock State
// Fails closed on any missing/ambiguous/inactive/revoked/suspended/inconsistent relationship
//
// NOTE: This is a partial implementation. The full implementation requires:
// 1. Repository interfaces wired from identity-service (TenancyRepository, LockAssignmentRepository)
// 2. Fetch active tenancy for tenantSubjectID
// 3. Verify tenancy is ACTIVE (not SUSPENDED, TERMINATED, REVOKED)
// 4. Fetch unit from tenancy
// 5. Fetch active lock assignment for unit (via lockAssignmentRepo)
// 6. Verify assigned lock matches requested lockID
// 7. Verify lock is in active/provisioned state (not RETIRED/SUSPENDED)
// 8. Return authorized=false with reason for any failure
//
// For now, this returns a placeholder denial to show the contract structure.
func (a *TenantLockAuthorizer) AuthorizeLockOperation(ctx context.Context, req LockAuthorizationRequest) (LockAuthorizationResult, error) {
	// Placeholder: deny all until repositories are wired from identity-service
	// The authorization chain would be:
	// 1. tenancy, err := tenancyRepo.GetActiveByTenantID(ctx, req.TenantSubjectID)
	// 2. if err != nil || tenancy.Status != "ACTIVE" -> deny
	// 3. assignment, err := lockAssignmentRepo.GetActiveByUnitID(ctx, tenancy.UnitID)
	// 4. if err != nil || assignment.LockID != req.LockID -> deny
	// 5. verify lock/device state -> allow or deny

	return LockAuthorizationResult{
		Authorized: false,
		Reason:     "Lock authorization requires repository wiring from identity-service (TenancyRepository, LockAssignmentRepository)",
	}, nil
}
