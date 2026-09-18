package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// LoadDevelopmentEnv loads .env file only in development or test environment
// Production must rely on real process/container environment variable injection
// This function does nothing in production environments
func LoadDevelopmentEnv() {
	env := os.Getenv("KIRI_ENV")
	if env != "development" && env != "test" {
		// Production or undefined environment - do not load .env
		// Rely on real environment variable injection
		return
	}

	// Development or test environment - attempt to load .env from backend/
	// Ignore errors if .env doesn't exist (not required for all dev setups)
	_ = godotenv.Load("backend/.env")
	_ = godotenv.Load(".env") // Also try repo root .env

	log.Printf("INFO: Development environment detected (KIRI_ENV=%s), .env loading enabled", env)
}
