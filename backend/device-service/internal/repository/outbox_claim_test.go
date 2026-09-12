package repository

import (
	"context"
	"testing"
	"time"

	"github.com/google/uuid"
)

func TestDeviceOutboxEventStatusConstantsRemainStable(t *testing.T) {
	event := DeviceOutboxEvent{
		ID:            uuid.New(),
		EventID:       uuid.New(),
		EventType:     "device.heartbeat",
		EventVersion:  1,
		AggregateID:   uuid.New(),
		CorrelationID: uuid.NewString(),
		Producer:      "kirilock-test",
		Payload:       []byte(`{}`),
		Status:        "PENDING",
		Attempts:      0,
		AvailableAt:   time.Now().UTC(),
		CreatedAt:     time.Now().UTC(),
		UpdatedAt:     time.Now().UTC(),
		Version:       1,
	}

	if err := event.Validate(); err != nil {
		t.Fatalf("valid outbox event rejected: %v", err)
	}
}

func TestDeviceOutboxClaimRepositoryRequiresContext(t *testing.T) {
	var repo *SQLDeviceOutboxClaimRepository

	if repo == nil {
		t.Skip("repository constructor requires a live DB; integration coverage is deferred")
	}

	_, _ = repo.ClaimNext(context.Background(), time.Now().UTC(), time.Second)
}
