import type {
  ApplicationService,
} from "../services/service"

export type ServiceFactory<
  TRequest,
  TResponse,
> = (
  ...dependencies: unknown[]
) => ApplicationService<
  TRequest,
  TResponse
>
