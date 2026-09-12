package security

import "time"

type Runtime struct {
	Credentials *CredentialRegistry
	Revocations *RevocationRegistry
	Challenges  *ChallengeStore
	Policy      AuthorizationPolicy
}

func NewRuntime() *Runtime {
	return &Runtime{
		Credentials: NewCredentialRegistry(),
		Revocations: NewRevocationRegistry(),
		Challenges:  NewChallengeStore(),
		Policy:      NewDefaultAuthorizationPolicy(),
	}
}

func (r *Runtime) DecisionService() *DecisionService {
	if r == nil {
		return nil
	}

	return NewDecisionService(
		r.Policy,
		r.Revocations,
		r.Credentials,
	)
}

func (r *Runtime) Ready(now time.Time) bool {
	if r == nil ||
		r.Credentials == nil ||
		r.Revocations == nil ||
		r.Challenges == nil {
		return false
	}

	_ = now
	return true
}
