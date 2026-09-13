import type { DomainProjectionReplayPolicy } from "../../../shared/projections/replay/domainProjectionReplayPolicy";

export const propertyReplayPolicy: DomainProjectionReplayPolicy = {
  domain: "properties",
  checkpointEvery: 100,
  staleAfterMs: 20_000,
  rebuildAllowed: true,
  resumeAllowed: true,
  strictVerification: true,
};
