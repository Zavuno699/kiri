import type { CommandAuthorizationRequest } from "../contracts/commandAuthorizationRequest";
import { evaluateCommandAuthorization } from "../evaluator/commandAuthorizationEvaluator";

export function evaluateCommandRequest(
  request: CommandAuthorizationRequest,
) {
  return evaluateCommandAuthorization(request);
}
