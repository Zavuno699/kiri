package persistence

import "sync"

type TransactionState string

const (
	TransactionStateCreated    TransactionState = "created"
	TransactionStateActive     TransactionState = "active"
	TransactionStateCommitted  TransactionState = "committed"
	TransactionStateRolledBack TransactionState = "rolled_back"
)

type TransactionLifecycle struct {
	mu    sync.RWMutex
	state TransactionState
}

func NewTransactionLifecycle() *TransactionLifecycle {
	return &TransactionLifecycle{
		state: TransactionStateCreated,
	}
}

func (l *TransactionLifecycle) Activate() {
	if l == nil {
		return
	}

	l.mu.Lock()
	l.state = TransactionStateActive
	l.mu.Unlock()
}

func (l *TransactionLifecycle) Commit() {
	if l == nil {
		return
	}

	l.mu.Lock()
	l.state = TransactionStateCommitted
	l.mu.Unlock()
}

func (l *TransactionLifecycle) Rollback() {
	if l == nil {
		return
	}

	l.mu.Lock()
	l.state = TransactionStateRolledBack
	l.mu.Unlock()
}

func (l *TransactionLifecycle) State() TransactionState {
	if l == nil {
		return TransactionStateCreated
	}

	l.mu.RLock()
	defer l.mu.RUnlock()

	return l.state
}
