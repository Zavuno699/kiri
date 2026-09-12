package lease

import (
	"net/http"

	"github.com/kirilock/backend/lease-service/internal/handler"
	"github.com/kirilock/backend/lease-service/internal/service"
)

type Service struct {
	leaseService *service.LeaseService
}

func New() *Service {
	return &Service{
		leaseService: service.New(),
	}
}

func (s *Service) RegisterRoutes(mux *http.ServeMux) {
	handler.RegisterRoutes(mux, s.leaseService)
}
