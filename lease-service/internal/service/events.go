package service

import (
	"context"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/lease-service/internal/model"
)

const (
	EventLeaseCreated            = "lease.created"
	EventLeaseEntitlementChanged = "lease.entitlement.changed"
	EventLeaseStatusChanged      = "lease.status.changed"
)

type LeaseCreatedEvent struct {
	LeaseID          uuid.UUID         `json:"lease_id"`
	TenantID         uuid.UUID         `json:"tenant_id"`
	PropertyID       uuid.UUID         `json:"property_id"`
	Status           model.LeaseStatus `json:"status"`
	EntitlementFrom  time.Time         `json:"entitlement_from"`
	EntitlementUntil time.Time         `json:"entitlement_until"`
	GraceUntil       time.Time         `json:"grace_until"`
	ComplianceUntil  time.Time         `json:"compliance_until"`
	Version          int64             `json:"version"`
}

type LeaseEntitlementChangedEvent struct {
	LeaseID          uuid.UUID `json:"lease_id"`
	TenantID         uuid.UUID `json:"tenant_id"`
	PropertyID       uuid.UUID `json:"property_id"`
	EntitlementFrom  time.Time `json:"entitlement_from"`
	EntitlementUntil time.Time `json:"entitlement_until"`
	GraceUntil       time.Time `json:"grace_until"`
	ComplianceUntil  time.Time `json:"compliance_until"`
	Version          int64     `json:"version"`
	PaymentID        uuid.UUID `json:"payment_id"`
	ProviderEventID  string    `json:"provider_event_id"`
	OccurredAt       time.Time `json:"occurred_at"`
}

type LeaseStatusChangedEvent struct {
	LeaseID    uuid.UUID         `json:"lease_id"`
	TenantID   uuid.UUID         `json:"tenant_id"`
	PropertyID uuid.UUID         `json:"property_id"`
	Previous   model.LeaseStatus `json:"previous_status"`
	Current    model.LeaseStatus `json:"current_status"`
	Version    int64             `json:"version"`
	OccurredAt time.Time         `json:"occurred_at"`
}

type LeaseEventPublisher interface {
	PublishLeaseCreated(context.Context, LeaseCreatedEvent) error
	PublishLeaseEntitlementChanged(context.Context, LeaseEntitlementChangedEvent) error
	PublishLeaseStatusChanged(context.Context, LeaseStatusChangedEvent) error
}
