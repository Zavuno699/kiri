package occupancy

type Occupant struct {
	ID        string
	LeaseID   string
	TenantID  string
	Status    string
	Verified  bool
}
