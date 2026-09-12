package grace

type State struct {
	LeaseID      string
	Phase        string
	StartedAt    string
	EndsAt       string
	Restricted   bool
	LockedOut    bool
}
