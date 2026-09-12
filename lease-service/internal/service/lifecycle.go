package service

import (
	"errors"
	"time"

	"github.com/kirilock/backend/lease-service/internal/model"
)

func DetermineStatus(
	now time.Time,
	entitlementUntil time.Time,
	graceUntil time.Time,
	complianceUntil time.Time,
) (model.LeaseStatus, error) {
	if now.IsZero() {
		return "", errors.New("current time is required")
	}

	if entitlementUntil.IsZero() {
		return "", errors.New("entitlement expiry is required")
	}

	if graceUntil.IsZero() {
		return "", errors.New("grace deadline is required")
	}

	if complianceUntil.IsZero() {
		return "", errors.New("compliance deadline is required")
	}

	if graceUntil.Before(entitlementUntil) {
		return "", errors.New("grace deadline cannot precede entitlement expiry")
	}

	if complianceUntil.Before(graceUntil) {
		return "", errors.New("compliance deadline cannot precede grace deadline")
	}

	switch {
	case now.Before(entitlementUntil):
		return model.LeaseActive, nil
	case now.Before(graceUntil):
		return model.LeaseGracePeriod, nil
	default:
		return model.LeaseLocked, nil
	}
}

func CanUnlock(status model.LeaseStatus) bool {
	return status == model.LeaseActive || status == model.LeaseGracePeriod
}

func CanRestoreAfterPayment(status model.LeaseStatus) bool {
	switch status {
	case model.LeaseActive, model.LeaseGracePeriod, model.LeaseLocked:
		return true
	default:
		return false
	}
}
