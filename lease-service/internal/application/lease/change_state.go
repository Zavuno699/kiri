package lease

type ChangeLeaseStateCommand struct {
	LeaseID string
	State   string
	Reason  string
}
