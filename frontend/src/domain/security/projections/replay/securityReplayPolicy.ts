import type { DomainProjectionReplayPolicy } from "../../../shared/projections/replay/domainProjectionReplayPolicy";

export const securityReplayPolicy: DomainProjectionReplayPolicy = {
  domain: "security",
  checkpointEvery: 25,
  staleAfterMs: 5_000,
  rebuildAllowed: true,
  resumeAllowed: true,
  strictVerification: true,
};
