package security

import (
	"errors"
	"time"

	internalsecurity "github.com/kirilock/backend/security-service/internal/security"
)

type Service struct {
	production *internalsecurity.ProductionSecurity
}

func New() (*Service, error) {
	config := internalsecurity.NewConfig()

	production, err := internalsecurity.NewProductionSecurity(config)
	if err != nil {
		return nil, err
	}

	return &Service{
		production: production,
	}, nil
}

func (s *Service) Ready(now time.Time) bool {
	if s == nil || s.production == nil {
		return false
	}

	return s.production.Ready(now)
}

func (s *Service) DecisionService() *internalsecurity.DecisionService {
	if s == nil || s.production == nil || s.production.Runtime == nil {
		return nil
	}

	return s.production.Runtime.DecisionService()
}

func (s *Service) Production() *internalsecurity.ProductionSecurity {
	if s == nil {
		return nil
	}

	return s.production
}

func Require(service *Service) error {
	if service == nil {
		return errors.New("security service is required")
	}

	if !service.Ready(time.Now().UTC()) {
		return errors.New("security service is not ready")
	}

	return nil
}
