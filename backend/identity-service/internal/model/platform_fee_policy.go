package model

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type FeeType string

const (
	FeeTypePercentage FeeType = "PERCENTAGE"
	FeeTypeFixed      FeeType = "FIXED"
	FeeTypeHybrid     FeeType = "HYBRID"
)

type PlatformFeePolicy struct {
	ID              uuid.UUID
	PolicyVersion   string
	FeeType         FeeType
	PercentageFee   *float64 // e.g., 0.1000 for 10%, NULL for FIXED
	FixedFee        *int64   // in minor units (cents), NULL for PERCENTAGE
	Currency        string   // ISO 4217 currency code
	EffectiveFrom   time.Time
	EffectiveUntil  *time.Time // NULL means currently active
	Description     string
	CreatedBy       uuid.UUID // admin who created the policy
	CreatedAt       time.Time
}

func (p PlatformFeePolicy) Validate() error {
	if p.ID == uuid.Nil {
		return errors.New("id is required")
	}

	if p.PolicyVersion == "" {
		return errors.New("policy version is required")
	}

	switch p.FeeType {
	case FeeTypePercentage, FeeTypeFixed, FeeTypeHybrid:
		// Valid
	default:
		return errors.New("invalid fee type")
	}

	// Validate based on fee type
	switch p.FeeType {
	case FeeTypePercentage:
		if p.PercentageFee == nil {
			return errors.New("percentage fee is required for PERCENTAGE type")
		}
		if *p.PercentageFee < 0 || *p.PercentageFee > 1 {
			return errors.New("percentage fee must be between 0 and 1")
		}
		if p.FixedFee != nil {
			return errors.New("fixed fee must be NULL for PERCENTAGE type")
		}
	case FeeTypeFixed:
		if p.FixedFee == nil {
			return errors.New("fixed fee is required for FIXED type")
		}
		if *p.FixedFee < 0 {
			return errors.New("fixed fee must be >= 0")
		}
		if p.PercentageFee != nil {
			return errors.New("percentage fee must be NULL for FIXED type")
		}
	case FeeTypeHybrid:
		if p.PercentageFee == nil {
			return errors.New("percentage fee is required for HYBRID type")
		}
		if *p.PercentageFee < 0 || *p.PercentageFee > 1 {
			return errors.New("percentage fee must be between 0 and 1")
		}
		if p.FixedFee == nil {
			return errors.New("fixed fee is required for HYBRID type")
		}
		if *p.FixedFee < 0 {
			return errors.New("fixed fee must be >= 0")
		}
	}

	// Currency validation: must be ISO 4217 format (3 uppercase letters)
	if len(p.Currency) != 3 {
		return errors.New("currency must be 3-character ISO 4217 code")
	}

	// Effective dates validation
	if p.EffectiveUntil != nil && !p.EffectiveUntil.After(p.EffectiveFrom) {
		return errors.New("effective_until must be after effective_from")
	}

	return nil
}

func (p PlatformFeePolicy) IsActive() bool {
	now := time.Now()
	if p.EffectiveFrom.After(now) {
		return false
	}
	if p.EffectiveUntil != nil && p.EffectiveUntil.Before(now) {
		return false
	}
	return true
}

// CalculateFee computes the platform fee for a given gross amount
// Returns fee in minor units (cents)
func (p PlatformFeePolicy) CalculateFee(grossAmountMinor int64) int64 {
	switch p.FeeType {
	case FeeTypePercentage:
		if p.PercentageFee == nil {
			return 0
		}
		return int64(float64(grossAmountMinor) * (*p.PercentageFee))
	case FeeTypeFixed:
		if p.FixedFee == nil {
			return 0
		}
		return *p.FixedFee
	case FeeTypeHybrid:
		if p.PercentageFee == nil || p.FixedFee == nil {
			return 0
		}
		percentageAmount := int64(float64(grossAmountMinor) * (*p.PercentageFee))
		return percentageAmount + *p.FixedFee
	default:
		return 0
	}
}
