package messaging

import "sync"

type ConsumerState struct {
	mu           sync.RWMutex
	started      bool
	processed    uint64
	acknowledged uint64
	failed       uint64
	retried      uint64
	deadLettered uint64
}

func (s *ConsumerState) Start() {
	if s == nil {
		return
	}

	s.mu.Lock()
	s.started = true
	s.mu.Unlock()
}

func (s *ConsumerState) Stop() {
	if s == nil {
		return
	}

	s.mu.Lock()
	s.started = false
	s.mu.Unlock()
}

func (s *ConsumerState) Started() bool {
	if s == nil {
		return false
	}

	s.mu.RLock()
	defer s.mu.RUnlock()

	return s.started
}

func (s *ConsumerState) Record(result ProcessingResult) {
	if s == nil {
		return
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	s.processed++

	switch result.Decision.Outcome {
	case DeliveryAcknowledged:
		s.acknowledged++
	case DeliveryRetriable:
		s.retried++
		s.failed++
	case DeliveryDeadLettered:
		s.deadLettered++
		s.failed++
	case DeliveryRejected:
		s.failed++
	}
}

type ConsumerSnapshot struct {
	Started      bool
	Processed    uint64
	Acknowledged uint64
	Failed       uint64
	Retried      uint64
	DeadLettered uint64
}

func (s *ConsumerState) Snapshot() ConsumerSnapshot {
	if s == nil {
		return ConsumerSnapshot{}
	}

	s.mu.RLock()
	defer s.mu.RUnlock()

	return ConsumerSnapshot{
		Started:      s.started,
		Processed:    s.processed,
		Acknowledged: s.acknowledged,
		Failed:       s.failed,
		Retried:      s.retried,
		DeadLettered: s.deadLettered,
	}
}

func (s *ConsumerState) Ready() bool {
	if s == nil {
		return false
	}

	s.mu.RLock()
	defer s.mu.RUnlock()

	return s.started
}
