# hardware-controller

KiriLock backend service.

## Responsibilities

Business responsibilities for this service must remain isolated
from other services.

## Structure

- cmd/
- internal/handler/
- internal/service/
- internal/repository/
- internal/model/

The service must expose explicit interfaces between these layers.

Do not place business logic inside HTTP handlers.
