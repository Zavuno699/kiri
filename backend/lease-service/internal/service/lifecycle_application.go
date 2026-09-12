package service

import (
	"context"
	"encoding/json"
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/lease-service/internal/model"
	"github.com/kirilock/backend/lease-service/internal/repository"
)

type LeaseLifecycleApplication struct {
	repository repository.LeaseRepository
}

func NewLeaseLifecycleApplication(
	repository repository.LeaseRepository,
) (*LeaseLifecycleApplication, error) {
	if repository == nil {
		return nil, errors.New("lease repository is required")
	}

	return &LeaseLifecycleApplication{
		repository: repository,
	}, nil
}

func (a *LeaseLifecycleApplication) Apply(
	ctx context.Context,
	event LeaseEvent,
) error {
	if a == nil {
		return errors.New("lease lifecycle application is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}

	if event.Metadata.EventType == "" {
		return errors.New("lease event type is required")
	}

	switch event.Metadata.EventType {
	case EventLeaseCreated:
		return a.applyCreated(ctx, event)
	case EventLeaseEntitlementChanged:
		return a.applyEntitlementChanged(ctx, event)
	case EventLeaseStatusChanged:
		return a.applyStatusChanged(ctx, event)
	default:
		return errors.New(
			"unsupported lease lifecycle event: " +
				strings.TrimSpace(event.Metadata.EventType),
		)
	}
}

func (a *LeaseLifecycleApplication) applyCreated(
	ctx context.Context,
	event LeaseEvent,
) error {
	payload, err := decodeLeaseCreated(event)
	if err != nil {
		return err
	}

	return a.repository.Create(ctx, model.Lease{
		ID:               payload.LeaseID,
		TenantID:         payload.TenantID,
		PropertyID:       payload.PropertyID,
		Status:           model.NormalizeLeaseStatus(payload.Status),
		EntitlementFrom:  payload.EntitlementFrom,
		EntitlementUntil: payload.EntitlementUntil,
		GraceUntil:       payload.GraceUntil,
		ComplianceUntil:  payload.ComplianceUntil,
		CreatedAt:        payload.CreatedAt,
		UpdatedAt:        payload.CreatedAt,
		Version:          1,
	})
}

func (a *LeaseLifecycleApplication) applyEntitlementChanged(
	ctx context.Context,
	event LeaseEvent,
) error {
	payload, err := decodeLeaseEntitlementChanged(event)
	if err != nil {
		return err
	}

	return a.repository.UpdateEntitlement(
		ctx,
		payload.LeaseID,
		payload.ExpectedVersion,
		payload.EntitlementFrom,
		payload.EntitlementUntil,
		payload.GraceUntil,
		payload.ComplianceUntil,
	)
}

func (a *LeaseLifecycleApplication) applyStatusChanged(
	ctx context.Context,
	event LeaseEvent,
) error {
	payload, err := decodeLeaseStatusChanged(event)
	if err != nil {
		return err
	}

	return a.repository.UpdateStatus(
		ctx,
		payload.LeaseID,
		payload.ExpectedVersion,
		model.NormalizeLeaseStatus(payload.Status),
	)
}

type leaseCreatedPayload struct {
	LeaseID          uuid.UUID         `json:"lease_id"`
	TenantID         uuid.UUID         `json:"tenant_id"`
	PropertyID       uuid.UUID         `json:"property_id"`
	Status           model.LeaseStatus `json:"status"`
	EntitlementFrom  time.Time         `json:"entitlement_from"`
	EntitlementUntil time.Time         `json:"entitlement_until"`
	GraceUntil       time.Time         `json:"grace_until"`
	ComplianceUntil  time.Time         `json:"compliance_until"`
	CreatedAt        time.Time         `json:"created_at"`
}

type leaseEntitlementChangedPayload struct {
	LeaseID          uuid.UUID `json:"lease_id"`
	ExpectedVersion  int64     `json:"expected_version"`
	EntitlementFrom  time.Time `json:"entitlement_from"`
	EntitlementUntil time.Time `json:"entitlement_until"`
	GraceUntil       time.Time `json:"grace_until"`
	ComplianceUntil  time.Time `json:"compliance_until"`
}

type leaseStatusChangedPayload struct {
	LeaseID         uuid.UUID         `json:"lease_id"`
	ExpectedVersion int64             `json:"expected_version"`
	Status          model.LeaseStatus `json:"status"`
}

func decodeLeaseCreated(event LeaseEvent) (leaseCreatedPayload, error) {
	data, err := json.Marshal(event.Data)
	if err != nil {
		return leaseCreatedPayload{}, err
	}

	var payload leaseCreatedPayload
	if err := json.Unmarshal(data, &payload); err != nil {
		return leaseCreatedPayload{}, err
	}

	if payload.LeaseID == uuid.Nil ||
		payload.TenantID == uuid.Nil ||
		payload.PropertyID == uuid.Nil {
		return leaseCreatedPayload{}, errors.New("lease.created contains invalid IDs")
	}

	return payload, nil
}

func decodeLeaseEntitlementChanged(
	event LeaseEvent,
) (leaseEntitlementChangedPayload, error) {
	data, err := json.Marshal(event.Data)
	if err != nil {
		return leaseEntitlementChangedPayload{}, err
	}

	var payload leaseEntitlementChangedPayload
	if err := json.Unmarshal(data, &payload); err != nil {
		return leaseEntitlementChangedPayload{}, err
	}

	if payload.LeaseID == uuid.Nil || payload.ExpectedVersion < 1 {
		return leaseEntitlementChangedPayload{}, errors.New(
			"lease.entitlement.changed contains invalid lease state",
		)
	}

	return payload, nil
}

func decodeLeaseStatusChanged(
	event LeaseEvent,
) (leaseStatusChangedPayload, error) {
	data, err := json.Marshal(event.Data)
	if err != nil {
		return leaseStatusChangedPayload{}, err
	}

	var payload leaseStatusChangedPayload
	if err := json.Unmarshal(data, &payload); err != nil {
		return leaseStatusChangedPayload{}, err
	}

	if payload.LeaseID == uuid.Nil || payload.ExpectedVersion < 1 {
		return leaseStatusChangedPayload{}, errors.New(
			"lease.status.changed contains invalid lease state",
		)
	}

	if model.NormalizeLeaseStatus(payload.Status) == "" {
		return leaseStatusChangedPayload{}, errors.New(
			"lease.status.changed contains invalid status",
		)
	}

	return payload, nil
}
