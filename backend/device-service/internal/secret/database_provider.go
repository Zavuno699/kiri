package secret

import (
	"context"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"database/sql"
	"encoding/base64"
	"errors"
	"fmt"
	"io"
	"time"

	"github.com/google/uuid"
)

// DatabaseSecretProvider stores device credentials in the database with encryption
// For production, use a KMS service (AWS KMS, HashiCorp Vault) for master key management
// This implementation uses AES-GCM-256 with a static key for development
// EXTERNAL PROVIDER REQUIRED: Production requires a real KMS/Vault integration
type DatabaseSecretProvider struct {
	db            *sql.DB
	encryptionKey []byte // In production, this should come from KMS
}

func NewDatabaseSecretProvider(db *sql.DB, encryptionKey []byte) (*DatabaseSecretProvider, error) {
	if db == nil {
		return nil, errors.New("database connection is required")
	}
	if len(encryptionKey) != 32 {
		return nil, errors.New("encryption key must be 32 bytes (AES-256)")
	}

	return &DatabaseSecretProvider{
		db:            db,
		encryptionKey: encryptionKey,
	}, nil
}

func (p *DatabaseSecretProvider) StoreCredential(
	ctx context.Context,
	deviceID string,
	credentialType string,
	secret string,
) (string, error) {
	if secret == "" {
		return "", errors.New("secret cannot be empty")
	}

	deviceUUID, err := uuid.Parse(deviceID)
	if err != nil {
		return "", fmt.Errorf("invalid device ID: %w", err)
	}

	// Encrypt the secret
	encryptedSecret, err := p.encrypt(secret)
	if err != nil {
		return "", fmt.Errorf("encryption failed: %w", err)
	}

	// Generate credential ID
	credentialID := uuid.New()

	// Insert into database
	// NOTE: provisioned_by should come from the authenticated user context
	// This is a placeholder - the actual implementation should extract this from the request context
	query := `
		INSERT INTO device_credentials (
			id,
			device_id,
			credential_type,
			encrypted_secret,
			encryption_algorithm,
			status,
			provisioned_by,
			provisioned_at,
			created_at,
			updated_at
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
		RETURNING id
	`

	// TODO: Extract actual user ID from context
	// For now, use a placeholder - this must be fixed in integration
	provisionedBy := uuid.Nil
	now := timeNow()

	err = p.db.QueryRowContext(
		ctx,
		query,
		credentialID,
		deviceUUID,
		credentialType,
		encryptedSecret,
		"AES-GCM-256",
		"ACTIVE",
		provisionedBy,
		now,
		now,
	).Scan(&credentialID)

	if err != nil {
		return "", fmt.Errorf("failed to store credential: %w", err)
	}

	return credentialID.String(), nil
}

func (p *DatabaseSecretProvider) GetCredential(
	ctx context.Context,
	reference string,
) (string, error) {
	credentialUUID, err := uuid.Parse(reference)
	if err != nil {
		return "", fmt.Errorf("invalid credential reference: %w", err)
	}

	var encryptedSecret []byte
	var status string

	query := `
		SELECT encrypted_secret, status
		FROM device_credentials
		WHERE id = $1
	`

	err = p.db.QueryRowContext(ctx, query, credentialUUID).Scan(&encryptedSecret, &status)
	if err != nil {
		if err == sql.ErrNoRows {
			return "", errors.New("credential not found")
		}
		return "", fmt.Errorf("failed to retrieve credential: %w", err)
	}

	if status != "ACTIVE" {
		return "", errors.New("credential is not active")
	}

	// Decrypt the secret
	secret, err := p.decrypt(encryptedSecret)
	if err != nil {
		return "", fmt.Errorf("decryption failed: %w", err)
	}

	return secret, nil
}

func (p *DatabaseSecretProvider) RevokeCredential(
	ctx context.Context,
	reference string,
) error {
	credentialUUID, err := uuid.Parse(reference)
	if err != nil {
		return fmt.Errorf("invalid credential reference: %w", err)
	}

	query := `
		UPDATE device_credentials
		SET status = 'REVOKED',
		    revoked_at = $2,
		    updated_at = $2,
		    version = version + 1
		WHERE id = $1 AND status = 'ACTIVE'
	`

	result, err := p.db.ExecContext(ctx, query, credentialUUID, timeNow())
	if err != nil {
		return fmt.Errorf("failed to revoke credential: %w", err)
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		return errors.New("credential not found or already revoked")
	}

	return nil
}

func (p *DatabaseSecretProvider) DeleteCredential(
	ctx context.Context,
	reference string,
) error {
	credentialUUID, err := uuid.Parse(reference)
	if err != nil {
		return fmt.Errorf("invalid credential reference: %w", err)
	}

	query := `DELETE FROM device_credentials WHERE id = $1`

	result, err := p.db.ExecContext(ctx, query, credentialUUID)
	if err != nil {
		return fmt.Errorf("failed to delete credential: %w", err)
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		return errors.New("credential not found")
	}

	return nil
}

// encrypt uses AES-GCM-256 to encrypt the secret
func (p *DatabaseSecretProvider) encrypt(plaintext string) ([]byte, error) {
	block, err := aes.NewCipher(p.encryptionKey)
	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}

	nonce := make([]byte, gcm.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		return nil, err
	}

	ciphertext := gcm.Seal(nonce, nonce, []byte(plaintext), nil)

	// Encode as base64 for database storage
	encoded := make([]byte, base64.StdEncoding.EncodedLen(len(ciphertext)))
	base64.StdEncoding.Encode(encoded, ciphertext)

	return encoded, nil
}

// decrypt uses AES-GCM-256 to decrypt the secret
func (p *DatabaseSecretProvider) decrypt(encoded []byte) (string, error) {
	// Decode from base64
	ciphertext := make([]byte, base64.StdEncoding.DecodedLen(len(encoded)))
	n, err := base64.StdEncoding.Decode(ciphertext, encoded)
	if err != nil {
		return "", err
	}
	ciphertext = ciphertext[:n]

	block, err := aes.NewCipher(p.encryptionKey)
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonceSize := gcm.NonceSize()
	if len(ciphertext) < nonceSize {
		return "", errors.New("ciphertext too short")
	}

	nonce, ciphertext := ciphertext[:nonceSize], ciphertext[nonceSize:]

	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return "", err
	}

	return string(plaintext), nil
}

func timeNow() time.Time {
	return time.Now().UTC()
}
