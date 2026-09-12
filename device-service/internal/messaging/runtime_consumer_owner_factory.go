package messaging

import "fmt"

func NewRuntimeConsumerOwnerForRuntime(
	runtime *Runtime,
	router *EventRouter,
) (*RuntimeConsumerOwner, error) {
	if runtime == nil {
		return nil, fmt.Errorf("messaging runtime is required")
	}

	bridge, err := NewRuntimeConsumerHandler(router)
	if err != nil {
		return nil, err
	}

	return NewRuntimeConsumerOwner(
		runtime,
		bridge,
	), nil
}
