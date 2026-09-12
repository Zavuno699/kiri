package service

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/device-service/internal/repository"
)

type fakeDeviceOutboxClaimRepository struct {
	event            *repository.DeviceOutboxEvent
	claimErr         error
	markPublishedErr error
	markFailedErr    error
	publishedCount   int
	failedCount      int
	failedRetryDelay time.Duration
	failedLastError  string
	publishedEventID uuid.UUID
	failedEventID    uuid.UUID
}

func (f *fakeDeviceOutboxClaimRepository) ClaimNext(
	ctx context.Context,
	now time.Time,
	claimDuration time.Duration,
) (*repository.DeviceOutboxEvent, error) {
	if f.claimErr != nil {
		return nil, f.claimErr
	}

	if f.event == nil {
		return nil, nil
	}

	event := *f.event
	return &event, nil
}

func (f *fakeDeviceOutboxClaimRepository) MarkPublished(
	ctx context.Context,
	eventID uuid.UUID,
	now time.Time,
) error {
	f.publishedCount++
	f.publishedEventID = eventID
	return f.markPublishedErr
}

func (f *fakeDeviceOutboxClaimRepository) MarkFailed(
	ctx context.Context,
	eventID uuid.UUID,
	now time.Time,
	lastError string,
	retryDelay time.Duration,
) error {
	f.failedCount++
	f.failedEventID = eventID
	f.failedLastError = lastError
	f.failedRetryDelay = retryDelay
	return f.markFailedErr
}

type fakeDeviceOutboxPublisher struct {
	err          error
	publishCount int
	lastEventID  uuid.UUID
}

func (f *fakeDeviceOutboxPublisher) Publish(
	ctx context.Context,
	event repository.DeviceOutboxEvent,
) error {
	f.publishCount++
	f.lastEventID = event.EventID
	return f.err
}

func TestDeviceOutboxPublisherPublishesAndMarksPublished(t *testing.T) {
	event := validRetryTestEvent(2)

	repo := &fakeDeviceOutboxClaimRepository{
		event: &event,
	}
	publisher := &fakeDeviceOutboxPublisher{}

	app, err := NewDeviceOutboxPublisherApplication(
		repo,
		publisher,
		DefaultDeviceOutboxConfig(),
	)
	if err != nil {
		t.Fatalf("create publisher application: %v", err)
	}

	ok, err := app.PublishNext(
		context.Background(),
		time.Date(2026, 9, 11, 12, 0, 0, 0, time.UTC),
	)
	if err != nil {
		t.Fatalf("publish next: %v", err)
	}

	if !ok {
		t.Fatal("expected event to be processed")
	}

	if publisher.publishCount != 1 {
		t.Fatalf("publish count = %d, want 1", publisher.publishCount)
	}

	if repo.publishedCount != 1 {
		t.Fatalf("published count = %d, want 1", repo.publishedCount)
	}

	if repo.failedCount != 0 {
		t.Fatalf("failed count = %d, want 0", repo.failedCount)
	}

	if repo.publishedEventID != event.ID {
		t.Fatalf(
			"published outbox ID = %s, want %s",
			repo.publishedEventID,
			event.ID,
		)
	}
}

func TestDeviceOutboxPublisherFailureSchedulesRetry(t *testing.T) {
	event := validRetryTestEvent(3)

	repo := &fakeDeviceOutboxClaimRepository{
		event: &event,
	}
	publishErr := errors.New("simulated kafka publication failure")

	publisher := &fakeDeviceOutboxPublisher{
		err: publishErr,
	}

	app, err := NewDeviceOutboxPublisherApplication(
		repo,
		publisher,
		DefaultDeviceOutboxConfig(),
	)
	if err != nil {
		t.Fatalf("create publisher application: %v", err)
	}

	ok, err := app.PublishNext(
		context.Background(),
		time.Date(2026, 9, 11, 12, 0, 0, 0, time.UTC),
	)
	if err == nil {
		t.Fatal("expected publication error")
	}

	if !ok {
		t.Fatal("expected claimed event to be reported as processed")
	}

	if publisher.publishCount != 1 {
		t.Fatalf("publish count = %d, want 1", publisher.publishCount)
	}

	if repo.failedCount != 1 {
		t.Fatalf("failed count = %d, want 1", repo.failedCount)
	}

	if repo.publishedCount != 0 {
		t.Fatalf("published count = %d, want 0", repo.publishedCount)
	}

	wantDelay := 20 * time.Second

	if repo.failedRetryDelay != wantDelay {
		t.Fatalf(
			"retry delay = %s, want %s",
			repo.failedRetryDelay,
			wantDelay,
		)
	}

	if repo.failedEventID != event.ID {
		t.Fatalf(
			"failed outbox ID = %s, want %s",
			repo.failedEventID,
			event.ID,
		)
	}

	if repo.failedLastError == "" {
		t.Fatal("expected failure reason to be recorded")
	}
}

func TestDeviceOutboxPublisherReturnsClaimError(t *testing.T) {
	claimErr := errors.New("claim failed")

	repo := &fakeDeviceOutboxClaimRepository{
		claimErr: claimErr,
	}
	publisher := &fakeDeviceOutboxPublisher{}

	app, err := NewDeviceOutboxPublisherApplication(
		repo,
		publisher,
		DefaultDeviceOutboxConfig(),
	)
	if err != nil {
		t.Fatalf("create publisher application: %v", err)
	}

	ok, err := app.PublishNext(
		context.Background(),
		time.Date(2026, 9, 11, 12, 0, 0, 0, time.UTC),
	)
	if err == nil {
		t.Fatal("expected claim error")
	}

	if ok {
		t.Fatal("expected processing to report failure")
	}

	if publisher.publishCount != 0 {
		t.Fatalf("publish count = %d, want 0", publisher.publishCount)
	}
}

func TestDeviceOutboxPublisherReturnsIdleWhenNoEvent(t *testing.T) {
	repo := &fakeDeviceOutboxClaimRepository{}
	publisher := &fakeDeviceOutboxPublisher{}

	app, err := NewDeviceOutboxPublisherApplication(
		repo,
		publisher,
		DefaultDeviceOutboxConfig(),
	)
	if err != nil {
		t.Fatalf("create publisher application: %v", err)
	}

	ok, err := app.PublishNext(
		context.Background(),
		time.Date(2026, 9, 11, 12, 0, 0, 0, time.UTC),
	)
	if err != nil {
		t.Fatalf("publish next: %v", err)
	}

	if ok {
		t.Fatal("expected idle result")
	}

	if publisher.publishCount != 0 {
		t.Fatalf("publish count = %d, want 0", publisher.publishCount)
	}
}
