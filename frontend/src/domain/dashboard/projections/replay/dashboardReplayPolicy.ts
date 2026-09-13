import type { DomainProjectionReplayPolicy } from "../../../shared/projections/replay/domainProjectionReplayPolicy";

export const dashboardReplayPolicy: DomainProjectionReplayPolicy = {
  domain: "dashboard",
  checkpointEvery: 250,
  staleAfterMs: 15_000,
  rebuildAllowed: true,
  resumeAllowed: true,
  strictVerification: false,
};
