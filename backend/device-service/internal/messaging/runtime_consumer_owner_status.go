package messaging

type RuntimeConsumerOwnerStatus struct {
	RuntimeConfigured  bool
	ConsumerConfigured bool
	ConsumerStarted    bool
	ConsumerReady      bool
}

func (o *RuntimeConsumerOwner) Status() RuntimeConsumerOwnerStatus {
	if o == nil {
		return RuntimeConsumerOwnerStatus{}
	}

	status := RuntimeConsumerOwnerStatus{
		RuntimeConfigured:  o.Runtime != nil,
		ConsumerConfigured: o.Bridge != nil,
	}

	if o.Bridge != nil {
		readiness := o.Bridge.Readiness()

		status.ConsumerStarted = readiness.Started
		status.ConsumerReady = readiness.Ready()
	}

	return status
}
