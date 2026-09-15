package api

type SecurityEndpointRegistry struct {
	Paths []string
}

func NewSecurityEndpointRegistry() *SecurityEndpointRegistry {
	return &SecurityEndpointRegistry{
		Paths: []string{
			"GET /healthz",
			"POST /authenticate",
			"GET /authorize",
		},
	}
}
