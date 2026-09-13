
import { authorize } from "./authorizationEngine";
import type { AuthorizationRequest } from "./authorizationRequest";

export function requireAuthorization(
  request: AuthorizationRequest,
): void {
  const result = authorize(request);

  if (!result.allowed) {
    throw new Error(result.reason);
  }
}

