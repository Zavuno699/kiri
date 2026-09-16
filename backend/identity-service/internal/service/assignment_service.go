package service

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/kirilock/backend/identity-service/internal/model"
	"github.com/kirilock/backend/identity-service/internal/repository"
)

var (
	ErrAssignmentNotFound     = errors.New("assignment not found")
	ErrUnauthorizedAssignment = errors.New("not authorized to perform this assignment")
	ErrLockNotEligible        = errors.New("lock is not eligible for assignment")
	ErrLockAlreadyAssigned    = errors.New("lock is already assigned to a different unit")
	ErrUnitAlreadyAssigned    = errors.New("unit already has an active lock assignment")
	ErrAssignmentConflict     = errors.New("assignment conflict - lock or unit in incompatible state")
	ErrActiveTenancyConflict  = errors.New("cannot reassign lock while unit has active tenancy")
)

type AssignmentService struct {
	assignmentRepo  repository.LockAssignmentRepository
	propertyRepo    repository.PropertyRepository
	unitRepo        repository.UnitRepository
	landlordRepo    repository.LandlordProfileRepository
	landlordService *LandlordService
	pool            *pgxpool.Pool
}

func NewAssignmentService(
	assignmentRepo repository.LockAssignmentRepository,
	propertyRepo repository.PropertyRepository,
	unitRepo repository.UnitRepository,
	landlordRepo repository.LandlordProfileRepository,
	landlordService *LandlordService,
	pool *pgxpool.Pool,
) *AssignmentService {
	return &AssignmentService{
		assignmentRepo:  assignmentRepo,
		propertyRepo:    propertyRepo,
		unitRepo:        unitRepo,
		landlordRepo:    landlordRepo,
		landlordService: landlordService,
		pool:            pool,
	}
}

// AssignLockToUnit assigns a lock to a unit transactionally
// Steps: (1) derive+authorize actor, (2) verify property ownership, (3) verify unit belongs to property,
// (4) verify lock eligibility, (5) verify lock not already actively assigned incompatibly,
// (6) insert assignment, (7) update unit assignment state, (8) write audit record, (9) commit atomically
func (s *AssignmentService) AssignLockToUnit(
	ctx context.Context,
	actorSubjectID uuid.UUID,
	lockID uuid.UUID,
	unitID uuid.UUID,
	notes string,
) (*model.LockAssignment, error) {
	// Start transaction
	tx, err := s.pool.Begin(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer func() {
		if err != nil {
			tx.Rollback(ctx)
		}
	}()

	// Get landlord profile for authorization
	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, actorSubjectID)
	if err != nil {
		return nil, fmt.Errorf("failed to get landlord profile: %w", err)
	}

	// Check operational access
	if err := s.landlordService.CheckOperationalAccess(ctx, actorSubjectID); err != nil {
		return nil, fmt.Errorf("landlord not authorized: %w", err)
	}

	// Get unit and verify property ownership
	unit, err := s.unitRepo.GetByID(ctx, unitID)
	if err != nil {
		return nil, fmt.Errorf("failed to get unit: %w", err)
	}

	property, err := s.propertyRepo.GetByID(ctx, unit.PropertyID)
	if err != nil {
		return nil, fmt.Errorf("failed to get property: %w", err)
	}

	if property.LandlordProfileID != landlordProfile.ID {
		return nil, ErrUnauthorizedAssignment
	}

	// TODO: Verify lock eligibility when device-service integration is available
	// This would call device-service to check if lock exists and is in assignable state

	// Check for existing active assignment on this lock
	// Use SELECT FOR UPDATE to lock the row for concurrency
	activeLockAssignment, err := s.assignmentRepo.GetActiveByLockID(ctx, lockID)
	if err != nil {
		return nil, fmt.Errorf("failed to check existing lock assignment: %w", err)
	}

	if activeLockAssignment != nil && activeLockAssignment.UnitID != unitID {
		// Lock is assigned to a different unit - need to end current assignment first
		// For now, return error - controlled reassignment is a separate operation
		return nil, ErrLockAlreadyAssigned
	}

	// Check for existing active assignment on this unit
	activeUnitAssignment, err := s.assignmentRepo.GetActiveByUnitID(ctx, unitID)
	if err != nil {
		return nil, fmt.Errorf("failed to check existing unit assignment: %w", err)
	}

	if activeUnitAssignment != nil && activeUnitAssignment.LockID != lockID {
		// Unit has a different lock assigned - need to end current assignment first
		return nil, ErrUnitAlreadyAssigned
	}

	// Check for active tenancy on the unit
	// TODO: Query tenancies table to ensure no active tenancy exists
	// If active tenancy exists, return ErrActiveTenancyConflict

	// Create new assignment
	assignment := model.LockAssignment{
		ID:         uuid.New(),
		LockID:     lockID,
		UnitID:     unitID,
		Status:     model.LockAssignmentActive,
		AssignedAt: time.Now(),
		Notes:      notes,
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
		Version:    1,
	}

	if err := s.assignmentRepo.Create(ctx, assignment); err != nil {
		return nil, fmt.Errorf("failed to create assignment: %w", err)
	}

	// TODO: Update unit assignment state when unit model has lock_id field
	// For now, this is done via the assignment table

	// TODO: Write audit record
	// Record: actor, action (lock assigned), resource (lock_id, unit_id), result (success), timestamp

	// Commit transaction
	if err := tx.Commit(ctx); err != nil {
		return nil, fmt.Errorf("failed to commit transaction: %w", err)
	}

	return &assignment, nil
}

