package service

import (
	"errors"
	"time"

	"github.com/kirilock/backend/lease-service/internal/model"
)

type EntitlementPolicy struct {
	GracePeriod      time.Duration
	CompliancePeriod time.Duration
}

func DefaultEntitlementPolicy() EntitlementPolicy {
	return EntitlementPolicy{
		GracePeriod:      5 * 24 * time.Hour,
		CompliancePeriod: 10 * 24 * time.Hour,
	}
}

func CalculateEntitlement(
	now time.Time,
	days int,
	policy EntitlementPolicy,
) (time.Time, time.Time, time.Time, time.Time, error) {
	if days < 1 {
		return time.Time{}, time.Time{}, time.Time{}, time.Time{},
			errors.New("days requested must be positive")
	}

	if policy.GracePeriod <= 0 ||
		policy.CompliancePeriod <= policy.GracePeriod {
		return time.Time{}, time.Time{}, time.Time{}, time.Time{},
			errors.New("invalid entitlement policy")
	}

	from := now.UTC()
	until := from.Add(time.Duration(days) * 24 * time.Hour)
	grace := until.Add(policy.GracePeriod)
	compliance := until.Add(policy.CompliancePeriod)

	return from, until, grace, compliance, nil
}

func EntitlementStatus(
	now time.Time,
	until time.Time,
	grace time.Time,
	compliance time.Time,
) (model.LeaseStatus, error) {
	return DetermineStatus(now, until, grace, compliance)
}
