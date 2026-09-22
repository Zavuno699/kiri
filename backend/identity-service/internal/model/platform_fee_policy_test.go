package model

import (
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
)

func TestPlatformFeePolicy_CalculateFee_Percentage(t *testing.T) {
	tests := []struct {
		name             string
		percentageBasis  int64 // in basis points (10000 = 100%)
		grossAmount      int64
		expectedFee      int64
	}{
		{"10% of 1000", 1000, 1000, 100},     // 1000 * 1000 / 10000 = 100
		{"10% of 1005", 1000, 1005, 101},     // (1005 * 1000 + 5000) / 10000 = 101 (round up)
		{"10% of 995", 1000, 995, 100},       // (995 * 1000 + 5000) / 10000 = 100 (round up)
		{"0% of any amount", 0, 1000, 0},
		{"100% of 1000", 10000, 1000, 1000},
		{"5% of 10000", 500, 10000, 500},
		{"1% of 12345", 100, 12345, 123},     // (12345 * 100 + 5000) / 10000 = 123
		{"12.5% of 1000", 1250, 1000, 125},   // 1000 * 1250 / 10000 = 125
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			policy := PlatformFeePolicy{
				ID:            uuid.New(),
				PolicyVersion: "v1",
				FeeType:       FeeTypePercentage,
				PercentageFee: &tt.percentageBasis,
				Currency:      "UGX",
				EffectiveFrom: time.Now(),
			}
			fee := policy.CalculateFee(tt.grossAmount)
			assert.Equal(t, tt.expectedFee, fee)
		})
	}
}

func TestPlatformFeePolicy_CalculateFee_Fixed(t *testing.T) {
	tests := []struct {
		name        string
		fixedFee    int64
		grossAmount int64
		expectedFee int64
	}{
		{"fixed 500", 500, 1000, 500},
		{"fixed 0", 0, 1000, 0},
		{"fixed 10000", 10000, 1000, 10000},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			policy := PlatformFeePolicy{
				ID:            uuid.New(),
				PolicyVersion: "v1",
				FeeType:       FeeTypeFixed,
				FixedFee:      &tt.fixedFee,
				Currency:      "UGX",
				EffectiveFrom: time.Now(),
			}
			fee := policy.CalculateFee(tt.grossAmount)
			assert.Equal(t, tt.expectedFee, fee)
		})
	}
}

func TestPlatformFeePolicy_CalculateFee_Hybrid(t *testing.T) {
	tests := []struct {
		name             string
		percentageBasis  int64
		fixedFee         int64
		grossAmount      int64
		expectedFee      int64
	}{
		{"10% + 500 on 1000", 1000, 500, 1000, 600},     // 100 + 500 = 600
		{"5% + 100 on 2000", 500, 100, 2000, 200},      // 100 + 100 = 200
		{"0% + 500 on 1000", 0, 500, 1000, 500},
		{"10% + 0 on 1000", 1000, 0, 1000, 100},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			policy := PlatformFeePolicy{
				ID:            uuid.New(),
				PolicyVersion: "v1",
				FeeType:       FeeTypeHybrid,
				PercentageFee: &tt.percentageBasis,
				FixedFee:      &tt.fixedFee,
				Currency:      "UGX",
				EffectiveFrom: time.Now(),
			}
			fee := policy.CalculateFee(tt.grossAmount)
			assert.Equal(t, tt.expectedFee, fee)
		})
	}
}

func TestPlatformFeePolicy_CalculateFee_ZeroFee(t *testing.T) {
	tests := []struct {
		name    string
		feeType FeeType
	}{
		{"percentage nil", FeeTypePercentage},
		{"fixed nil", FeeTypeFixed},
		{"hybrid nil", FeeTypeHybrid},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			policy := PlatformFeePolicy{
				ID:            uuid.New(),
				PolicyVersion: "v1",
				FeeType:       tt.feeType,
				Currency:      "UGX",
				EffectiveFrom: time.Now(),
			}
			fee := policy.CalculateFee(1000)
			assert.Equal(t, int64(0), fee)
		})
	}
}

