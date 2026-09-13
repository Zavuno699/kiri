import { frontendCapabilities } from "../../bootstrap/finalization/frontendCapabilityRegistry";
import { integrationSurfaces } from "./integrationSurface";

export const frontendIntegrationManifest = {
  capabilities: frontendCapabilities,
  surfaces: integrationSurfaces,
  implementationPhase: "12G",
  buildStatus: "pending",
  testStatus: "pending",
};
