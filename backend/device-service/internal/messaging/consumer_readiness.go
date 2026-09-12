package messaging

type ConsumerReadiness struct {
	Started        bool
	PolicyReady    bool
	RouterReady    bool
	ProcessorReady bool
}

func (r ConsumerReadiness) Ready() bool {
	return r.Started &&
		r.PolicyReady &&
		r.RouterReady &&
		r.ProcessorReady
}

func (p *ConsumerPipeline) Readiness() ConsumerReadiness {
	if p == nil {
		return ConsumerReadiness{}
	}

	started := false
	if p.Service != nil && p.Service.State != nil {
		started = p.Service.State.Started()
	}

	policyReady := false
	routerReady := false
	processorReady := false

	if p.Components != nil {
		policyReady = p.Components.Policy != nil

		if p.Components.Router != nil &&
			p.Components.Router.RouteCount() > 0 {
			routerReady = true
		}

		processorReady = p.Components.Processor != nil
	}

	return ConsumerReadiness{
		Started:        started,
		PolicyReady:    policyReady,
		RouterReady:    routerReady,
		ProcessorReady: processorReady,
	}
}
