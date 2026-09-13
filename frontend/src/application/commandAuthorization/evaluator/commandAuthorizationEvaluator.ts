import {
  runtimeRBACPolicy,
} from "../../rbac/runtime/rbacRuntimePolicy";
import {
  canMutate,
} from "../../authentication/guards/canMutate";
import type { CommandAuthorizationRequest } from "../contracts/commandAuthorizationRequest";
import type { CommandAuthorizationResult } from "../contracts/commandAuthorizationResult";

export function evaluateCommandAuthorization(
  request: CommandAuthorizationRequest,
): CommandAuthorizationResult {
  const policy = runtimeRBACPolicy(
    request.capability,
  );

  if (!policy.allowed) {
    return {
      allowed: false,
      requiresConfirmation: false,
      reason: "capability-denied",
      command: request.command,
    };
  }

  if (request.mutating && !canMutate()) {
    return {
      allowed: false,
      requiresConfirmation: false,
      reason: "mutation-restricted",
      command: request.command,
    };
  }

  return {
    allowed: true,
    requiresConfirmation: request.dangerous,
    reason: "authorized",
    command: request.command,
  };
}
