package audit

type Record struct {
	ID        string
	ActorID   string
	Action    string
	Resource  string
	Outcome   string
	Reason    string
}
