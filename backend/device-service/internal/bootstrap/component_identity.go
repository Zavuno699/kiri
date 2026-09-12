package bootstrap

const (
	ComponentDeviceService = "device-service"
	ComponentBootstrap     = "bootstrap"
	ComponentPersistence   = "persistence"
	ComponentMessaging     = "messaging"
	ComponentDeviceRuntime = "device-runtime"
	ComponentHTTP          = "http"
)

type ComponentIdentity struct {
	Service   string
	Component string
}

func NewComponentIdentity(component string) ComponentIdentity {
	return ComponentIdentity{
		Service:   ComponentDeviceService,
		Component: component,
	}
}
