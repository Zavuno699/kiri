package messaging

type RuntimeConsumerStatus struct {
	Configured bool
	Started    bool
	Ready      bool
}

func NewRuntimeConsumerStatus(
	bridge *RuntimeConsumerBridge,
) RuntimeConsumerStatus {
	if bridge == nil {
		return RuntimeConsumerStatus{}
	}

	readiness := bridge.Readiness()

	return RuntimeConsumerStatus{
		Configured: true,
		Started:    readiness.Started,
		Ready:      readiness.Ready(),
	}
}
