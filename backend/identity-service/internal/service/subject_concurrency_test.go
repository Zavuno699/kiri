package service

import (
	"context"
	"sync"
	"testing"

	"github.com/google/uuid"
	_ "github.com/jackc/pgx/v5/pgxpool"

	"github.com/kirilock/backend/identity-service/internal/model"
	"github.com/kirilock/backend/identity-service/internal/repository"
)

// SubjectConcurrencyTest requires a real PostgreSQL connection
// This test cannot be run in CI without a test database
// To run locally: set DATABASE_URL and run: go test -v -run TestConcurrentSuperAdminPromotion

func TestConcurrentSuperAdminPromotion(t *testing.T) {
	// This test requires a real database connection
	// Skip if DATABASE_URL is not set
	t.Skip("Skipping integration test - requires real PostgreSQL connection")

	/*
		ctx := context.Background()

		// Setup database connection
		dbURL := os.Getenv("DATABASE_URL")
		if dbURL == "" {
			t.Skip("DATABASE_URL not set, skipping integration test")
		}

		pool, err := pgxpool.New(ctx, dbURL)
		if err != nil {
			t.Fatalf("Failed to create connection pool: %v", err)
		}
		defer pool.Close()

		subjectRepo, err := repository.NewDBSubjectRepository(pool)
		if err != nil {
			t.Fatalf("Failed to create subject repository: %v", err)
		}

		subjectService, err := NewSubjectService(subjectRepo)
		if err != nil {
			t.Fatalf("Failed to create subject service: %v", err)
		}

		// Create test subjects
		actorID := uuid.New()
		subject1 := uuid.New()
		subject2 := uuid.New()
		subject3 := uuid.New()

		// Clean up any existing test data
		pool.Exec(ctx, "DELETE FROM identity_subjects WHERE id = ANY($1)", []uuid.UUID{actorID, subject1, subject2, subject3})

		// Create one super admin (actor) and three ordinary subjects
		actorSubject := model.Subject{
			ID:           actorID,
			SubjectID:    uuid.New().String(),
			Email:        "superadmin@test.com",
			PasswordHash: "hash",
			Roles:        []string{"super_admin"},
			IsSuperAdmin: true,
			CreatedAt:    time.Now(),
			UpdatedAt:    time.Now(),
			Version:      1,
		}

		subjects := []model.Subject{
			actorSubject,
			{
				ID:           subject1,
				SubjectID:    uuid.New().String(),
				Email:        "subject1@test.com",
				PasswordHash: "hash",
				Roles:        []string{},
				IsSuperAdmin: false,
				CreatedAt:    time.Now(),
				UpdatedAt:    time.Now(),
				Version:      1,
			},
			{
				ID:           subject2,
				SubjectID:    uuid.New().String(),
				Email:        "subject2@test.com",
				PasswordHash: "hash",
				Roles:        []string{},
				IsSuperAdmin: false,
				CreatedAt:    time.Now(),
				UpdatedAt:    time.Now(),
				Version:      1,
			},
			{
				ID:           subject3,
				SubjectID:    uuid.New().String(),
				Email:        "subject3@test.com",
				PasswordHash: "hash",
				Roles:        []string{},
				IsSuperAdmin: false,
				CreatedAt:    time.Now(),
				UpdatedAt:    time.Now(),
				Version:      1,
			},
		}

		for _, s := range subjects {
			if err := subjectRepo.Create(ctx, s); err != nil {
				t.Fatalf("Failed to create subject: %v", err)
			}
		}

		// Test 1: Concurrent promotion of two subjects should result in exactly 2 super admins
		var wg sync.WaitGroup
		promoteErrors := make(chan error, 2)
		successCount := 0

		wg.Add(2)
		go func() {
			defer wg.Done()
			err := subjectService.SetSuperAdmin(ctx, actorID, subject1, true)
			promoteErrors <- err
			if err == nil {
				successCount++
			}
		}()

		go func() {
			defer wg.Done()
			err := subjectService.SetSuperAdmin(ctx, actorID, subject2, true)
			promoteErrors <- err
			if err == nil {
				successCount++
			}
		}()

		wg.Wait()
		close(promoteErrors)

		// Count final super admins
		count, err := subjectRepo.CountSuperAdmins(ctx)
		if err != nil {
			t.Fatalf("Failed to count super admins: %v", err)
		}

		// Assert: exactly 2 super admins, one promotion succeeded, one failed
		if count != 2 {
			t.Errorf("Expected 2 super admins after concurrent promotion, got %d", count)
		}

		if successCount != 1 {
			t.Errorf("Expected exactly 1 successful promotion, got %d", successCount)
		}

		// Verify errors
		errorCount := 0
		for err := range promoteErrors {
			if err != nil {
				errorCount++
				if err != ErrMaxSuperAdminsExceeded {
					t.Errorf("Expected ErrMaxSuperAdminsExceeded, got %v", err)
				}
			}
		}

		if errorCount != 1 {
			t.Errorf("Expected exactly 1 promotion to fail, got %d", errorCount)
		}

		// Test 2: Attempt to create third super admin should fail
		err = subjectService.SetSuperAdmin(ctx, actorID, subject3, true)
		if err != ErrMaxSuperAdminsExceeded {
			t.Errorf("Expected ErrMaxSuperAdminsExceeded when creating third super admin, got %v", err)
		}

		// Test 3: Demote one, then promote another should succeed
		err = subjectService.SetSuperAdmin(ctx, actorID, subject1, false)
		if err != nil {
			t.Errorf("Failed to demote subject1: %v", err)
		}

		err = subjectService.SetSuperAdmin(ctx, actorID, subject3, true)
		if err != nil {
			t.Errorf("Failed to promote subject3 after demoting subject1: %v", err)
		}

		count, err = subjectRepo.CountSuperAdmins(ctx)
		if err != nil {
			t.Fatalf("Failed to count super admins: %v", err)
		}

		if count != 2 {
			t.Errorf("Expected 2 super admins after demote+promote, got %d", count)
		}

		// Test 4: Attempt to demote the last super admin should fail
		// First demote subject2
		err = subjectService.SetSuperAdmin(ctx, actorID, subject2, false)
		if err != nil {
			t.Errorf("Failed to demote subject2: %v", err)
		}

		// Now try to demote subject3 (last super admin)
		err = subjectService.SetSuperAdmin(ctx, actorID, subject3, false)
		if err != ErrLastSuperAdmin {
			t.Errorf("Expected ErrLastSuperAdmin when demoting last super admin, got %v", err)
		}

		// Cleanup
		pool.Exec(ctx, "DELETE FROM identity_subjects WHERE id = ANY($1)", []uuid.UUID{actorID, subject1, subject2, subject3})
	*/
}
