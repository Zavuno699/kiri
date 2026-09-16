package secret

import (
	"context"
	"fmt"

	"github.com/google/uuid"
)

// SecretProvider defines the interface for storing and retrieving device credentials
// Implementations should never return the actual secret after initial storage
type SecretProvider interface {
	// StoreCredential stores a device credential and returns a reference
	// The reference is stored in the database, the actual secret is never returned
	StoreCredential(ctx context.Context, deviceID string, credentialType string, secret string) (string, error)

	// GetCredential retrieves a credential using its reference
	// This should only be used internally by the device service for actual device communication
	// Never return this to API responses
	GetCredential(ctx context.Context, reference string) (string, error)

	// RevokeCredential marks a credential as revoked
	RevokeCredential(ctx context.Context, reference string) error

	// DeleteCredential permanently removes a credential
	DeleteCredential(ctx context.Context, reference string) error
}

// CredentialType defines the type of credential being stored
type CredentialType string

const (
	CredentialTypeAPIKey      CredentialType = "API_KEY"
	CredentialTypeAPISecret   CredentialType = "API_SECRET"
	CredentialTypeAccessToken CredentialType = "ACCESS_TOKEN"
	CredentialTypeCertificate CredentialType = "CERTIFICATE"
)

// InMemorySecretProvider is a safe default implementation for development/testing
// WARNING: This is NOT suitable for production use as secrets are stored in memory
// Production should use a proper secret manager (AWS Secrets Manager, HashiCorp Vault, etc.)
type InMemorySecretProvider struct {
	secrets map[string]string
}

func NewInMemorySecretProvider() *InMemorySecretProvider {
	return &InMemorySecretProvider{
		secrets: make(map[string]string),
	}
}

func (p *InMemorySecretProvider) StoreCredential(ctx context.Context, deviceID string, credentialType string, secret string) (string, error) {
	if secret == "" {
		return "", fmt.Errorf("secret cannot be empty")
	}

	reference := fmt.Sprintf("%s:%s:%s", deviceID, credentialType, generateReference())
	p.secrets[reference] = secret

	return reference, nil
}

func (p *InMemorySecretProvider) GetCredential(ctx context.Context, reference string) (string, error) {
	secret, exists := p.secrets[reference]
	if !exists {
		return "", fmt.Errorf("credential not found")
	}

	return secret, nil
}

func (p *InMemorySecretProvider) RevokeCredential(ctx context.Context, reference string) error {
	// In memory implementation, revocation is equivalent to deletion
	return p.DeleteCredential(ctx, reference)
}

func (p *InMemorySecretProvider) DeleteCredential(ctx context.Context, reference string) error {
	delete(p.secrets, reference)
	return nil
}

func generateReference() string {
	return uuid.New().String()
}
