import { authorizeRuntime } from "../runtime/authorization/runtimeAuthorization";
import { authorizeRuntimeCommand } from "../runtime/authorization/runtimeCommandAuthorization";
import { authorizeDangerousOperation } from "../runtime/authorization/runtimeDangerousAuthorization";
import { getSecurityRuntimeReadiness } from "../runtime/runtimeReadiness";
import { resolveSecurityRestriction } from "../runtime/recovery/restrictionResolver";

export const securityRuntimeFacade = {
  ready: () => getSecurityRuntimeReadiness().authorizationReady,
  authorized: authorizeRuntime,
  authorizeCommand: authorizeRuntimeCommand,
  authorizeDangerous: authorizeDangerousOperation,
  restrictionReason: resolveSecurityRestriction,
};
