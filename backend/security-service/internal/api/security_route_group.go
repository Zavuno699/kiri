package api

type SecurityRouteGroup struct {
	Name string
}

func NewSecurityRouteGroup() *SecurityRouteGroup {
	return &SecurityRouteGroup{
		Name: "security",
	}
}
