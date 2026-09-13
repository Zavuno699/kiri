import { evaluateCommandAuthorization } from "../evaluator/commandAuthorizationEvaluator";
import type { CommandAuthorizationRequest } from "../contracts/commandAuthorizationRequest";

export function commandAllowed(
  request: CommandAuthorizationRequest,
): boolean {
  return evaluateCommandAuthorization(
    request,
  ).allowed;
}
