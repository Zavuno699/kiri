package messaging

import (
	"errors"
	"fmt"
)

// ProductionEventRoutes returns the production event routes.
// Domain dependencies are supplied by the application composition
// layer so this package remains independent of domain services.
func ProductionEventRoutes(
	routes ...EventRoute,
) []EventRoute {
	result := make([]EventRoute, 0, len(routes))

	for _, route := range routes {
		if route.EventType == "" || route.Handler == nil {
			continue
		}

		result = append(result, route)
	}

	return result
}

func ValidateProductionEventRoutes(
	routes []EventRoute,
) error {
	if len(routes) == 0 {
		return errors.New("at least one production event route is required")
	}

	seen := make(map[string]struct{}, len(routes))

	for _, route := range routes {
		if route.EventType == "" {
			return errors.New("production event route type is required")
		}
		if route.Handler == nil {
			return errors.New("production event route handler is required")
		}
		if _, exists := seen[route.EventType]; exists {
			return fmt.Errorf(
				"duplicate production event route: %s",
				route.EventType,
			)
		}
		seen[route.EventType] = struct{}{}
	}

	return nil
}
