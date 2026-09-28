package repository

import (
	"context"
	"database/sql"
	"errors"
	"os"
	"sync"
	"testing"
	"time"

	"github.com/google/uuid"
	_ "github.com/jackc/pgx/v5/stdlib"
)

func TestClaimPaymentIdempotency_Concurrent(t *testing.T) {
	// This test requires a real database connection
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		t.Skip("DATABASE_URL not set, skipping integration test")
	}

	ctx := context.Background()

	// Setup database connection
	db, err := sql.Open("pgx", dbURL)
	if err != nil {
		t.Fatalf("Failed to open database: %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		t.Fatalf("Failed to ping database: %v", err)
	}

	repo := NewPaymentRepository(db)

	// Test parameters
	provider := "FLUTTERWAVE"
	idempotencyKey := uuid.New().String()
	requestHash := "test-hash-123"
	reference := "REF-" + uuid.New().String()
	now := time.Now().UTC()

	// Clean up any existing test data
	db.ExecContext(ctx, "DELETE FROM payment_idempotency_claims WHERE idempotency_key = $1", idempotencyKey)

	// Test 1: Concurrent claims with same key should result in exactly one success
	var wg sync.WaitGroup
	claimErrors := make(chan error, 2)
	successCount := 0

	wg.Add(2)
	go func() {
		defer wg.Done()
		claim, err := repo.ClaimPaymentIdempotency(ctx, provider, idempotencyKey, requestHash, reference, now)
		claimErrors <- err
		if err == nil {
			successCount++
			t.Logf("Goroutine 1 succeeded with claim ID: %s", claim.ID)
		} else {
			t.Logf("Goroutine 1 failed: %v", err)
		}
	}()

	go func() {
		defer wg.Done()
		claim, err := repo.ClaimPaymentIdempotency(ctx, provider, idempotencyKey, requestHash, reference, now)
		claimErrors <- err
		if err == nil {
			successCount++
			t.Logf("Goroutine 2 succeeded with claim ID: %s", claim.ID)
		} else {
			t.Logf("Goroutine 2 failed: %v", err)
		}
	}()

	wg.Wait()
	close(claimErrors)

	// Assert: exactly one claim succeeded
	if successCount != 1 {
		t.Errorf("Expected exactly 1 successful claim, got %d", successCount)
	}

	// Assert: exactly one claim failed with ErrIdempotencyClaimed
	claimedCount := 0
	for err := range claimErrors {
		if err == nil {
			claimedCount++
		} else if errors.Is(err, ErrIdempotencyClaimed) {
			t.Logf("Got expected ErrIdempotencyClaimed")
		} else {
			t.Errorf("Expected ErrIdempotencyClaimed or nil, got %v", err)
		}
	}

	if claimedCount != 1 {
		t.Errorf("Expected exactly 1 nil error (success), got %d", claimedCount)
	}

	// Verify database state: exactly one row for this idempotency key
	var count int
	err = db.QueryRowContext(ctx, "SELECT COUNT(*) FROM payment_idempotency_claims WHERE provider = $1 AND idempotency_key = $2", provider, idempotencyKey).Scan(&count)
	if err != nil {
		t.Fatalf("Failed to count claims: %v", err)
	}

	if count != 1 {
		t.Errorf("Expected exactly 1 claim row in database, got %d", count)
	}

	// Test 2: Replay with same key and same request should return existing claim
	existingClaim, err := repo.ClaimPaymentIdempotency(ctx, provider, idempotencyKey, requestHash, reference, now)
	if err != nil {
		t.Errorf("Replay with same request should succeed, got error: %v", err)
	}
	if existingClaim.IdempotencyKey != idempotencyKey {
		t.Errorf("Replay should return same idempotency key")
	}

	// Verify still only one row
	err = db.QueryRowContext(ctx, "SELECT COUNT(*) FROM payment_idempotency_claims WHERE provider = $1 AND idempotency_key = $2", provider, idempotencyKey).Scan(&count)
	if err != nil {
		t.Fatalf("Failed to count claims after replay: %v", err)
	}

	if count != 1 {
		t.Errorf("Expected exactly 1 claim row after replay, got %d", count)
	}

	// Test 3: Same key with different request hash should return ErrIdempotencyConflict
	differentHash := "different-hash-456"
	_, err = repo.ClaimPaymentIdempotency(ctx, provider, idempotencyKey, differentHash, reference, now)
	if err == nil {
		t.Error("Expected error for different request hash with same key, got nil")
	}
	if !errors.Is(err, ErrIdempotencyConflict) {
		t.Errorf("Expected ErrIdempotencyConflict, got %v", err)
	}

	// Verify still only one row
	err = db.QueryRowContext(ctx, "SELECT COUNT(*) FROM payment_idempotency_claims WHERE provider = $1 AND idempotency_key = $2", provider, idempotencyKey).Scan(&count)
	if err != nil {
		t.Fatalf("Failed to count claims after conflict: %v", err)
	}

	if count != 1 {
		t.Errorf("Expected exactly 1 claim row after conflict, got %d", count)
	}

	// Cleanup
	db.ExecContext(ctx, "DELETE FROM payment_idempotency_claims WHERE idempotency_key = $1", idempotencyKey)
}

