package persistence

import "context"

func ApplySchema(
	ctx context.Context,
	db *Database,
) error {
	_, err := db.DB.ExecContext(
		ctx,
		Schema,
	)

	return err
}
