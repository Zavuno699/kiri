package persistence

import (
	"fmt"
	"sort"
)

type MigrationManifest struct {
	Migrations []ParsedMigration
}

func NewMigrationManifest(
	migrations []ParsedMigration,
) (*MigrationManifest, error) {
	copyMigrations := append([]ParsedMigration(nil), migrations...)

	sort.Slice(
		copyMigrations,
		func(i, j int) bool {
			return copyMigrations[i].Version < copyMigrations[j].Version
		},
	)

	for i := 1; i < len(copyMigrations); i++ {
		if copyMigrations[i-1].Version ==
			copyMigrations[i].Version {
			return nil, fmt.Errorf(
				"duplicate migration version %s",
				copyMigrations[i].Version,
			)
		}
	}

	return &MigrationManifest{
		Migrations: copyMigrations,
	}, nil
}
