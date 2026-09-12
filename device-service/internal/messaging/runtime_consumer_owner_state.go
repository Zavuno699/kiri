package messaging

type RuntimeConsumerOwnerState struct {
	Started bool
	Ready   bool
}

func (o *RuntimeConsumerOwner) State() RuntimeConsumerOwnerState {
	if o == nil {
		return RuntimeConsumerOwnerState{}
	}

	return RuntimeConsumerOwnerState{
		Started: o.Bridge != nil && o.Bridge.Readiness().Started,
		Ready:   o.Ready(),
	}
}
