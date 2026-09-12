package persistence

import "context"

type SQLExecutor struct {
	Database *Database
}

func NewSQLExecutor(database *Database) *SQLExecutor {
	return &SQLExecutor{
		Database: database,
	}
}

func (e *SQLExecutor) ExecContext(
	ctx context.Context,
	query string,
	args ...any,
) error {
	if e == nil || e.Database == nil || e.Database.DB == nil {
		return nil
	}

	_, err := e.Database.DB.ExecContext(
		ctx,
		RebindQuestionPlaceholders(query),
		args...,
	)

	return err
}
