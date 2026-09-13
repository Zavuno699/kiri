import type { DomainProjectionReplayPolicy } from "../../../shared/projections/replay/domainProjectionReplayPolicy";

export const paymentReplayPolicy: DomainProjectionReplayPolicy = {
  domain: "payments",
  checkpointEvery: 50,
  staleAfterMs: 10_000,
  rebuildAllowed: true,
  resumeAllowed: true,
  strictVerification: true,
};
