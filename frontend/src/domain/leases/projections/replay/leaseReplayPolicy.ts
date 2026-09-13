import type { DomainProjectionReplayPolicy } from "../../../shared/projections/replay/domainProjectionReplayPolicy";

export const leaseReplayPolicy: DomainProjectionReplayPolicy = {
  domain: "leases",
  checkpointEvery: 100,
  staleAfterMs: 15_000,
  rebuildAllowed: true,
  resumeAllowed: true,
  strictVerification: true,
};
