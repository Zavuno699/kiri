# Shared Backend Foundation

Shared infrastructure used by KiriLock services.

## Packages

### config
Application configuration loading and validation.

### errors
Canonical API/domain error definitions.

### events
Event envelope and event infrastructure.

### http
HTTP server, middleware, request/response helpers.

### logging
Structured logging.

### metadata
Common metadata attached to entities and events.

### types
Shared strongly typed primitives.

### validation
Request and domain validation infrastructure.

Shared packages must remain generic.

Do not place service-specific business rules here.
