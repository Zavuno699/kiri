package integration

type DefaultGateway struct {
	GatewayName string
}

func NewDefaultGateway(name string) *DefaultGateway {
	return &DefaultGateway{GatewayName: name}
}

func (g *DefaultGateway) Name() string {
	if g == nil {
		return ""
	}
	return g.GatewayName
}

