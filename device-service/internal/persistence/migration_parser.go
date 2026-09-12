package persistence

import (
	"errors"
	"fmt"
	"regexp"
	"strings"
)

var ErrInvalidMigrationName = errors.New("invalid migration filename")

var migrationNamePattern = regexp.MustCompile(
	`^([0-9]{6,})_([a-z0-9][a-z0-9_-]*)\.sql$`,
)

type ParsedMigration struct {
	Version     string
	Description string
	SQL         string
}

func ParseMigrationFile(
	filename string,
	sqlText string,
) (ParsedMigration, error) {
	match := migrationNamePattern.FindStringSubmatch(filename)

	if len(match) != 3 {
		return ParsedMigration{}, fmt.Errorf(
			"%w: %s",
			ErrInvalidMigrationName,
			filename,
		)
	}

	normalized := NormalizeMigrationSQL(sqlText)

	if strings.TrimSpace(normalized) == "" {
		return ParsedMigration{}, errors.New("migration SQL is empty")
	}

	return ParsedMigration{
		Version:     match[1],
		Description: match[2],
		SQL:         normalized,
	}, nil
}
