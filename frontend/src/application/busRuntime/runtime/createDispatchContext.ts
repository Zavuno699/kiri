import {
  getAuthenticationState,
} from "../../authentication/state/authenticationStore";

import {
  getAuditCorrelationContext,
} from "../../audit/correlation/correlationContext";

import type {
  DispatchContext,
} from "../contracts/dispatchContext";

export function createDispatchContext(): DispatchContext {
  const authentication =
    getAuthenticationState();

  const correlation =
    getAuditCorrelationContext();

  return {
    principal:
      authentication.principal ?? null,
    sessionId:
      authentication.sessionId ?? null,
    correlationId:
      correlation.correlationId,
    causationId:
      correlation.causationId,
  };
}
