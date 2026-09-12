package security

import "time"

type DecisionService struct {
	Policy      AuthorizationPolicy
	Revocations *RevocationRegistry
	Credentials *CredentialRegistry
}

func NewDecisionService(
	policy AuthorizationPolicy,
	revocations *RevocationRegistry,
	credentials *CredentialRegistry,
) *DecisionService {
	return &DecisionService{
		Policy:      policy,
		Revocations: revocations,
		Credentials: credentials,
	}
}

func (s *DecisionService) Authorize(
	claims Claims,
	scope Scope,
	now time.Time,
) error {
	if s == nil {
		return ErrUnauthorized
	}

	if !claims.ValidAt(now) {
		return ErrUnauthorized
	}

	if s.Revocations != nil {
		if s.Revocations.IsRevoked(
			claims.RevocationID,
			now,
		) {
			return ErrUnauthorized
		}

		if s.Revocations.IsRevoked(
			claims.SessionID,
			now,
		) {
			return ErrUnauthorized
		}
	}

	if s.Credentials != nil {
		credential, ok := s.Credentials.Get(
			claims.CredentialID,
		)

		if !ok {
			return ErrUnauthorized
		}

		if err := credential.Usable(now); err != nil {
			return err
		}
	}

	if !s.Policy.Allows(claims.Roles, scope) &&
		!claims.HasScope(scope) {
		return ErrForbidden
	}

	return nil
}
