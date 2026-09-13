import { runtimeAuthorized } from "../runtime/authorization/runtimeAuthorization";
import { authorizeRuntimeCommand } from "../runtime/authorization/runtimeCommandAuthorization";
import { authorizeDangerousOperation } from "../runtime/authorization/runtimeDangerousAuthorization";
import { securityRuntimeReady } from "../runtime/runtimeReadiness";
import { securityRestrictionReason } from "../runtime/recovery/restrictionResolver";

export const securityRuntimeFacade = {
  ready: securityRuntimeReady,
  authorized: runtimeAuthorized,
  authorizeCommand: authorizeRuntimeCommand,
  authorizeDangerous: authorizeDangerousOperation,
  restrictionReason: securityRestrictionReason,
};
