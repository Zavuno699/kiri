package persistence

import "context"

func (t *RepositoryTransaction) ExecSQL(
	ctx context.Context,
	query string,
	args ...any,
) error {
	if t == nil || t.Tx == nil {
		return nil
	}

	_, err := t.Tx.ExecContext(
		ctx,
		RebindQuestionPlaceholders(query),
		args...,
	)

	return err
}
