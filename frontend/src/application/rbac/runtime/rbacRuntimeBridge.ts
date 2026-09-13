import { runtimeRBACPolicy } from "./rbacRuntimePolicy"

export function runtimeRBACAllows(
  capability?: string,
): boolean {
  return runtimeRBACPolicy(capability).allows(capability)
}
