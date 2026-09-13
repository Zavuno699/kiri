import type { DomainProjectionReplayPolicy } from "../../../shared/projections/replay/domainProjectionReplayPolicy";

export const deviceReplayPolicy: DomainProjectionReplayPolicy = {
  domain: "devices",
  checkpointEvery: 100,
  staleAfterMs: 30_000,
  rebuildAllowed: true,
  resumeAllowed: true,
  strictVerification: false,
};
