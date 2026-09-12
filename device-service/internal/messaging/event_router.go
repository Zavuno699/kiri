package messaging

import (
	"context"
	"errors"
	"fmt"
	"sort"
)

var ErrEventRouteNotFound = errors.New("event route not found")

type EventDispatchHandler func(
	context.Context,
	EventEnvelope,
) error

type EventRoute struct {
	EventType string
	Topic     string
	Handler   EventDispatchHandler
}

type EventRouter struct {
	routes map[string]EventRoute
}

func NewEventRouter(routes ...EventRoute) *EventRouter {
	router := &EventRouter{
		routes: make(map[string]EventRoute, len(routes)),
	}

	for _, route := range routes {
		if route.EventType == "" || route.Handler == nil {
			continue
		}

		router.routes[route.EventType] = route
	}

	return router
}

func (r *EventRouter) Handle(
	ctx context.Context,
	envelope EventEnvelope,
) error {
	if r == nil {
		return errors.New("event router is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if envelope.EventType == "" {
		return errors.New("event type is required")
	}

	route, ok := r.routes[envelope.EventType]
	if !ok || route.Handler == nil {
		return fmt.Errorf(
			"%w: %s",
			ErrEventRouteNotFound,
			envelope.EventType,
		)
	}

	return route.Handler(ctx, envelope)
}

func (r *EventRouter) EventTypes() []string {
	if r == nil {
		return nil
	}

	result := make([]string, 0, len(r.routes))

	for eventType := range r.routes {
		result = append(result, eventType)
	}

	sort.Strings(result)

	return result
}

func (r *EventRouter) RouteCount() int {
	if r == nil {
		return 0
	}

	return len(r.routes)
}

func (r *EventRouter) Has(eventType string) bool {
	if r == nil {
		return false
	}

	_, ok := r.routes[eventType]

	return ok
}
