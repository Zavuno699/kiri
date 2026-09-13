import type { DomainProjectionReplayPolicy } from "../../../shared/projections/replay/domainProjectionReplayPolicy";

export const lockReplayPolicy: DomainProjectionReplayPolicy = {
  domain: "locks",
  checkpointEvery: 50,
  staleAfterMs: 10_000,
  rebuildAllowed: true,
  resumeAllowed: true,
  strictVerification: true,
};