// UnassignLock ends the current active assignment for a lock
func (s *AssignmentService) UnassignLock(
	ctx context.Context,
	actorSubjectID uuid.UUID,
	lockID uuid.UUID,
	notes string,
) error {
	// Get landlord profile for authorization
	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, actorSubjectID)
	if err != nil {
		return fmt.Errorf("failed to get landlord profile: %w", err)
	}

	// Check operational access
	if err := s.landlordService.CheckOperationalAccess(ctx, actorSubjectID); err != nil {
		return fmt.Errorf("landlord not authorized: %w", err)
	}

	// Get active assignment
	activeAssignment, err := s.assignmentRepo.GetActiveByLockID(ctx, lockID)
	if err != nil {
		return fmt.Errorf("failed to get active assignment: %w", err)
	}

	if activeAssignment == nil {
		return ErrAssignmentNotFound
	}

	// Verify the lock is assigned to a unit owned by this landlord
	unit, err := s.unitRepo.GetByID(ctx, activeAssignment.UnitID)
	if err != nil {
		return fmt.Errorf("failed to get unit: %w", err)
	}

	property, err := s.propertyRepo.GetByID(ctx, unit.PropertyID)
	if err != nil {
		return fmt.Errorf("failed to get property: %w", err)
	}

	if property.LandlordProfileID != landlordProfile.ID {
		return ErrUnauthorizedAssignment
	}

	// Check for active tenancy before unassigning
	// TODO: Query tenancies table - if active tenancy exists, block unassignment

	// End the assignment
	now := time.Now()
	nowStr := now.Format(time.RFC3339)
	if err := s.assignmentRepo.UpdateStatus(ctx, activeAssignment.ID, model.LockAssignmentInactive, &nowStr); err != nil {
		return fmt.Errorf("failed to update assignment status: %w", err)
	}

	// TODO: Update unit assignment state when unit model has lock_id field

	// TODO: Write audit record
	// Record: actor, action (lock unassigned), resource (lock_id), result (success), timestamp

	return nil
}

