package persistence

import (
	"errors"
	"strings"
)

var ErrInvalidMigration = errors.New("invalid migration")

func ValidateMigrationSQL(sqlText string) error {
	sqlText = strings.TrimSpace(sqlText)

	if sqlText == "" {
		return ErrInvalidMigration
	}

	if strings.Contains(sqlText, "VALUES (?,") ||
		strings.Contains(sqlText, "WHERE id = ?") {
		return ErrInvalidMigration
	}

	return nil
}