func TestPlatformFeePolicy_CalculateFee_GrossEqualsFeePlusSettlement(t *testing.T) {
	// Verify the invariant: gross = fee + settlement (net)
	// For landlord: settlement = gross - fee
	tests := []struct {
		name             string
		feeType          FeeType
		percentageBasis  int64
		fixedFee         int64
		grossAmount      int64
	}{
		{"percentage 10%", FeeTypePercentage, 1000, 0, 10000},
		{"percentage 5%", FeeTypePercentage, 500, 0, 5000},
		{"fixed 500", FeeTypeFixed, 0, 500, 10000},
		{"hybrid 10% + 500", FeeTypeHybrid, 1000, 500, 10000},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			policy := PlatformFeePolicy{
				ID:            uuid.New(),
				PolicyVersion: "v1",
				FeeType:       tt.feeType,
				PercentageFee: &tt.percentageBasis,
				FixedFee:      &tt.fixedFee,
				Currency:      "UGX",
				EffectiveFrom: time.Now(),
			}
			fee := policy.CalculateFee(tt.grossAmount)
			settlement := tt.grossAmount - fee
			// gross = fee + settlement
			assert.Equal(t, tt.grossAmount, fee+settlement)
		})
	}
}

func TestPlatformFeePolicy_Validate(t *testing.T) {
	tests := []struct {
		name        string
		policy      PlatformFeePolicy
		expectError bool
	}{
		{
			name: "valid percentage policy",
			policy: PlatformFeePolicy{
				ID:            uuid.New(),
				PolicyVersion: "v1",
				FeeType:       FeeTypePercentage,
				PercentageFee: func() *int64 { v := int64(1000); return &v }(),
				Currency:      "UGX",
				EffectiveFrom: time.Now(),
			},
			expectError: false,
		},
		{
			name: "valid fixed policy",
			policy: PlatformFeePolicy{
				ID:            uuid.New(),
				PolicyVersion: "v1",
				FeeType:       FeeTypeFixed,
				FixedFee:      func() *int64 { v := int64(500); return &v }(),
				Currency:      "UGX",
				EffectiveFrom: time.Now(),
			},
			expectError: false,
		},
		{
			name: "valid hybrid policy",
			policy: PlatformFeePolicy{
				ID:            uuid.New(),
				PolicyVersion: "v1",
				FeeType:       FeeTypeHybrid,
				PercentageFee: func() *int64 { v := int64(500); return &v }(),
				FixedFee:      func() *int64 { v := int64(200); return &v }(),
				Currency:      "UGX",
				EffectiveFrom: time.Now(),
			},
			expectError: false,
		},
		{
			name: "invalid: percentage fee > 100%",
			policy: PlatformFeePolicy{
				ID:            uuid.New(),
				PolicyVersion: "v1",
				FeeType:       FeeTypePercentage,
				PercentageFee: func() *int64 { v := int64(10001); return &v }(),
				Currency:      "UGX",
				EffectiveFrom: time.Now(),
			},
			expectError: true,
		},
		{
			name: "invalid: percentage fee negative",
			policy: PlatformFeePolicy{
				ID:            uuid.New(),
				PolicyVersion: "v1",
				FeeType:       FeeTypePercentage,
				PercentageFee: func() *int64 { v := int64(-1); return &v }(),
				Currency:      "UGX",
				EffectiveFrom: time.Now(),
			},
			expectError: true,
		},
		{
			name: "invalid: fixed fee negative",
			policy: PlatformFeePolicy{
				ID:            uuid.New(),
				PolicyVersion: "v1",
				FeeType:       FeeTypeFixed,
				FixedFee:      func() *int64 { v := int64(-1); return &v }(),
				Currency:      "UGX",
				EffectiveFrom: time.Now(),
			},
			expectError: true,
		},
		{
			name: "invalid: currency not 3 chars",
			policy: PlatformFeePolicy{
				ID:            uuid.New(),
				PolicyVersion: "v1",
				FeeType:       FeeTypePercentage,
				PercentageFee: func() *int64 { v := int64(1000); return &v }(),
				Currency:      "USDOLLAR",
				EffectiveFrom: time.Now(),
			},
			expectError: true,
		},
		{
			name: "invalid: effective_until before effective_from",
			policy: PlatformFeePolicy{
				ID:            uuid.New(),
				PolicyVersion: "v1",
				FeeType:       FeeTypePercentage,
				PercentageFee: func() *int64 { v := int64(1000); return &v }(),
				Currency:      "UGX",
				EffectiveFrom: time.Now(),
				EffectiveUntil: func() *time.Time { t := time.Now().Add(-24 * time.Hour); return &t }(),
			},
			expectError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.policy.Validate()
			if tt.expectError {
				assert.Error(t, err)
			} else {
				assert.NoError(t, err)
			}
		})
	}
}
