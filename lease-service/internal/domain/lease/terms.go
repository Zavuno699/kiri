package lease

type Terms struct {
	LeaseID       string
	PeriodSeconds int64
	Amount        int64
	Currency      string
	GraceSeconds  int64
}
