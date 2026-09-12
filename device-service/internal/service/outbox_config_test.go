package service

import (
	"fmt"
	"testing"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/device-service/internal/repository"
)

func validRetryTestEvent(attempts int) repository.DeviceOutboxEvent {
	now := time.Date(2026, 9, 11, 12, 0, 0, 0, time.UTC)

	return repository.DeviceOutboxEvent{
		ID:            uuid.New(),
		EventID:       uuid.New(),
		EventType:     "device.heartbeat",
		EventVersion:  1,
		AggregateID:   uuid.New(),
		CorrelationID: uuid.NewString(),
		Producer:      "kirilock-test",
		Payload:       []byte(`{}`),
		Status:        "FAILED",
		Attempts:      attempts,
		AvailableAt:   now,
		CreatedAt:     now,
		UpdatedAt:     now,
		Version:       1,
	}
}

func TestDeviceOutboxConfigDefaultsValid(t *testing.T) {
	cfg := DefaultDeviceOutboxConfig()

	if err := cfg.Validate(); err != nil {
		t.Fatalf("default config invalid: %v", err)
	}
}

func TestDeviceOutboxConfigRejectsInvalidValues(t *testing.T) {
	tests := []struct {
		name string
		cfg  DeviceOutboxConfig
	}{
		{
			name: "zero claim duration",
			cfg: DeviceOutboxConfig{
				ClaimDuration:     0,
				InitialRetryDelay: time.Second,
				MaxRetryDelay:     time.Minute,
				PollInterval:      time.Second,
			},
		},
		{
			name: "zero initial retry delay",
			cfg: DeviceOutboxConfig{
				ClaimDuration:     time.Second,
				InitialRetryDelay: 0,
				MaxRetryDelay:     time.Minute,
				PollInterval:      time.Second,
			},
		},
		{
			name: "maximum below initial",
			cfg: DeviceOutboxConfig{
				ClaimDuration:     time.Second,
				InitialRetryDelay: time.Minute,
				MaxRetryDelay:     time.Second,
				PollInterval:      time.Second,
			},
		},
		{
			name: "zero poll interval",
			cfg: DeviceOutboxConfig{
				ClaimDuration:     time.Second,
				InitialRetryDelay: time.Second,
				MaxRetryDelay:     time.Minute,
				PollInterval:      0,
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := tt.cfg.Validate(); err == nil {
				t.Fatal("expected validation error")
			}
		})
	}
}

func TestDeviceOutboxRetryPolicyBackoff(t *testing.T) {
	cfg := DefaultDeviceOutboxConfig()

	policy, err := NewDeviceOutboxRetryPolicy(cfg)
	if err != nil {
		t.Fatalf("create policy: %v", err)
	}

	tests := []struct {
		attempts int
		want     time.Duration
	}{
		{attempts: 1, want: 5 * time.Second},
		{attempts: 2, want: 10 * time.Second},
		{attempts: 3, want: 20 * time.Second},
		{attempts: 4, want: 40 * time.Second},
		{attempts: 5, want: 80 * time.Second},
		{attempts: 6, want: 160 * time.Second},
		{attempts: 7, want: 5 * time.Minute},
		{attempts: 100, want: 5 * time.Minute},
	}

	for _, tt := range tests {
		t.Run(fmt.Sprintf("attempt-%d", tt.attempts), func(t *testing.T) {
			event := validRetryTestEvent(tt.attempts)

			got, err := policy.Delay(event)
			if err != nil {
				t.Fatalf("delay(%d): %v", tt.attempts, err)
			}

			if got != tt.want {
				t.Fatalf("delay(%d) = %s, want %s", tt.attempts, got, tt.want)
			}
		})
	}
}

func TestDeviceOutboxRetryPolicyRejectsInvalidAttempt(t *testing.T) {
	policy, err := NewDeviceOutboxRetryPolicy(DefaultDeviceOutboxConfig())
	if err != nil {
		t.Fatalf("create policy: %v", err)
	}

	if _, err := policy.Delay(validRetryTestEvent(0)); err == nil {
		t.Fatal("expected zero attempts to fail")
	}

	if _, err := policy.Delay(validRetryTestEvent(-1)); err == nil {
		t.Fatal("expected negative attempts to fail")
	}
}

func TestDeviceOutboxRetryPolicyNextAvailableAt(t *testing.T) {
	policy, err := NewDeviceOutboxRetryPolicy(DefaultDeviceOutboxConfig())
	if err != nil {
		t.Fatalf("create policy: %v", err)
	}

	now := time.Date(2026, 9, 11, 12, 0, 0, 0, time.UTC)
	event := validRetryTestEvent(3)

	got, err := policy.NextAvailableAt(event, now)
	if err != nil {
		t.Fatalf("next available: %v", err)
	}

	want := now.Add(20 * time.Second)

	if !got.Equal(want) {
		t.Fatalf("next available = %s, want %s", got, want)
	}
}

func TestDeviceOutboxRetryPolicyLargeAttemptIsBounded(t *testing.T) {
	policy, err := NewDeviceOutboxRetryPolicy(DefaultDeviceOutboxConfig())
	if err != nil {
		t.Fatalf("create policy: %v", err)
	}

	got, err := policy.Delay(validRetryTestEvent(1 << 30))
	if err != nil {
		t.Fatalf("large attempt: %v", err)
	}

	if got != 5*time.Minute {
		t.Fatalf("large attempt delay = %s, want 5m", got)
	}
}
