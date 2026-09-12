package service

import (
	"errors"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/lease-service/internal/model"
	"github.com/kirilock/backend/lease-service/internal/repository"
)

type LeaseService struct {
	repository repository.LeaseRepository
}

func New() *LeaseService {
	return &LeaseService{}
}

func NewWithRepository(repo repository.LeaseRepository) *LeaseService {
	return &LeaseService{
		repository: repo,
	}
}

func (s *LeaseService) BuildLease(
	tenantID uuid.UUID,
	propertyID uuid.UUID,
	entitlementFrom time.Time,
	entitlementUntil time.Time,
	graceUntil time.Time,
	complianceUntil time.Time,
	now time.Time,
) (model.Lease, error) {
	if tenantID == uuid.Nil {
		return model.Lease{}, errors.New("tenant ID is required")
	}

	if propertyID == uuid.Nil {
		return model.Lease{}, errors.New("property ID is required")
	}

	status, err := DetermineStatus(
		now,
		entitlementUntil,
		graceUntil,
		complianceUntil,
	)
	if err != nil {
		return model.Lease{}, err
	}

	createdAt := now.UTC()

	lease := model.Lease{
		ID:               uuid.New(),
		TenantID:         tenantID,
		PropertyID:       propertyID,
		Status:           status,
		EntitlementFrom:  entitlementFrom.UTC(),
		EntitlementUntil: entitlementUntil.UTC(),
		GraceUntil:       graceUntil.UTC(),
		ComplianceUntil:  complianceUntil.UTC(),
		CreatedAt:        createdAt,
		UpdatedAt:        createdAt,
		Version:          1,
	}

	if err := lease.Validate(); err != nil {
		return model.Lease{}, err
	}

	return lease, nil
}
