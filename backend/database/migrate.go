package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"

	"github.com/jackc/pgx/v5"
)

func main() {
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("ERROR: DATABASE_URL environment variable is required")
	}

	migrationsDir := "migrations"
	if len(os.Args) > 1 {
		migrationsDir = os.Args[1]
	}

	ctx := context.Background()
	conn, err := pgx.Connect(ctx, databaseURL)
	if err != nil {
		log.Fatalf("ERROR: failed to connect to database: %v", err)
	}
	defer conn.Close(ctx)

	// Verify connection
	var version string
	err = conn.QueryRow(ctx, "SELECT version()").Scan(&version)
	if err != nil {
		log.Fatalf("ERROR: failed to query database version: %v", err)
	}
	fmt.Printf("Connected to database: %s\n", strings.Split(version, ",")[0])

	// Create schema_migrations table for idempotency tracking
	_, err = conn.Exec(ctx, `
		CREATE TABLE IF NOT EXISTS schema_migrations (
			filename VARCHAR(255) PRIMARY KEY,
			applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
		)
	`)
	if err != nil {
		log.Fatalf("ERROR: failed to create schema_migrations table: %v", err)
	}

	// Get all migration files
	files, err := filepath.Glob(filepath.Join(migrationsDir, "*.sql"))
	if err != nil {
		log.Fatalf("ERROR: failed to read migrations directory: %v", err)
	}

	if len(files) == 0 {
		log.Fatal("ERROR: no SQL migration files found in migrations directory")
	}

	// Sort files by name (numeric order)
	sort.Strings(files)

	// Exclude down migration files (*.down.sql)
	var forwardMigrations []string
	for _, file := range files {
		if !strings.HasSuffix(file, ".down.sql") {
			forwardMigrations = append(forwardMigrations, file)
		}
	}

	fmt.Printf("Found %d migration files (%d forward migrations)\n", len(files), len(forwardMigrations))

	// Apply each migration
	appliedCount := 0
	for _, file := range forwardMigrations {
		filename := filepath.Base(file)

		// Check if already applied
		var appliedAt time.Time
		err = conn.QueryRow(ctx, "SELECT applied_at FROM schema_migrations WHERE filename = $1", filename).Scan(&appliedAt)
		if err == nil {
			fmt.Printf("Skipping (already applied): %s\n", filename)
			continue
		}

		fmt.Printf("Applying: %s\n", filename)

		content, err := os.ReadFile(file)
		if err != nil {
			log.Fatalf("ERROR: failed to read migration file %s: %v", filename, err)
		}

		// Apply migration in transaction
		tx, err := conn.Begin(ctx)
		if err != nil {
			log.Fatalf("ERROR: failed to begin transaction: %v", err)
		}

		_, err = tx.Exec(ctx, string(content))
		if err != nil {
			tx.Rollback(ctx)
			log.Fatalf("ERROR: failed to apply migration %s: %v", filename, err)
		}

		// Record migration as applied
		_, err = tx.Exec(ctx, "INSERT INTO schema_migrations (filename, applied_at) VALUES ($1, $2)", filename, time.Now().UTC())
		if err != nil {
			tx.Rollback(ctx)
			log.Fatalf("ERROR: failed to record migration %s: %v", filename, err)
		}

		if err := tx.Commit(ctx); err != nil {
			log.Fatalf("ERROR: failed to commit transaction for migration %s: %v", filename, err)
		}

		fmt.Printf("✓ Applied: %s\n", filename)
		appliedCount++
	}

	fmt.Printf("\nMigration complete. Applied %d new migrations.\n", appliedCount)
}
