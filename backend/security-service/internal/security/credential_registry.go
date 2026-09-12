package security

import (
	"sync"
)

type CredentialRegistry struct {
	mu          sync.RWMutex
	credentials map[string]Credential
}

func NewCredentialRegistry() *CredentialRegistry {
	return &CredentialRegistry{
		credentials: make(map[string]Credential),
	}
}

func (r *CredentialRegistry) Put(
	credential Credential,
) {
	if r == nil || credential.ID == "" {
		return
	}

	r.mu.Lock()
	r.credentials[credential.ID] = credential
	r.mu.Unlock()
}

func (r *CredentialRegistry) Get(
	id string,
) (Credential, bool) {
	if r == nil {
		return Credential{}, false
	}

	r.mu.RLock()
	credential, ok := r.credentials[id]
	r.mu.RUnlock()

	return credential, ok
}

func (r *CredentialRegistry) Revoke(
	id string,
) bool {
	if r == nil {
		return false
	}

	r.mu.Lock()
	defer r.mu.Unlock()

	credential, ok := r.credentials[id]
	if !ok {
		return false
	}

	credential.State = CredentialRevoked
	r.credentials[id] = credential

	return true
}