func TestClaimPaymentIdempotency_DeterministicConcurrency(t *testing.T) {
	// This test requires a real database connection
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		t.Skip("DATABASE_URL not set, skipping integration test")
	}

	ctx := context.Background()

	// Setup database connection
	db, err := sql.Open("pgx", dbURL)
	if err != nil {
		t.Fatalf("Failed to open database: %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		t.Fatalf("Failed to ping database: %v", err)
	}

	repo := NewPaymentRepository(db)

	// Run the concurrent test multiple times for determinism
	for i := 0; i < 5; i++ {
		t.Run("ConcurrentRun", func(t *testing.T) {
			provider := "FLUTTERWAVE"
			idempotencyKey := uuid.New().String()
			requestHash := "test-hash-" + uuid.New().String()
			reference := "REF-" + uuid.New().String()
			now := time.Now().UTC()

			// Clean up
			db.ExecContext(ctx, "DELETE FROM payment_idempotency_claims WHERE idempotency_key = $1", idempotencyKey)

			var wg sync.WaitGroup
			claimErrors := make(chan error, 2)
			successCount := 0

			wg.Add(2)
			go func() {
				defer wg.Done()
				_, err := repo.ClaimPaymentIdempotency(ctx, provider, idempotencyKey, requestHash, reference, now)
				claimErrors <- err
				if err == nil {
					successCount++
				}
			}()

			go func() {
				defer wg.Done()
				_, err := repo.ClaimPaymentIdempotency(ctx, provider, idempotencyKey, requestHash, reference, now)
				claimErrors <- err
				if err == nil {
					successCount++
				}
			}()

			wg.Wait()
			close(claimErrors)

			if successCount != 1 {
				t.Errorf("Run %d: Expected exactly 1 successful claim, got %d", i, successCount)
			}

			claimedCount := 0
			for err := range claimErrors {
				if err == nil {
					claimedCount++
				} else if !errors.Is(err, ErrIdempotencyClaimed) {
					t.Errorf("Run %d: Expected ErrIdempotencyClaimed or nil, got %v", i, err)
				}
			}

			if claimedCount != 1 {
				t.Errorf("Run %d: Expected exactly 1 nil error, got %d", i, claimedCount)
			}

			var count int
			err = db.QueryRowContext(ctx, "SELECT COUNT(*) FROM payment_idempotency_claims WHERE provider = $1 AND idempotency_key = $2", provider, idempotencyKey).Scan(&count)
			if err != nil {
				t.Fatalf("Run %d: Failed to count claims: %v", i, err)
			}

			if count != 1 {
				t.Errorf("Run %d: Expected exactly 1 claim row, got %d", i, count)
			}

			// Cleanup
			db.ExecContext(ctx, "DELETE FROM payment_idempotency_claims WHERE idempotency_key = $1", idempotencyKey)
		})
	}
}
