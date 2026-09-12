package security

import "time"

type ProductionSecurity struct {
	Runtime *Runtime
	Config  Config
}

func NewProductionSecurity(
	config Config,
) (*ProductionSecurity, error) {
	if err := config.Validate(); err != nil {
		return nil, err
	}

	return &ProductionSecurity{
		Runtime: NewRuntime(),
		Config:  config,
	}, nil
}

func (s *ProductionSecurity) Ready(
	now time.Time,
) bool {
	return s != nil &&
		s.Runtime != nil &&
		s.Runtime.Ready(now)
}
