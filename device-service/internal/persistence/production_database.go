package persistence

import "context"

type ProductionDatabase struct {
	Database *Database
}

func NewProductionDatabase(
	database *Database,
) *ProductionDatabase {
	return &ProductionDatabase{
		Database: database,
	}
}

func (d *ProductionDatabase) Start(
	ctx context.Context,
) error {
	if d == nil || d.Database == nil {
		return nil
	}

	return d.Database.Ping(ctx)
}

func (d *ProductionDatabase) Stop(
	ctx context.Context,
) error {
	if d == nil || d.Database == nil {
		return nil
	}

	return d.Database.Close(ctx)
}

func (d *ProductionDatabase) Snapshot(
	ctx context.Context,
) ConnectionSnapshot {
	if d == nil {
		return ConnectionSnapshot{}
	}

	return NewConnectionSnapshot(ctx, d.Database)
}
