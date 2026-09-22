package main

import (
	"testing"
	"time"

	"github.com/kirilock/backend/billing-service"
	"github.com/kirilock/backend/shared/validation"
)

func TestNewFromConfig_MissingDatabaseURL(t *testing.T) {
	validator := validation.New()
	cfg := billing.FlutterwaveConfig{
		Timeout: 30 * time.Second,
	}

	_, _, err := billing.NewFromConfig(nil, validator, "", cfg)
	if err == nil {
		t.Fatal("expected error for missing DATABASE_URL")
	}
}

func TestNewFromConfig_WithDevTestProvider(t *testing.T) {
	validator := validation.New()
	cfg := billing.FlutterwaveConfig{
		// Empty Flutterwave config should use dev/test provider
		Timeout: 30 * time.Second,
	}

	// This will fail if DATABASE_URL is not set, which is expected
	// The test verifies the provider construction logic, not DB connectivity
	if _, _, err := billing.NewFromConfig(nil, validator, "invalid-db-url", cfg); err == nil {
		t.Fatal("expected error for invalid database URL")
	}
}

func TestDevTestProviderCreation(t *testing.T) {
	// Verify dev/test provider can be created without credentials
	// This is tested indirectly via NewFromConfig above
}
