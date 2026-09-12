package messaging

func NewRuntimeProcessor(
	router *EventRouter,
) (*MessageDeliveryProcessor, error) {
	components := NewRuntimeComponents(router)

	if err := ValidateRuntimeConfiguration(
		components.Policy,
	); err != nil {
		return nil, err
	}

	return components.Processor, nil
}
