package integration

type DefaultAdapter struct {
	AdapterName string
}

func NewDefaultAdapter(name string) *DefaultAdapter {
	return &DefaultAdapter{AdapterName: name}
}

func (a *DefaultAdapter) Name() string {
	if a == nil {
		return ""
	}
	return a.AdapterName
}

