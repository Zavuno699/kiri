package security

import (
	"sync"
	"time"
)

type ChallengeStore struct {
	mu         sync.Mutex
	challenges map[string]WebAuthnChallenge
}

func NewChallengeStore() *ChallengeStore {
	return &ChallengeStore{
		challenges: make(map[string]WebAuthnChallenge),
	}
}

func (s *ChallengeStore) Put(
	challenge WebAuthnChallenge,
) {
	if s == nil {
		return
	}

	s.mu.Lock()
	s.challenges[challenge.ID] = challenge
	s.mu.Unlock()
}

func (s *ChallengeStore) Consume(
	id string,
	value string,
	now time.Time,
) bool {
	if s == nil || id == "" {
		return false
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	challenge, ok := s.challenges[id]
	if !ok {
		return false
	}

	if !challenge.ValidAt(now) {
		delete(s.challenges, id)
		return false
	}

	if challenge.Challenge != value {
		return false
	}

	challenge.Used = true
	s.challenges[id] = challenge

	return true
}
