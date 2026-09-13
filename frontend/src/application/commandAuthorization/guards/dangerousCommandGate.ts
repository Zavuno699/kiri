import { evaluateCommandAuthorization } from "../evaluator/commandAuthorizationEvaluator";
import type { CommandAuthorizationRequest } from "../contracts/commandAuthorizationRequest";

export function dangerousCommandAllowed(
  request: CommandAuthorizationRequest,
): boolean {
  const result = evaluateCommandAuthorization(
    request,
  );

  return result.allowed && result.requiresConfirmation;
}
