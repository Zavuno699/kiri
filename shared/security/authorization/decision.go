package authorization

type Decision struct {
	Allowed bool
	Reason  string
	Policy  string
}