// ReassignLock moves a lock from one unit to another
// This is a controlled operation: CURRENT → UNASSIGN/END → NEW ASSIGNMENT
func (s *AssignmentService) ReassignLock(
	ctx context.Context,
	actorSubjectID uuid.UUID,
	lockID uuid.UUID,
	fromUnitID uuid.UUID,
	toUnitID uuid.UUID,
	notes string,
) (*model.LockAssignment, error) {
	// Start transaction
	tx, err := s.pool.Begin(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer func() {
		if err != nil {
			tx.Rollback(ctx)
		}
	}()

	// Get landlord profile for authorization
	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, actorSubjectID)
	if err != nil {
		return nil, fmt.Errorf("failed to get landlord profile: %w", err)
	}

	// Check operational access
	if err := s.landlordService.CheckOperationalAccess(ctx, actorSubjectID); err != nil {
		return nil, fmt.Errorf("landlord not authorized: %w", err)
	}

	// Verify both units belong to the same property owned by this landlord
	fromUnit, err := s.unitRepo.GetByID(ctx, fromUnitID)
	if err != nil {
		return nil, fmt.Errorf("failed to get from unit: %w", err)
	}

	toUnit, err := s.unitRepo.GetByID(ctx, toUnitID)
	if err != nil {
		return nil, fmt.Errorf("failed to get to unit: %w", err)
	}

	if fromUnit.PropertyID != toUnit.PropertyID {
		return nil, errors.New("cannot reassign lock between different properties")
	}

	property, err := s.propertyRepo.GetByID(ctx, fromUnit.PropertyID)
	if err != nil {
		return nil, fmt.Errorf("failed to get property: %w", err)
	}

	if property.LandlordProfileID != landlordProfile.ID {
		return nil, ErrUnauthorizedAssignment
	}

	// Get current active assignment on the lock
	activeAssignment, err := s.assignmentRepo.GetActiveByLockID(ctx, lockID)
	if err != nil {
		return nil, fmt.Errorf("failed to get active assignment: %w", err)
	}

	if activeAssignment == nil {
		return nil, ErrAssignmentNotFound
	}

	if activeAssignment.UnitID != fromUnitID {
		return nil, errors.New("lock is not currently assigned to the specified from unit")
	}

	// Check for active tenancy on from unit
	// TODO: Query tenancies table - if active tenancy exists, block reassignment

	// Check for active tenancy on to unit
	// TODO: Query tenancies table - if active tenancy exists, block reassignment

	// End current assignment
	now := time.Now()
	nowStr := now.Format(time.RFC3339)
	if err := s.assignmentRepo.UpdateStatus(ctx, activeAssignment.ID, model.LockAssignmentReplaced, &nowStr); err != nil {
		return nil, fmt.Errorf("failed to end current assignment: %w", err)
	}

	// Create new assignment
	newAssignment := model.LockAssignment{
		ID:         uuid.New(),
		LockID:     lockID,
		UnitID:     toUnitID,
		Status:     model.LockAssignmentActive,
		AssignedAt: time.Now(),
		Notes:      notes,
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
		Version:    1,
	}

	if err := s.assignmentRepo.Create(ctx, newAssignment); err != nil {
		return nil, fmt.Errorf("failed to create new assignment: %w", err)
	}

	// TODO: Update unit assignment states when unit model has lock_id field

	// TODO: Write audit record
	// Record: actor, action (lock reassigned), resource (lock_id, from_unit_id, to_unit_id), result (success), timestamp

	// Commit transaction
	if err := tx.Commit(ctx); err != nil {
		return nil, fmt.Errorf("failed to commit transaction: %w", err)
	}

	return &newAssignment, nil
}

// GetLockAssignments returns all assignments for a lock
func (s *AssignmentService) GetLockAssignments(
	ctx context.Context,
	actorSubjectID uuid.UUID,
	lockID uuid.UUID,
) ([]model.LockAssignment, error) {
	// Check operational access
	if err := s.landlordService.CheckOperationalAccess(ctx, actorSubjectID); err != nil {
		return nil, fmt.Errorf("landlord not authorized: %w", err)
	}

	// TODO: Verify lock belongs to landlord's property when device-service integration is available

	return s.assignmentRepo.GetByLockID(ctx, lockID)
}

// GetUnitAssignments returns all assignments for a unit
func (s *AssignmentService) GetUnitAssignments(
	ctx context.Context,
	actorSubjectID uuid.UUID,
	unitID uuid.UUID,
) ([]model.LockAssignment, error) {
	// Verify unit ownership
	unit, err := s.unitRepo.GetByID(ctx, unitID)
	if err != nil {
		return nil, fmt.Errorf("failed to get unit: %w", err)
	}

	property, err := s.propertyRepo.GetByID(ctx, unit.PropertyID)
	if err != nil {
		return nil, fmt.Errorf("failed to get property: %w", err)
	}

	landlordProfile, err := s.landlordRepo.GetBySubjectID(ctx, actorSubjectID)
	if err != nil {
		return nil, fmt.Errorf("failed to get landlord profile: %w", err)
	}

	if property.LandlordProfileID != landlordProfile.ID {
		return nil, ErrUnauthorizedAssignment
	}

	return s.assignmentRepo.GetByUnitID(ctx, unitID)
}
