package bootstrap

type MessagingRuntimeStatus struct {
	Configured bool
	Ready      bool
}

func NewMessagingRuntimeStatus(
	composition *MessagingComposition,
) MessagingRuntimeStatus {
	if composition == nil || composition.Runtime == nil {
		return MessagingRuntimeStatus{}
	}

	return MessagingRuntimeStatus{
		Configured: true,
		Ready:      composition.Runtime.Ready(),
	}
}
