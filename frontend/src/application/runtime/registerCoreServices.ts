import {
  serviceRegistry,
} from "../registry/serviceRegistry"

export function registerCoreServices(): void {
  serviceRegistry.register(
    "runtime:registered",
    true,
  )
}
