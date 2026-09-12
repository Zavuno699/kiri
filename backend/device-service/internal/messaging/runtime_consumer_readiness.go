package messaging

type RuntimeConsumerReadiness struct {
	Configured bool
	Started    bool
	Policy     bool
	Router     bool
	Processor  bool
	Ready      bool
}
