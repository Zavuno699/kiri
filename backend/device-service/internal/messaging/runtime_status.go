package messaging

type RuntimeStatus struct {
	Started       bool
	PolicyReady   bool
	TopicsReady   bool
	DeliveryReady bool
}

func (s RuntimeStatus) Ready() bool {
	return s.Started &&
		s.PolicyReady &&
		s.TopicsReady &&
		s.DeliveryReady
}
