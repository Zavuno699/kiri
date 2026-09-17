package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"

	"github.com/kirilock/backend/identity-service/internal/repository"
	"github.com/kirilock/backend/identity-service/internal/service"
)

func main() {
	// STEP 1: Refuse to run unless explicitly in development/test environment
	env := os.Getenv("KIRI_ENV")
	if env != "development" && env != "test" {
		log.Fatal("ERROR: dev-bootstrap can only run in development or test environment. Set KIRI_ENV=development or KIRI_ENV=test.")
	}

	// STEP 2: Read account credentials from environment variables
	landlordEmail := os.Getenv("DEV_LANDLORD_EMAIL")
	landlordPassword := os.Getenv("DEV_LANDLORD_PASSWORD")
	superAdminEmail := os.Getenv("DEV_SUPERADMIN_EMAIL")
	superAdminPassword := os.Getenv("DEV_SUPERADMIN_PASSWORD")

	if landlordEmail == "" || landlordPassword == "" {
		log.Fatal("ERROR: DEV_LANDLORD_EMAIL and DEV_LANDLORD_PASSWORD environment variables are required")
	}
	if superAdminEmail == "" || superAdminPassword == "" {
		log.Fatal("ERROR: DEV_SUPERADMIN_EMAIL and DEV_SUPERADMIN_PASSWORD environment variables are required")
	}

	// STEP 3: Connect to database using existing DATABASE_URL
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("ERROR: DATABASE_URL environment variable is required")
	}

	ctx := context.Background()
	pool, err := pgxpool.New(ctx, databaseURL)
	if err != nil {
		log.Fatalf("ERROR: failed to create database pool: %v", err)
	}
	defer pool.Close()

	// STEP 4: Use existing repositories and services
	subjectRepo, err := repository.NewDBSubjectRepository(pool)
	if err != nil {
		log.Fatalf("ERROR: failed to create subject repository: %v", err)
	}

	subjectService, err := service.NewSubjectService(subjectRepo)
	if err != nil {
		log.Fatalf("ERROR: failed to create subject service: %v", err)
	}

	// STEP 5: Provision landlord account (idempotent)
	fmt.Printf("Provisioning landlord account: %s\n", landlordEmail)
	err = provisionAccount(ctx, subjectService, subjectRepo, landlordEmail, landlordPassword, []string{"landlord"}, false, false)
	if err != nil {
		log.Fatalf("ERROR: failed to provision landlord account: %v", err)
	}
	fmt.Printf("✓ Landlord account provisioned: %s (roles: [landlord], is_admin: false, is_super_admin: false)\n", landlordEmail)

	// STEP 6: Provision super admin account (idempotent) - this is the ONLY way to create the first super_admin
	fmt.Printf("Provisioning super admin account: %s\n", superAdminEmail)
	err = provisionAccount(ctx, subjectService, subjectRepo, superAdminEmail, superAdminPassword, []string{"super_admin"}, false, true)
	if err != nil {
		log.Fatalf("ERROR: failed to provision super admin account: %v", err)
	}
	fmt.Printf("✓ Super admin account provisioned: %s (roles: [super_admin], is_admin: false, is_super_admin: true)\n", superAdminEmail)

	fmt.Println("\n✓ Dev accounts provisioned successfully")
	fmt.Println("WARNING: This is a dev-only tool. Never run in production.")
}

// provisionAccount creates or updates a subject with the given email, password, roles, and admin flags
// It is idempotent: if the subject exists, it updates roles/password rather than failing
func provisionAccount(
	ctx context.Context,
	subjectService *service.SubjectService,
	subjectRepo *repository.DBSubjectRepository,
	email string,
	password string,
	roles []string,
	isAdmin bool,
	isSuperAdmin bool,
) error {
	// Check if subject already exists
	existing, err := subjectRepo.GetByEmail(ctx, email)
	if err == nil {
		// Subject exists - update it
		fmt.Printf("  Subject exists, updating roles and password...\n")

		// Update roles
		err = subjectRepo.UpdateRoles(ctx, existing.ID, roles)
		if err != nil {
			return fmt.Errorf("failed to update roles: %w", err)
		}

		// Update admin flags
		err = subjectRepo.SetAdmin(ctx, existing.ID, isAdmin)
		if err != nil {
			return fmt.Errorf("failed to set admin flag: %w", err)
		}

		err = subjectRepo.SetSuperAdmin(ctx, existing.ID, isSuperAdmin)
		if err != nil {
			return fmt.Errorf("failed to set super admin flag: %w", err)
		}

		// Update password hash directly using bcrypt
		hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
		if err != nil {
			return fmt.Errorf("failed to hash password: %w", err)
		}

		existing.PasswordHash = string(hash)
		existing.Roles = roles
		existing.IsAdmin = isAdmin
		existing.IsSuperAdmin = isSuperAdmin
		err = subjectRepo.Update(ctx, existing)
		if err != nil {
			return fmt.Errorf("failed to update subject: %w", err)
		}

		return nil
	}

	// Subject does not exist - create it
	fmt.Printf("  Creating new subject...\n")
	_, err = subjectService.CreateSubject(ctx, email, password, roles, isAdmin, isSuperAdmin)
	if err != nil {
		return fmt.Errorf("failed to create subject: %w", err)
	}

	return nil
}
