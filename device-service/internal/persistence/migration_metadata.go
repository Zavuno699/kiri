package persistence

import (
	"crypto/sha256"
	"encoding/hex"
	"strings"
	"time"
)

type MigrationMetadata struct {
	Version     string
	Description string
	Checksum    string
	AppliedAt   time.Time
}

func NewMigrationMetadata(
	version string,
	description string,
	sqlText string,
) MigrationMetadata {
	sum := sha256.Sum256([]byte(sqlText))

	return MigrationMetadata{
		Version:     version,
		Description: description,
		Checksum:    hex.EncodeToString(sum[:]),
	}
}

func NormalizeMigrationSQL(sqlText string) string {
	lines := strings.Split(sqlText, "\n")

	result := make([]string, 0, len(lines))

	for _, line := range lines {
		line = strings.TrimSpace(line)

		if line == "" {
			continue
		}

		if strings.HasPrefix(line, "--") {
			continue
		}

		result = append(result, line)
	}

	return strings.Join(result, "\n")
}
