package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"sort"
	"strings"

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

	fmt.Printf("Found %d migration files\n", len(files))

	// Apply each migration
	for _, file := range files {
		filename := filepath.Base(file)
		fmt.Printf("Applying: %s\n", filename)

		content, err := os.ReadFile(file)
		if err != nil {
			log.Fatalf("ERROR: failed to read migration file %s: %v", filename, err)
		}

		_, err = conn.Exec(ctx, string(content))
		if err != nil {
			log.Fatalf("ERROR: failed to apply migration %s: %v", filename, err)
		}

		fmt.Printf("✓ Applied: %s\n", filename)
	}

	fmt.Println("\nAll migrations applied successfully")
}
