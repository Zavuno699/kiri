package lock

import (
	"database/sql"
	"errors"

	"github.com/kirilock/backend/lock-service/internal/repository"
	"github.com/kirilock/backend/lock-service/internal/service"
)

type Service struct {
	repository  repository.LockRepository
	application *service.LockApplication
}

func NewWithDatabase(db *sql.DB) (*Service, error) {
	if db == nil {
		return nil, errors.New("database is required")
	}

	repo, err := repository.NewSQLLockRepository(db)
	if err != nil {
		return nil, err
	}

	application, err := service.NewLockApplication(repo)
	if err != nil {
		return nil, err
	}

	return &Service{
		repository:  repo,
		application: application,
	}, nil
}
