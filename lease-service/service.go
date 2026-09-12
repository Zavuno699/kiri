package lease

import (
	"database/sql"
	"errors"
	"net/http"

	"github.com/kirilock/backend/lease-service/internal/handler"
	"github.com/kirilock/backend/lease-service/internal/repository"
	"github.com/kirilock/backend/lease-service/internal/service"
)

type Service struct {
	leaseService *service.LeaseService
	repository   repository.LeaseRepository
	lifecycle    *service.LeaseLifecycleApplication
	entitlements *service.EntitlementApplication
}

func New() *Service {
	return &Service{
		leaseService: service.New(),
	}
}

func NewWithDatabase(
	db *sql.DB,
	policy service.EntitlementPolicy,
) (*Service, error) {
	if db == nil {
		return nil, errors.New("database is required")
	}

	repo := repository.NewSQLLeaseRepository(db)

	entitlements, err := service.NewEntitlementApplication(
		repo,
		policy,
	)
	if err != nil {
		return nil, err
	}

	lifecycle, err := service.NewLeaseLifecycleApplication(repo)
	if err != nil {
		return nil, err
	}

	return &Service{
		leaseService: service.NewWithRepository(repo),
		repository:   repo,
		lifecycle:    lifecycle,
		entitlements: entitlements,
	}, nil
}

func (s *Service) RegisterRoutes(mux *http.ServeMux) {
	handler.RegisterRoutes(mux, s.leaseService)
}
