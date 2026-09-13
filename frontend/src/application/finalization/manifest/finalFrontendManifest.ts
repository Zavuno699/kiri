import { finalCapabilityRegistry } from "../capabilities/finalCapabilityRegistry";
import { finalDomainSurface } from "../domains/finalDomainSurface";
import { finalRouteSurface } from "../routes/finalRouteSurface";

export const finalFrontendManifest = {
  implementationPhase: "12H",
  routes: finalRouteSurface,
  domains: finalDomainSurface,
  capabilities: finalCapabilityRegistry,
  buildStatus: "pending",
  testsStatus: "pending",
  runtimeStatus: "pending",
};
