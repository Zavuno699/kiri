package policy

type Policy struct {
	ID       string
	Name     string
	Version  int
	Enabled  bool
	Rules    map[string]string
}
