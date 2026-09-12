package bootstrap

import (
	"fmt"
	"github.com/kirilock/backend/device-service/internal/messaging"
)

type MessagingComposition struct {
	Runtime *MessagingRuntimeOwner
	Router  *messaging.EventRouter
}

func NewMessagingComposition(
	router *messaging.EventRouter,
) (*MessagingComposition, error) {
	runtime := messaging.NewDefaultRuntime()

	return NewMessagingCompositionWithRuntime(
		runtime,
		router,
	)
}

func NewMessagingCompositionWithRuntime(
	runtime *messaging.Runtime,
	router *messaging.EventRouter,
) (*MessagingComposition, error) {
	if runtime == nil {
		return nil, fmt.Errorf("messaging runtime is required")
	}

	owner, err := NewMessagingRuntimeOwner(
		runtime,
		router,
	)
	if err != nil {
		return nil, err
	}

	return &MessagingComposition{
		Runtime: owner,
		Router:  router,
	}, nil
}
